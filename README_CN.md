<h4 align="right"><a href="https://github.com/yikZero/Rotts/blob/main/README.md">English</a> | <strong>简体中文</strong></h4>
<h1 align="center">Rotts</h1>

<p align="center"><strong>全栈应用，前端使用React和TypeScript，后端使用Python，运行在Vercel平台。</strong></p>

<div align="center">
    <a href="https://twitter.com/yikZero" target="_blank">
    <img alt="twitter" src="https://img.shields.io/badge/follow-yikZero-blue?logo=Twitter"></a>
    <a href="https://github.com/yikZero/Rotts/blob/main/LICENSE" target="_blank">
    <img alt="GitHub commit" src="https://img.shields.io/github/license/yikZero/Rotts"></a>
</div>

## 特性

- 🗣️ 使用 Microsoft Edge 的在线文本转语音服务
- 🎧 支持多种语音和语言
- 🎛️ 可调节语速、音量和音调
- 📜 支持字幕导出

## 技术栈

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Python (Flask)](https://flask.palletsprojects.com/)
- [Vercel](https://vercel.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 本地环境设置

```bash
# 前端
cd frontend
npm install
npm run dev

# 后端
cd api
pip install -r requirements.txt
source venv/bin/activate
FLASK_APP=index.py flask run
