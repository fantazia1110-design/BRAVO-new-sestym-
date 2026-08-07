#!/bin/bash
git pull origin main
rm -rf .next
npm install
npm run dev
