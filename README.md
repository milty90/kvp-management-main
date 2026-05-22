# 🗂️ KVP Management

A modern, browser-based **key-value pair (KVP) management application** built with React + TypeScript + Vite. Data is stored locally using IndexedDB – no server required.

---

## 🚀 Features

- ✅ Create, edit and delete KVPs
- 🔍 Search and filter
- 📋 Activity Log
- 💾 Local data storage (IndexedDB)
- 📱 Responsive design (mobile + desktop)

---

## 🛠️ Tech Stack

| Technology                                    | Description             |
| --------------------------------------------- | ----------------------- |
| [React 19](https://react.dev/)                | UI framework            |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript    |
| [Vite](https://vitejs.dev/)                   | Build tool & dev server |
| [Tailwind CSS 4](https://tailwindcss.com/)    | Utility-first CSS       |
| IndexedDB                                     | Local data storage      |

---

## ⚙️ Installation & Running

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Steps

```bash
# Clone the repository
git clone https://github.com/milty90/kvp-management-main.git
cd kvp-management-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 📦 Build

```bash
# Production build
npm run build

# Preview the build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/       # React components
│   └── items/        # KVP and log components
├── storage/          # IndexedDB handling (kvpDatabase.ts)
├── types/            # TypeScript types
├── utils/            # Helper functions (e.g. formatDate)
└── main.tsx          # Entry point
```

---

## 📄 License

MIT © [milty90](https://github.com/milty90)
