#!/usr/bin/env python3
"""Sanitize n8n workflow exports for public GitHub publication."""

import json
import re
import sys
from copy import deepcopy
from pathlib import Path

CREDENTIAL_PLACEHOLDER = {"id": "<CREDENTIAL_ID>", "name": "<CREDENTIAL_NAME>"}

# Slack IDs
SLACK_CHANNEL_RE = re.compile(r"\bC[A-Z0-9]{8,12}\b")
SLACK_USER_RE = re.compile(r"\bU[A-Z0-9]{8,12}\b")
WEBHOOK_UUID_RE = re.compile(
    r"\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b", re.I
)
EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b")
CONVERTAPI_SECRET_RE = re.compile(r"(Secret=)[^&\"'\s]+", re.I)

URL_REPLACEMENTS = [
    (re.compile(r"https://api\.lendflow\.com", re.I), "https://api.example.com"),
    (re.compile(r"https://app\.lendflow\.com", re.I), "https://app.example.com"),
    (re.compile(r"api\.lendflow\.com", re.I), "api.example.com"),
    (re.compile(r"app\.lendflow\.com", re.I), "app.example.com"),
    (re.compile(r"\$vars\.lendflow_api_base_url", re.I), "$vars.platform_api_base_url"),
]

NAME_REPLACEMENTS = {
    "Assistant — SBA Bot": "AI Operations Copilot — Main Orchestrator",
    "Sub - PDF Encriptado": "Secure Document Delivery Pipeline",
    "Sub - send missing docs email": "Intelligent Follow-Up Engine",
    "Slack Marco": "<CREDENTIAL_NAME>",
    "SendGrid - BHG Offer Emails": "<CREDENTIAL_NAME>",
    "MP: AI team only DO NOT SHARE — LF Authentication": "<AUTH_SUBWORKFLOW_NAME>",
    "LF Authentication": "Platform Authentication",
    "AI-TEAM-n8n-Pao-Stips": "portfolio-n8n-automation",
    "lendflow_send_ok": "platform_send_ok",
    "sender_lf_user_id": "sender_platform_user_id",
    "Lendflow": "Platform",
    "Lendflow-n8n": "portfolio-n8n",
    "Marco Assistant": "Operations Copilot",
    "You are Marco,": "You are an operations assistant,",
    "Marco, an expert SBA Funding Assistant": "an expert operations funding assistant",
    "for Lendflow.": "for a business platform.",
    "Deal Snapshot": "Secure Document Snapshot",
    "/deals/": "/records/",
    "deals?search=": "records?search=",
    "U1234567": "<YOUR_SLACK_USER_ID>",
    "// 4. Extraemos el link de Lendflow": "// 4. Extraemos el link de la plataforma",
    "lf_id": "platform_id",
    "sender_lf_id": "sender_platform_id",
    "(26 personas)": "(team members)",
    "GET LF Template": "GET Platform Template",
    "POST Email to LF": "POST Email to Platform",
    "POST Send Email to Lendflow": "POST Send Email to Platform",
    "LF Auth": "Platform Auth",
    "POST LF Note": "POST Platform Note",
}


def sanitize_string(s: str) -> str:
    if not isinstance(s, str) or not s:
        return s

    # Replace real team roster before other transforms alter matching keys
    if "TEAM_MAP" in s and re.search(r"name:\s*'[A-Za-z]", s):
        s = """const TEAM_MAP = {
  '<YOUR_SLACK_USER_ID>': { platform_id: '<PLATFORM_USER_ID>', name: '<OPERATOR_NAME>', role: 'operator' },
  '<YOUR_SLACK_USER_ID_2>': { platform_id: '<PLATFORM_USER_ID_2>', name: '<OPERATOR_NAME_2>', role: 'operator' }
};

""" + re.sub(
            r"const TEAM_MAP = \{[\s\S]*?\};\n\n",
            "",
            s,
            count=1,
        )

    for old, new in NAME_REPLACEMENTS.items():
        s = s.replace(old, new)

    for pattern, repl in URL_REPLACEMENTS:
        s = pattern.sub(repl, s)

    s = CONVERTAPI_SECRET_RE.sub(r"\1<YOUR_CONVERTAPI_SECRET>", s)

    # Anonymize deal URL pattern in jsCode examples
    s = re.sub(
        r"app\\.lendflow\\.com\\/deals\\/",
        r"app.example.com\\/records\\/",
        s,
    )
    s = re.sub(
        r"/deals/([0-9a-fA-F-]{36})",
        r"/records/<RECORD_UUID>",
        s,
    )
    s = re.sub(
        r"deals\?search=",
        r"records?search=",
        s,
    )

    # Slack channel/user fallbacks in jsCode strings
    s = SLACK_CHANNEL_RE.sub("<YOUR_SLACK_CHANNEL_ID>", s)
    s = SLACK_USER_RE.sub("<YOUR_SLACK_USER_ID>", s)

    # Emails (keep n8n expression placeholders)
    if "{{" not in s or "@" in s.split("{{")[0]:
        s = EMAIL_RE.sub("<CONTACT_EMAIL@example.com>", s)

    # Workflow IDs in executeWorkflow nodes (alphanumeric ~15 chars after value key handled in dict)

    # Template UUIDs in sticky notes / docs (skip n8n expressions and node wiring)
    if "{{" not in s and "const TEAM_MAP" not in s:
        s = WEBHOOK_UUID_RE.sub("<UUID>", s)

    # Sticky note credential leaks
    s = re.sub(r"\(id: [A-Za-z0-9]+\)", "(id: <CREDENTIAL_ID>)", s)
    s = re.sub(
        r"Templates\n([\s\S]*?)\n\n### Team Map",
        "Templates\n- <TEMPLATE_ID_INITIAL>\n- <TEMPLATE_ID_FOLLOWUP>\n\n### Team Map",
        s,
    )

    return s


