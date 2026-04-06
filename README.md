# Architect Desk - Smart Task Manager

A professional-grade, local-first task management system built with Next.js 14, featuring a highly configurable **Weighted Priority Engine**.

## ?? Key Features

- **Weighted Priority Algorithm**: Automatically sorts tasks based on base priority, due date urgency, task age, and label weightings.
- **Architectural Design System**: Minimalist, high-performance UI with a focus on deep work and visual clarity.
- **Local-First Architecture**: Your data resides in your browser. No account required, immediate responsiveness.
- **Dynamic Configuration**: Adjust the logic engine weights and priority thresholds in real-time.
- **Light/Dark Mode**: Adaptive system themes with persistent user preferences.

## ??? Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Typography**: Manrope
- **State Management**: React Context API
- **Persistence**: LocalStorage

## ??? Architecture

The application is structured around a central priority calculation engine:
```
Priority Score = (Base * Weight) + (Urgency * Weight) + (Age * Weight) + (Labels * Weight)
```

- `src/utils/priority-engine.ts`: Core logic for task scoring.
- `src/context/TaskContext.tsx`: Manages task and label lifecycles.
- `src/context/SettingsContext.tsx`: Manages system-wide weights and themes.

## ?? Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com).

### Quick Deploy

1. **Push to GitHub**: Initialize a repository and push your local files.
2. **Connect to Vercel**: Import the repository into the Vercel dashboard.
3. **Build Settings**: The default Next.js build settings will work automatically.
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Local Setup

```bash
# Install dependencies
npm install

# Run build to verify
npm run build

# Start development server
npm run dev
```

## ?? Project Details

- **Author**: GitHub Copilot (Gemini 3 Flash)
- **Version**: 1.0.0

