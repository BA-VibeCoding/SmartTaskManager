# Architect Desk - Smart Task Manager

A production-ready Next.js 14 task management application featuring a dynamic weighted priority system.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run in development mode:**
   ```bash
   npm run dev
   ```

3. **Build and start for production:**
   ```bash
   npm run build
   ```
   ```bash
   npm start
   ```

## 🧠 Core Features

- **Weighted Priority Logic**: Real-time calculation of task scores based on:
    - Base Priority
    - Due Date Urgency
    - Task Age
    - Labels (Context)
- **Settings & Config**: Full control over mathematical weights and priority thresholds.
- **Local Persistence**: Data stays in your browser via `localStorage`.
- **Theme Engine**: Seamless Light & Dark mode switching with persisted preference.
- **Responsive & Modern**: Built with Next.js 14, Tailwind CSS, and Lucide icons.

## 🏗️ Technical Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Class-based dark mode)
- **Data Hydration**: Custom hook with `localStorage` and hydration check.
- **Priority Logic**: Runtime-derived (non-persisted) scoring for performance and flexibility.

## 📦 Deployment on Vercel

This project is ready for zero-configuration deployment:

1. Push your code to a GitHub repository.
2. Link the repository to your Vercel account.
3. Vercel will auto-detect Next.js and build the project.

---
*Created as a "Local-first" productivity hub.*
