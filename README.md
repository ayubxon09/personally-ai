# 🤖 Shaxsiy AI Assistant

Sizning to'liq shaxsiy AI assistantingiz — Claude AI asosida qurilgan.

---

## ✨ Imkoniyatlar

| Rejim | Tavsif |
|-------|--------|
| 💬 Suhbat | Har qanday mavzuda oddiy suhbat |
| ⚡ Kod | Har qanday tilda professional kod yozish |
| 🏗️ Fullstack | Frontend + Backend + DB birgalikda |
| 📱 Mobile App | React Native / Flutter ilovalar |
| 🔍 Tahlil | Kodni chuqur tahlil, xato va xavfsizlik tekshiruvi |
| 🤝 Do'st | Samimiy suhbatdosh, qo'llab-quvvatlovchi |

---

## 🚀 Ishga tushirish (Localhost)

### 1. Loyihani yuklab oling
```bash
git clone <your-repo>
cd personal-ai
```

### 2. Kerakli paketlarni o'rnating
```bash
npm install
```

### 3. API kalitni sozlang
`.env.local` faylini oching va `ANTHROPIC_API_KEY` ni to'ldiring:

```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_OWNER_NAME=SizningIsmingiz
APP_SECRET=ixtiyoriy_maxfiy_kalit
```

**API kalit olish:** https://console.anthropic.com → API Keys → Create Key

### 4. Ishga tushiring
```bash
npm run dev
```

Brauzerda oching: **http://localhost:3000**

---

## ☁️ Vercel ga Deploy qilish (Bepul)

### 1. GitHub ga yuklang
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/personal-ai.git
git push -u origin main
```

### 2. Vercel ga ulang
1. **https://vercel.com** ga kiring (GitHub bilan)
2. **"New Project"** → GitHub repo ni tanlang
3. **Environment Variables** bo'limiga kiring:
   - `ANTHROPIC_API_KEY` = sizning API kalitingiz
   - `NEXT_PUBLIC_OWNER_NAME` = sizning ismingiz
4. **Deploy** tugmasini bosing

Tayyor! Vercel sizga `https://personal-ai-xxx.vercel.app` manzil beradi.

---

## 📁 Loyiha Strukturasi

```
personal-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts        ← AI chat backend (streaming)
│   │   │   └── analyze/route.ts     ← Kod tahlil backend
│   │   ├── globals.css              ← Global CSS
│   │   ├── layout.tsx               ← Root layout
│   │   └── page.tsx                 ← Bosh sahifa
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatWindow.tsx       ← Asosiy chat ekrani
│   │   │   ├── ChatInput.tsx        ← Xabar yozish maydoni
│   │   │   └── MessageBubble.tsx    ← Xabar ko'rinishi (markdown+kod)
│   │   └── layout/
│   │       ├── Sidebar.tsx          ← Chap panel (suhbatlar, rejimlar)
│   │       └── ChatLayout.tsx       ← Umumiy layout wrapper
│   ├── lib/
│   │   ├── modes.ts                 ← 6 ta rejim konfiguratsiyasi
│   │   └── store.ts                 ← State management (Zustand)
│   └── types/
│       └── index.ts                 ← TypeScript turlari
├── .env.local                       ← API kalitlar (git ga yuklanmaydi!)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🛠️ Texnologiyalar

- **Framework:** Next.js 14 (App Router)
- **Til:** TypeScript
- **Stil:** Tailwind CSS (Dark mode)
- **AI:** Anthropic Claude (claude-opus-4-5)
- **State:** Zustand (localStorage da saqlanadi)
- **Markdown:** react-markdown + remark-gfm
- **Kod rangi:** react-syntax-highlighter
- **Deploy:** Vercel

---

## 💡 Foydali maslahatlar

- Suhbat tarixi brauzeringizda (localStorage) saqlanadi
- Har bir rejim boshqa system prompt ishlatadi
- Streaming orqali javob keladi (real-time)
- Mobil qurilmalarda ham ishlaydi

---

## 🔧 Muammo bo'lsa

**"API key topilmadi" xatosi:**
→ `.env.local` faylidagi `ANTHROPIC_API_KEY` ni tekshiring

**"Module not found" xatosi:**
```bash
rm -rf node_modules
npm install
```

**Port band:**
```bash
npm run dev -- -p 3001
```
