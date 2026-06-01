# GitHub Profile Migration Plan

**Account:** [GianMs-Tb](https://github.com/GianMs-Tb)  
**Target positioning:** Automation Engineer · Integration Engineer · AI Workflow Builder · Backend Developer  
**Timeline:** 2–4 weeks (phased)

---

## Phase 0 — Identity (Day 1)

### GitHub Settings → Profile

| Field | Value |
|-------|-------|
| **Name** | `Gian Marco Saldarriaga — Automation & Integration Engineer` |
| **Bio** | `Automation Engineer · Integration Engineer · AI Workflow Builder · Production systems with n8n, Node.js, REST APIs, OAuth & Claude · Remote` |
| **Company** | `Available for hire` or your freelance brand |
| **Location** | `Colombia · Remote` |
| **Website** | `https://gianmarco.dev` |
| **Social** | LinkedIn URL |

### Git commit identity

```bash
git config --global user.name "Gian Marco Saldarriaga"
git config --global user.email "hello@gianmarco.dev"
```

> Use a verified email on GitHub (Settings → Emails) so commits link to your profile.

### Username decision

| Option | Pros | Cons |
|--------|------|------|
| **Keep `GianMs-Tb`** | No migration friction | Less professional than full name |
| **Rename to `gianmarcosaldarriaga`** | Brand consistency with portfolio | GitHub rename redirects exist but update all links |

**Recommendation:** Rename to `gianmarcosaldarriaga` when ready. Until then, fix all portfolio links to `GianMs-Tb`.

---

## Phase 1 — Cleanup (Day 1–2)

### Archive these repositories

| Repository | Reason |
|------------|--------|
| `curso-ecmascript` | Course exercises — signals student profile |
| `mi-proyecto` | Practice HTML/Python — no professional value |
| `react-base` | Webpack boilerplate — superseded by `portfolio` repo |
| `e-plantShopping` | Bootcamp project — irrelevant to positioning |
| `LAB_Marzo8` | University lab — irrelevant |

**How to archive:** Repo → Settings → Danger Zone → Archive repository.

Archived repos remain accessible but disappear from default profile view. Unpin if pinned.

---

## Phase 2 — Rename (Day 2–3)

| Current name | New name | Action |
|--------------|----------|--------|
| `sistema-php-app` | `community-management-app` | Settings → General → Repository name |

Update local remotes after rename:

```bash
git remote set-url origin https://github.com/GianMs-Tb/community-management-app.git
```

---

## Phase 3 — Profile README (Day 2)

1. Create repository **`GianMs-Tb/GianMs-Tb`** (same name as username — must be public).
2. Copy contents from `github-profile/PROFILE_README.md`.
3. Commit to `main` branch as `README.md`.
4. Verify at `https://github.com/GianMs-Tb`.

---

## Phase 4 — Publish workflow repos (Week 1–2)

Create three public repositories from local portfolio case studies:

| Repo | Source |
|------|--------|
| `ai-operations-copilot` | `portfolio/projects/ai-operations-assistant/` + workflow JSON (sanitized) |
| `intelligent-followup-engine` | `portfolio/projects/intelligent-followup-engine/` |
| `secure-document-delivery-pipeline` | `portfolio/projects/secure-document-delivery/` |

Use README templates in `github-profile/repos/`.

Suggested structure per repo:

```text
repo/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── integration-map.md
│   └── engineering-patterns.md
├── src/                    # Extracted JavaScript from n8n Code nodes
│   ├── validators/
│   ├── transformers/
│   └── rules/
├── workflows/              # Sanitized n8n JSON exports
│   └── *.json
└── assets/
    └── diagrams/           # Anonymized screenshots
```

---

## Phase 5 — Publish portfolio repo (Week 1)

1. Create `GianMs-Tb/portfolio` on GitHub.
2. Push `~/portfolio` (exclude `node_modules` — already in `.gitignore`).
3. Deploy to Vercel; connect `gianmarco.dev`.
4. Update `src/data/expertise.ts` → `socialLinks.github` to `https://github.com/GianMs-Tb`.

---

## Phase 6 — Pin repositories (After Phase 4–5)

Pin exactly these 6 (in order):

1. `ai-operations-copilot`
2. `intelligent-followup-engine`
3. `secure-document-delivery-pipeline`
4. `portfolio`
5. `integration-auth-toolkit` *(create in Phase 7)*
6. `community-management-app`

**Do not pin** archived repos or anything with "curso", "lab", "mi-proyecto" in the name.

---

## Phase 7 — Backend credibility (Week 3–4)

Create `integration-auth-toolkit` — Node.js/TypeScript library implementing:

- Service authentication
- User impersonation
- Token normalization
- Retry with backoff

This converts n8n experience into reviewable backend code.

---

## Checklist

- [ ] Update GitHub profile name, bio, website, location
- [ ] Set professional git email
- [ ] Archive 5 legacy repos
- [ ] Rename `sistema-php-app` → `community-management-app`
- [ ] Create `GianMs-Tb/GianMs-Tb` with Profile README
- [ ] Create and publish 3 workflow repos
- [ ] Publish `portfolio` repo + deploy gianmarco.dev
- [ ] Pin 6 strategic repos
- [ ] Fix broken GitHub links in portfolio site
- [ ] Create `integration-auth-toolkit` (optional Phase 7)

---

## Post-migration profile (target state)

**Public repos visible to recruiters:**

- 3 workflow / integration case study repos
- 1 portfolio site repo
- 1 Flutter delivery project (secondary)
- 1 backend toolkit repo (when ready)
- Profile README repo

**Hidden from default view:** 5 archived academic/practice repos
