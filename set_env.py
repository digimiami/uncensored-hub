#!/usr/bin/env python3
"""Set Vercel environment variables for the hub project."""
import requests, json

with open("/tmp/vtoken.txt") as f:
    token = f.read().strip()

with open("/root/.env.vercel") as f:
    env_content = f.read()

# Parse the env file
env_vars = {}
for line in env_content.strip().split("\n"):
    if "=" in line:
        k, v = line.split("=", 1)
        env_vars[k.strip()] = v.strip().strip('"').strip("'")

print(f"Found env vars: {list(env_vars.keys())}")

headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
project_id = "prj_InwwCqYYDuzAIP3chSo9U8duZFEL"

# Set RESEND_API_KEY
resend_key = env_vars.get("RESEND_API_KEY", "")
if resend_key:
    payload = {
        "key": "RESEND_API_KEY",
        "value": resend_key,
        "target": ["production", "preview"],
        "type": "encrypted"
    }
    r = requests.post(
        f"https://api.vercel.com/v10/projects/{project_id}/env",
        headers=headers, json=payload, timeout=15
    )
    print(f"RESEND_API_KEY: {r.status_code}")
    if r.status_code == 200:
        print(f"  ✅ Set!")
    else:
        print(f"  {r.text[:200]}")

# Also set VENICE_API_KEY
venice_key = env_vars.get("VENICE_API_KEY", "")
if venice_key:
    payload = {
        "key": "VENICE_API_KEY",
        "value": venice_key,
        "target": ["production", "preview"],
        "type": "encrypted"
    }
    r = requests.post(
        f"https://api.vercel.com/v10/projects/{project_id}/env",
        headers=headers, json=payload, timeout=15
    )
    print(f"VENICE_API_KEY: {r.status_code}")
    if r.status_code == 200:
        print(f"  ✅ Set!")
    else:
        print(f"  {r.text[:200]}")
