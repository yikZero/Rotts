<h4 align="right"><strong>English</strong> | <a href="https://github.com/yikZero/Rotts/blob/main/README_CN.md">简体中文</a></h4>
<h1 align="center">Rotts</h1>

<p align="center"><strong>A full-stack application running on Vercel, featuring a frontend built with React and TypeScript and a backend in Python.</strong></p>

<div align="center">
    <a href="https://twitter.com/yikZero" target="_blank">
    <img alt="twitter" src="https://img.shields.io/badge/follow-yikZero-blue?logo=Twitter"></a>
    <a href="https://github.com/yikZero/Rotts/blob/main/LICENSE" target="_blank">
    <img alt="GitHub commit" src="https://img.shields.io/github/license/yikZero/Rotts"></a>
</div>

## Features

- 🗣️ Utilizes Microsoft Edge's online text-to-speech service
- 🎧 Supports multiple voices and languages
- 🎛️ Adjustable speech rate, volume, and pitch
- 📜 Supports subtitle export

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Python (Flask)](https://flask.palletsprojects.com/)
- [Vercel](https://vercel.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FyikZero%2FRotts&project-name=rotts&repository-name=rotts)

## Local Environment Setup

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd api
pip install -r requirements.txt
source venv/bin/activate
uvicorn main:app --reload