def sanitize_credentials(obj):
    if isinstance(obj, dict):
        if "credentials" in obj and isinstance(obj["credentials"], dict):
            sanitized_creds = {}
            for cred_type in obj["credentials"]:
                sanitized_creds[cred_type] = dict(CREDENTIAL_PLACEHOLDER)
            obj["credentials"] = sanitized_creds
        if "webhookId" in obj:
            obj["webhookId"] = "<WEBHOOK_ID>"
        if "channelId" in obj.get("parameters", {}):
            ch = obj["parameters"]["channelId"]
            if isinstance(ch, dict) and "value" in ch:
                ch["value"] = "<YOUR_SLACK_CHANNEL_ID>"
            elif isinstance(ch, str):
                obj["parameters"]["channelId"] = "<YOUR_SLACK_CHANNEL_ID>"
        # channelId at node level (some slack nodes)
        for key in list(obj.keys()):
            if key == "channelId" and isinstance(obj[key], (str, dict)):
                if isinstance(obj[key], dict) and "value" in obj[key]:
                    obj[key]["value"] = "<YOUR_SLACK_CHANNEL_ID>"
        if "workflowId" in obj.get("parameters", {}):
            wf = obj["parameters"]["workflowId"]
            if isinstance(wf, dict):
                if "value" in wf:
                    wf["value"] = "<SUBWORKFLOW_ID>"
                if "cachedResultName" in wf:
                    wf["cachedResultName"] = "<AUTH_SUBWORKFLOW_NAME>"
        for k, v in obj.items():
            sanitize_credentials(v)
    elif isinstance(obj, list):
        for item in obj:
            sanitize_credentials(item)


def sanitize_values(obj):
    if isinstance(obj, dict):
        new = {}
        for k, v in obj.items():
            if k == "credentials" and isinstance(v, dict):
                new[k] = {
                    ck: dict(CREDENTIAL_PLACEHOLDER) for ck in v
                }
                continue
            if k == "webhookId":
                new[k] = "<WEBHOOK_ID>"
                continue
            new[k] = sanitize_values(v)
        return new
    if isinstance(obj, list):
        return [sanitize_values(i) for i in obj]
    if isinstance(obj, str):
        return sanitize_string(obj)
    return obj


def rename_connection_keys(connections: dict) -> dict:
    if not isinstance(connections, dict):
        return connections

    renamed = {}
    for key, value in connections.items():
        new_key = sanitize_string(key)
        if isinstance(value, dict):
            new_value = {}
            for inner_key, inner_value in value.items():
                if inner_key == "main" and isinstance(inner_value, list):
                    new_value[inner_key] = [
                        [
                            {
                                **item,
                                "node": sanitize_string(item["node"]),
                            }
                            if isinstance(item, dict) and "node" in item
                            else item
                            for item in row
                        ]
                        if isinstance(row, list)
                        else row
                        for row in inner_value
                    ]
                else:
                    new_value[inner_key] = inner_value
            renamed[new_key] = new_value
        else:
            renamed[new_key] = value
    return renamed


def sanitize_workflow(data: dict) -> dict:
    import uuid

    out = deepcopy(data)
    original_nodes = data.get("nodes", [])

    if "name" in out and out["name"] in NAME_REPLACEMENTS:
        out["name"] = NAME_REPLACEMENTS[out["name"]]
    elif "name" in out:
        out["name"] = sanitize_string(out["name"])

    out = sanitize_values(out)

    for i, node in enumerate(out.get("nodes", [])):
        if not isinstance(node, dict):
            continue
        orig_id = original_nodes[i].get("id") if i < len(original_nodes) else None
        if orig_id:
            node["id"] = str(uuid.uuid5(uuid.NAMESPACE_DNS, str(orig_id)))
        if "name" in node:
            node["name"] = sanitize_string(node["name"])

    if "connections" in out:
        out["connections"] = rename_connection_keys(out["connections"])

    sanitize_credentials(out)
    return out


def main():
    mappings = [
        (
            Path("/Users/gianmarcosaldarriagagrandez/Downloads/Assistant___SBA_Bot.json"),
            Path("/Users/gianmarcosaldarriagagrandez/portfolio/ai-operations-copilot-n8n/workflows/main_orchestrator.json"),
        ),
        (
            Path("/Users/gianmarcosaldarriagagrandez/Downloads/Sub___PDF_Encriptado.json"),
            Path("/Users/gianmarcosaldarriagagrandez/portfolio/secure-document-delivery-pipeline/workflows/delivery_pipeline.json"),
        ),
        (
            Path("/Users/gianmarcosaldarriagagrandez/Downloads/Sub___send_missing_docs_email.json"),
            Path("/Users/gianmarcosaldarriagagrandez/portfolio/intelligent-follow-up-engine/workflows/follow_up_core.json"),
        ),
    ]

    for src, dst in mappings:
        if not src.exists():
            print(f"ERROR: missing {src}", file=sys.stderr)
            sys.exit(1)
        with open(src, encoding="utf-8") as f:
            data = json.load(f)
        clean = sanitize_workflow(data)
        dst.parent.mkdir(parents=True, exist_ok=True)
        with open(dst, "w", encoding="utf-8") as f:
            json.dump(clean, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"OK: {dst} ({dst.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
