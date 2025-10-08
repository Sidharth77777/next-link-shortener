# 🔗 Skurl — Next.js Link Shortener

A modern **link shortener** built using **Next.js 15**, **Drizzle ORM**, and **Neon Postgres** — deployed on **Vercel**.  
Easily shorten, copy, and share clean URLs using your own custom domain — [skurl.click](https://skurl.click) 🚀

---

## 🧠 Features

- ⚡ **Instant Link Shortening** — Paste a long URL, choose a preferred short name, and generate instantly  
- 🪄 **Custom Short Names** — Create meaningful short URLs like `skurl.click/project`  
- 🧩 **Built with Drizzle ORM** — Type-safe schema and migration management  
- 🌐 **Hosted on Neon (Postgres)** — Fast, serverless database for link storage  
- 🧱 **Deployed via Vercel** — Automatic HTTPS, custom domain, and edge performance  
- 🌗 **Dark Mode UI** — TailwindCSS + Framer Motion for smooth animations  
- 📋 **Copy to Clipboard** — Copy and share generated short links with one click  

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Styling** | [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **Backend** | Next.js API Routes |
| **Database** | [Neon PostgreSQL](https://neon.tech/) |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |

---

---

## 📸 Preview

![Dashboard](https://drive.usercontent.google.com/download?id=1n9H4zqPP0q7M7qE9FNQ7HrqhcnjIrLvY&export=view&authuser=0)  
*Enter the link your want to shorten and as you prefer.*

---

---

## ⚙️ Setup Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sidharth77777/next-link-shortener.git
cd next-link-shortener
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
```bash
DATABASE_URL=<your_neon_postgres_url>
NEXT_PUBLIC_HOST_URL=<your_domain>
```

### 4️⃣ Generate & Push Drizzle Schema
```bash
npx drizzle-kit generate
npx drizzle-kit push
```

---

### 5️⃣ Run the Dev Server
```bash
npm run dev
```

---

## 🧾 API Reference

### Body (JSON):
```bash
{
  "url": "https://example.com/very/long/link",
  "preferredUrl": "example"
}

```

### Response:
```bash
{
  "shortUrl": "https://<your-domain>/example"
}
```

### Error Codes:
- **400** → Missing URL
- **409** → Preferred short name already in use
- **500** → Internal server error
---


---

## 👨‍💻 Author
 Sidharth K S
 
 Github: [https://github.com/Sidharth77777](https://github.com/Sidharth77777)
 
 X: [https://x.com/cryptoSid1564](https://x.com/cryptoSid1564)

---
