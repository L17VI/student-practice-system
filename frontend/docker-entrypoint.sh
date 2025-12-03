#!/bin/sh
set -e

if [ ! -d /app/node_modules ]; then
  echo "node_modules not found — installing npm dependencies..."
  npm install --silent --no-audit --no-fund || {
    echo "npm install failed; you may exec into the container to debug.";
  }
fi

exec "$@"
