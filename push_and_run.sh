#!/bin/bash
echo "[auto] Adding all changes..."
git add -A
echo "[auto] Committing..."
git commit -m "update: auto save from Codespace" 2>&1 || echo "Nothing to commit"
echo "[auto] Pulling latest from main..."
git pull --rebase origin main
echo "[auto] Pushing to main..."
git push origin main
echo "[auto] Cleaning and installing..."
rm -rf .next
npm install --silent
echo "[auto] Done - run npm run dev"
