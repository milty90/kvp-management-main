# 🗂️ KVP Management

<p align="center">
  <img src="public/spark-dark.png" alt="KVP Management Logo" width="350" />
</p>

<p align="center">
  <a href="https://pdcamanagement.netlify.app">
    <img src="https://img.shields.io/badge/Live%20Demo-pdcamanagement.netlify.app-brightgreen?style=for-the-badge&logo=netlify" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  A modern, browser-based <strong>PDCA cycle management application</strong> built with React + TypeScript + Vite.<br/>
  All data is stored locally via IndexedDB — <em>no server, no account, no data leaks.</em>
</p>

---

## 📸 Screenshots

> _Add screenshots or a demo GIF here to showcase the UI_

<!-- Example:
<p align="center">
  <img src="docs/screenshots/dashboard.png" alt="Dashboard" width="700" />
</p>
<p align="center">
  <img src="docs/screenshots/detail-view.png" alt="Detail View" width="700" />
</p>
-->

---

## ✨ Features

| Feature                   | Description                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| ✅ **PDCA Management**    | Create, edit, and delete PDCA cycles with full lifecycle support |
| 🔍 **Search & Filter**    | Quickly find items by keyword, status, or date                   |
| 📋 **Activity Log**       | Track every change with a detailed, timestamped audit trail      |
| 💾 **Offline-first**      | All data stored locally in IndexedDB — works without internet    |
| 📱 **Responsive Design**  | Fully functional on mobile and desktop                           |
| ⚡ **Fast & Lightweight** | Powered by Vite, zero backend overhead                           |

---

## 🛠️ Tech Stack

| Technology                                    | Version | Purpose                  |
| --------------------------------------------- | ------- | ------------------------ |
| [React](https://react.dev/)                   | 19      | UI framework             |
| [TypeScript](https://www.typescriptlang.org/) | 5       | Type-safe JavaScript     |
| [Vite](https://vitejs.dev/)                   | 6       | Build tool & dev server  |
| [Tailwind CSS](https://tailwindcss.com/)      | 4       | Utility-first styling    |
| IndexedDB (native)                            | —       | Local persistent storage |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/milty90/kvp-management.git
cd kvp-management

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
kvp-management/
├── public/                   # Static assets (logo, favicon, etc.)
├── src/
│   ├── components/           # Reusable React components
│   │   └── items/            # PDCA item & activity log components
│   ├── storage/              # IndexedDB logic (kvpDatabase.ts)
│   ├── types/                # Shared TypeScript interfaces & types
│   ├── utils/                # Helper functions (e.g. formatDate)
│   └── main.tsx              # Application entry point
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🌐 Deployment

The app is deployed and publicly accessible at:

**➡️ [https://pdcamanagement.netlify.app](https://pdcamanagement.netlify.app)**

To deploy your own instance:

1. Push your code to GitHub.
2. Connect the repository to [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Deploy — done!

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

1. **Fork** the repository
2. **Create** a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** — describe what you changed and why

Please follow the existing code style and make sure TypeScript types are properly defined for any new additions.

### Reporting Bugs

Found a bug? Please [open an issue](https://github.com/milty90/kvp-management/issues) and include:

- A clear description of the problem
- Steps to reproduce it
- Your browser and OS version

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

MIT © [milty90](https://github.com/milty90)
