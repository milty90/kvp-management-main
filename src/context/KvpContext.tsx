import { createContext, useContext, useState } from "react";
import type { Kvp } from "../types";

// const initialKvps: Kvp[] = [
//   {
//     id: 1,
//     title: "Beispiel KVP",
//     category: "Kategorie 1",
//     assignedTo: "",
//     description: "Beschreibung des KVP",
//     state: "Act",
//     priority: "High",
//     createdBy: "Max Mustermann",
//     createdAt: "01.01.2024",
//     targetDate: "05.01.2024",
//   },
//   {
//     id: 2,
//     title: "Beispiel KVP 2",
//     category: "Kategorie 2",
//     assignedTo: "Erika Mustermann",
//     description:
//       "Beschreibung des KVP 2 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     state: "Do",
//     priority: "Medium",
//     createdBy: "Erika Mustermann",
//     createdAt: "02.02.2024",
//     targetDate: "06.01.2024",
//   },
//   {
//     id: 3,
//     title: "Beispiel KVP 3",
//     category: "Kategorie 3",
//     assignedTo: "John Doe",
//     description:
//       "Beschreibung des KVP 3 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     state: "Plan",
//     priority: "Low",
//     createdBy: "John Doe",
//     createdAt: "03.03.2024",
//     targetDate: "07.03.2024",
//   },
//   {
//     id: 4,
//     title: "Beispiel KVP 4",
//     category: "Kategorie 3",
//     assignedTo: "Jane Doe",
//     description:
//       "Beschreibung des KVP 4 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     state: "Plan",
//     priority: "High",
//     createdBy: "Jane Doe",
//     createdAt: "04.04.2024",
//     targetDate: "04.04.2024",
//   },
//   {
//     id: 5,
//     title: "Beispiel KVP 5",
//     category: "Kategorie 3",
//     assignedTo: "Max Mustermann",
//     description:
//       "Beschreibung des KVP 5 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     state: "Do",
//     priority: "Medium",
//     createdBy: "Max Mustermann",
//     createdAt: "05.05.2024",
//     targetDate: "04.05.2024",
//   },
//   {
//     id: 6,
//     title: "Beispiel KVP 6",
//     category: "Kategorie 3",
//     assignedTo: "Erika Mustermann",
//     description:
//       "Beschreibung des KVP 6 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     state: "Plan",
//     priority: "Low",
//     createdBy: "Erika Mustermann",
//     createdAt: "06.06.2024",
//     targetDate: "10.06.2024",
//   },
//   {
//     id: 7,
//     title: "Beispiel KVP 7",
//     category: "Kategorie 1",
//     assignedTo: "John Doe",
//     description:
//       "Beschreibung des KVP 7 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliquaBeschreibung des KVP 7 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Beschreibung des KVP 7 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Beschreibung des KVP 7 lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     state: "Plan",
//     priority: "High",
//     createdBy: "John Doe",
//     createdAt: "07.07.2024",
//     targetDate: "11.07.2024",
//   },
//   {
//     id: 8,
//     title: "Beispiel KVP 8",
//     category: "Kategorie 6",
//     assignedTo: "Jane Doe",
//     description: "Beschreibung des KVP 8",
//     state: "Check",
//     priority: "Low",
//     createdBy: "Jane Doe",
//     createdAt: "08.08.2024",
//     targetDate: "12.08.2024",
//   },
//   {
//     id: 9,
//     title: "Beispiel KVP 9",
//     category: "Kategorie ",
//     assignedTo: "Jane Doe",
//     description: "Beschreibung des KVP 9",
//     state: "Act",
//     priority: "High",
//     createdBy: "Jane Doe",
//     createdAt: "11.11.2024",
//     targetDate: "12.11.2024",
//   },
// ];

const initialKvps: Kvp[] = [];

interface KvpContextType {
  kvps: Kvp[];
  addKvp: (kvp: Kvp) => void;
  updateKvp: (kvp: Kvp) => void;
  selectedKvp: Kvp | null;
  setSelectedKvp: (kvp: Kvp | null) => void;
}

const KvpContext = createContext<KvpContextType>({
  kvps: initialKvps,
  addKvp: () => {},
  updateKvp: () => {},
  selectedKvp: null,
  setSelectedKvp: () => {},
});

export const KvpProvider = ({ children }: { children: React.ReactNode }) => {
  const [kvps, setKvps] = useState<Kvp[]>(initialKvps);
  const [selectedKvp, setSelectedKvp] = useState<Kvp | null>(null);

  const addKvp = (kvp: Kvp) => {
    setKvps((prevKvps) => [...prevKvps, kvp]);
    setSelectedKvp(null);
  };

  const updateKvp = (updatedKvp: Kvp) => {
    setKvps((prevKvps) =>
      prevKvps.map((kvp) => (kvp.id === updatedKvp.id ? updatedKvp : kvp)),
    );
    setSelectedKvp(null);
  };

  return (
    <KvpContext.Provider
      value={{ kvps, addKvp, updateKvp, selectedKvp, setSelectedKvp }}
    >
      {children}
    </KvpContext.Provider>
  );
};

export const useKvpContext = () => useContext(KvpContext);
