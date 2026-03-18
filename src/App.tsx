import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddKvp from "./components/kvp/AddKvp";
import KvpView from "./views/KvpView";
import StatsView from "./views/StatsView";
import { useState } from "react";
import type { Kvp } from "./types";

const kvps: Kvp[] = [
  {
    id: 1,
    title: "Beispiel KVP",
    category: "Kategorie 1",
    assignedTo: "",
    description: "Beschreibung des KVP",
    state: "Check",
    priority: "High",
    createdBy: "Max Mustermann",
    createdAt: "01.01.2024",
    targetDate: "05.01.2024",
  },
  {
    id: 2,
    title: "Beispiel KVP 2",
    category: "Kategorie 2",
    assignedTo: "Erika Mustermann",
    description:
      "Beschreibung des KVP 2 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Do",
    priority: "Medium",
    createdBy: "Erika Mustermann",
    createdAt: "02.01.2024",
    targetDate: "06.01.2024",
  },
  {
    id: 3,
    title: "Beispiel KVP 3",
    category: "Kategorie 3",
    assignedTo: "John Doe",
    description:
      "Beschreibung des KVP 3 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Plan",
    priority: "Low",
    createdBy: "John Doe",
    createdAt: "03.01.2024",
    targetDate: "07.01.2024",
  },
  {
    id: 4,
    title: "Beispiel KVP 4",
    category: "Kategorie 3",
    assignedTo: "Jane Doe",
    description:
      "Beschreibung des KVP 4 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Plan",
    priority: "High",
    createdBy: "Jane Doe",
    createdAt: "04.01.2024",
    targetDate: "04.01.2024",
  },
  {
    id: 5,
    title: "Beispiel KVP 5",
    category: "Kategorie 2",
    assignedTo: "Max Mustermann",
    description:
      "Beschreibung des KVP 5 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Do",
    priority: "Medium",
    createdBy: "Max Mustermann",
    createdAt: "05.01.2024",
    targetDate: "04.01.2024",
  },
  {
    id: 6,
    title: "Beispiel KVP 6",
    category: "Kategorie 3",
    assignedTo: "Erika Mustermann",
    description:
      "Beschreibung des KVP 6 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Plan",
    priority: "Low",
    createdBy: "Erika Mustermann",
    createdAt: "06.01.2024",
    targetDate: "10.01.2024",
  },
  {
    id: 7,
    title: "Beispiel KVP 7",
    category: "Kategorie 1",
    assignedTo: "John Doe",
    description:
      "Beschreibung des KVP 7 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    state: "Plan",
    priority: "High",
    createdBy: "John Doe",
    createdAt: "07.01.2024",
    targetDate: "11.01.2024",
  },
  {
    id: 8,
    title: "Beispiel KVP 8",
    category: "Kategorie 2",
    assignedTo: "Jane Doe",
    description: "Beschreibung des KVP 8",
    state: "Do",
    priority: "Low",
    createdBy: "Jane Doe",
    createdAt: "08.01.2024",
    targetDate: "12.01.2024",
  },
  {
    id: 9,
    title: "Beispiel KVP 9",
    category: "Kategorie 2",
    assignedTo: "Jane Doe",
    description: "Beschreibung des KVP 9",
    state: "Act",
    priority: "Low",
    createdBy: "Jane Doe",
    createdAt: "11.01.2024",
    targetDate: "12.01.2024",
  },
];

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <KvpView kvps={kvps} onOpenModal={() => setShowModal(true)} />
          }
        />
        <Route path="/stats" element={<StatsView kvps={kvps} />} />
      </Routes>

      {showModal && <AddKvp onClose={() => setShowModal(false)} />}
    </BrowserRouter>
  );
}

export default App;
