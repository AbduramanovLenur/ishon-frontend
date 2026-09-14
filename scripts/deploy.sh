#!/usr/bin/env bash
set -euo pipefail

test -s dist/index.html
target=deploy@185.185.82.253
webroot=/var/www/ishon-frontend
export RSYNC_RSH='ssh -o BatchMode=yes -o StrictHostKeyChecking=yes -o ConnectTimeout=15'

# Upload assets first and retain old hashes for browsers running the previous build.
rsync -az --chmod=D755,F644 --exclude=index.html dist/ "$target:$webroot/"
# rsync replaces index.html by rename only after the complete file has arrived.
rsync -az --chmod=F644 dist/index.html "$target:$webroot/index.html"

# Confirm that Nginx serves exactly the entry point that was built in this run.
served_index=$(mktemp)
trap 'rm -f "$served_index"' EXIT
curl --fail --silent --show-error --retry 3 --max-time 30 \
  -H 'Cache-Control: no-cache' "https://app.ishonhr.uz/index.html?deploy=${GITHUB_SHA:-manual}" \
  -o "$served_index"
cmp dist/index.html "$served_index"
