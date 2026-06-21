#!/usr/bin/env python3
"""Connect Vercel project to GitHub repo."""
import requests, json, sys

with open("/tmp/vtoken.txt") as f:
    token = f.read().strip()

headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
project_id = "prj_InwwCqYYDuzAIP3chSo9U8duZFEL"
org_id = "team_2IDxdA4JKXCX5S27QgqR9VM9"

# Try POST /v1/git/connect
payload = {
    "type": "github",
    "repo": "digimiami/uncensored-hub",
    "orgId": org_id,
    "projectId": project_id
}

urls = [
    f"https://api.vercel.com/v1/projects/{project_id}/link",
    f"https://api.vercel.com/v1/integrations/git/connect",
    f"https://api.vercel.com/v1/projects/{project_id}/git/link",
]

for url in urls:
    print(f"Trying: POST {url.split('vercel.com')[1]}")
    r = requests.post(url, headers=headers, json=payload, timeout=15)
    print(f"  Status: {r.status_code}")
    if r.status_code in (200, 201):
        print(f"✅ Success!")
        print(f"  Response: {r.text[:200]}")
        break
    else:
        print(f"  {r.text[:150]}")
else:
    # Try PATCH with different field names
    for payload_variant in [
        {"gitSource": {"type": "github", "repo": "digimiami/uncensored-hub", "ref": "main"}},
        {"github": {"repo": "digimiami/uncensored-hub"}},
        {"ssoProtection": None},
    ]:
        print(f"\nTrying PATCH: {list(payload_variant.keys())[0]}")
        r = requests.patch(f"https://api.vercel.com/v9/projects/{project_id}", headers=headers, json=payload_variant, timeout=15)
        print(f"  Status: {r.status_code}")
        if r.status_code in (200, 201):
            print(f"  {r.text[:200]}")
        else:
            print(f"  {r.text[:150]}")
