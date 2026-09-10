# Softpal Technologies — Recruiting Intelligence Platform

## Local development

```bash
npm install
npm run dev
```

Opens at http://localhost:5173. That's it — no API key, no environment
variables, no serverless function needed. Every module (including Resume
Ingestion) runs entirely on local computation in the browser: regex-based
resume field extraction, cosine-similarity matching, weighted scoring, CSV
export. Nothing calls an external API, so there's no rate limit, no cost,
and nothing that can go down with volume.

## Deploying to Vercel

1. Push this repo to GitHub
2. vercel.com -> Add New -> Project -> import the repo
3. Deploy — no environment variables to configure

## What changed from earlier versions

The Resume Parser, JD Analyzer, and AI Assistant modules (which called the
Claude API) have been replaced with a "Resume Ingestion" module: a WhatsApp
+ bulk-upload demo pipeline that parses resumes locally with pattern
matching instead of an LLM call. This removes the need for an API key or
serverless proxy entirely.

## Build for production locally (optional)

```bash
npm run build
npm run preview
```
