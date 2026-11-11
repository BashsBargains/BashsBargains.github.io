"""Pull every live Woot offer from Woot's developer API into woot/woot.json.
Runs in GitHub Actions; the API key comes from the WOOT_API_KEY repo secret."""
import json, os, sys, time, urllib.request, urllib.parse

KEY = os.environ.get("WOOT_API_KEY", "").strip()
OUT = "woot/woot.json"
if not KEY:
    print("No WOOT_API_KEY secret yet; skipping."); sys.exit(0)

def get(page):
    req = urllib.request.Request(f"https://developer.woot.com/feed/All?page={page}",
                                 headers={"x-api-key": KEY, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)

def num(v):
    if isinstance(v, dict):
        v = v.get("Minimum", v.get("Maximum"))
    try: return round(float(v), 2)
    except (TypeError, ValueError): return None

def clean_url(u):
    # Straight to the product page, no tracking/referral tags
    if not u: return None
    p = urllib.parse.urlsplit(u)
    return urllib.parse.urlunsplit((p.scheme or "https", p.netloc, p.path, "", ""))

items, page = [], 1
while page <= 60:
    data = get(page)
    batch = data.get("Items") or data.get("Offers") or (data if isinstance(data, list) else [])
    items += batch
    if len(batch) < 100: break
    page += 1; time.sleep(1.2)

out, seen = [], set()
for o in items:
    oid = o.get("OfferId")
    if not oid or oid in seen: continue
    seen.add(oid)
    price, was = num(o.get("SalePrice")), num(o.get("ListPrice"))
    out.append({
        "id": oid, "title": (o.get("Title") or "").strip(),
        "price": price, "was": was if (was and price and was > price) else None,
        "cond": o.get("Condition") or "", "url": clean_url(o.get("Url")),
        "img": o.get("Photo") or None,
        "cats": [c for c in (o.get("Categories") or []) if isinstance(c, str)],
        "soldout": bool(o.get("IsSoldOut")), "start": o.get("StartDate"), "end": o.get("EndDate"),
    })
out = [o for o in out if o["title"] and o["url"] and o["price"] is not None]
if not out:
    print("Feed came back empty; keeping the last good file."); sys.exit(0)
json.dump({"updated": int(time.time() * 1000), "offers": out}, open(OUT, "w"), separators=(",", ":"))
print(f"Saved {len(out)} Woot offers")
