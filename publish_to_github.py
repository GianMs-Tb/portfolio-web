#!/usr/bin/env python3
"""Publish GianMs-Tb portfolio repos. Run outside Cursor sandbox: python3 publish_to_github.py"""
import json, os, shutil, subprocess, sys, tempfile, urllib.error, urllib.request

def load_token():
    with open(os.path.expanduser("~/.cursor/mcp.json")) as f:
        return json.load(f)["mcpServers"]["github"]["headers"]["Authorization"].replace("Bearer ", "").strip()

OWNER = "GianMs-Tb"
MSG = "Initial commit: Architecture and Workflow documentation"
TOKEN = load_token()
REPOS = [
    ("ai-operations-copilot-n8n", os.path.expanduser("~/portfolio/ai-operations-copilot-n8n")),
    ("secure-document-delivery-pipeline", os.path.expanduser("~/portfolio/secure-document-delivery-pipeline")),
    ("intelligent-follow-up-engine", os.path.expanduser("~/portfolio/intelligent-follow-up-engine")),
]
TEMPLATE = os.path.expanduser("~/portfolio/empty-git-template")
os.makedirs(TEMPLATE, exist_ok=True)

def api(method, path, data=None):
    url = "https://api.github.com" + path
    h = {"Authorization": f"Bearer {TOKEN}", "Accept": "application/vnd.github+json", "User-Agent": "portfolio-publish"}
    body = None
    if data is not None:
        body = json.dumps(data).encode()
        h["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, headers=h, method=method)
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            b = r.read()
            return r.status, json.loads(b) if b else {}
    except urllib.error.HTTPError as e:
        b = e.read()
        return e.code, json.loads(b) if b else {"message": str(e)}
    except Exception as e:
        return 0, {"message": str(e)}

def run(cmd, cwd):
    env = os.environ.copy()
    env["GIT_TERMINAL_PROMPT"] = "0"
    env["GIT_TEMPLATE_DIR"] = TEMPLATE
    return subprocess.run(cmd, cwd=cwd, env=env, capture_output=True, text=True)

def copy_src(src, dst):
    if os.path.exists(dst):
        shutil.rmtree(dst)
    for root, dirs, files in os.walk(src):
        dirs[:] = [d for d in dirs if d != ".git"]
        rel = os.path.relpath(root, src)
        out = dst if rel == "." else os.path.join(dst, rel)
        os.makedirs(out, exist_ok=True)
        for fn in files:
            if fn == ".gitkeep":
                continue
            shutil.copy2(os.path.join(root, fn), os.path.join(out, fn))

def local_files(d):
    out = []
    for r, _, fs in os.walk(d):
        for f in fs:
            if f == ".gitkeep":
                continue
            out.append(os.path.relpath(os.path.join(r, f), d))
    return sorted(out)

def push(name, src):
    base = os.path.join(tempfile.gettempdir(), "portfolio-publish", name)
    copy_src(src, base)
    lf = local_files(base)
    gd = os.path.join(base, ".git")
    if os.path.exists(gd):
        shutil.rmtree(gd)
    for c in (["git", "init", "-b", "main"], ["git", "add", "-A"], ["git", "commit", "-m", MSG]):
        r = run(c, base)
        if r.returncode:
            return name, False, (r.stderr or r.stdout).strip(), lf
    remote = f"https://x-access-token:{TOKEN}@github.com/{OWNER}/{name}.git"
    run(["git", "remote", "remove", "origin"], base)
    run(["git", "remote", "add", "origin", remote], base)
    r = run(["git", "push", "-u", "origin", "main"], base)
    ok = r.returncode == 0
    return name, ok, None if ok else (r.stderr or r.stdout).strip(), lf

def push_profile():
    pn = "GianMs-Tb"
    st, _ = api("GET", f"/repos/{OWNER}/{pn}")
    if st == 404:
        api("POST", "/user/repos", {"name": pn, "private": False})
    readme = open(os.path.expanduser("~/portfolio/PROFILE_README.md")).read()
    for a, b in (
        ("./ai-operations-copilot-n8n", "https://github.com/GianMs-Tb/ai-operations-copilot-n8n"),
        ("./secure-document-delivery-pipeline", "https://github.com/GianMs-Tb/secure-document-delivery-pipeline"),
        ("./intelligent-follow-up-engine", "https://github.com/GianMs-Tb/intelligent-follow-up-engine"),
    ):
        readme = readme.replace(a, b)
    work = os.path.join(tempfile.gettempdir(), "portfolio-publish", pn)
    if os.path.exists(work):
        shutil.rmtree(work)
    os.makedirs(work)
    open(os.path.join(work, "README.md"), "w").write(readme)
    lf = ["README.md"]
    for c in (["git", "init", "-b", "main"], ["git", "add", "README.md"], ["git", "commit", "-m", MSG]):
        r = run(c, work)
        if r.returncode:
            return pn, False, (r.stderr or r.stdout).strip(), lf
    remote = f"https://x-access-token:{TOKEN}@github.com/{OWNER}/{pn}.git"
    run(["git", "remote", "add", "origin", remote], work)
    r = run(["git", "push", "-u", "origin", "main"], work)
    ok = r.returncode == 0
    return pn, ok, None if ok else (r.stderr or r.stdout).strip(), lf

def verify(name):
    st, body = api("GET", f"/repos/{OWNER}/{name}/contents/")
    roots = sorted([i["name"] for i in body]) if st == 200 and isinstance(body, list) else []
    st2, tr = api("GET", f"/repos/{OWNER}/{name}/git/trees/main?recursive=1")
    files = sorted([t["path"] for t in tr.get("tree", []) if t.get("type") == "blob"]) if st2 == 200 else []
    return roots, files

def main():
    results = [push(n, s) for n, s in REPOS]
    results.append(push_profile())
    print("RESULTS")
    for name, ok, err, lf in results:
        print(f"{name}	{'OK' if ok else 'FAIL'}	expected={lf}")
        if err:
            print(f"  error: {err[:800]}")
    print("VERIFY")
    for name, _, _, _ in results:
        roots, files = verify(name)
        print(f"https://github.com/{OWNER}/{name}")
        print(f"  roots: {roots}")
        print(f"  files: {files}")
    if any(not r[1] for r in results):
        sys.exit(1)

if __name__ == "__main__":
    main()
