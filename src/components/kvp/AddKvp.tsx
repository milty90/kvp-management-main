import { useState } from "react";
import type { Kvp } from "../../types";
import ColorButton from "../buttons/ColorButton";
import { useKvpContext } from "../../context/KvpContext";
import { ToastContainer, toast } from "react-toastify";

interface AddKvpProps {
  onClose: () => void;
}

export default function AddKvp({ onClose }: AddKvpProps) {
  const { addKvp } = useKvpContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pdcaState, setPdcaState] = useState<Kvp["state"] | "">("");
  const [assignedTo, setAssignedTo] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [priority, setPriority] = useState<Kvp["priority"] | "">("");
  const [expectedBenefit, setExpectedBenefit] = useState("");

  const priorityTextColor =
    priority === "High"
      ? "text-red-700"
      : priority === "Medium"
        ? "text-yellow-700"
        : priority === "Low"
          ? "text-green-700"
          : "text-gray-400";

  const pcdaTextColor =
    pdcaState === "Plan"
      ? "text-blue-700"
      : pdcaState === "Do"
        ? "text-violet-700"
        : pdcaState === "Check"
          ? "text-yellow-700"
          : pdcaState === "Act"
            ? "text-green-700"
            : "text-gray-400";

  const targetDateTextColor = targetDate
    ? new Date(targetDate) < new Date()
      ? "text-red-700"
      : "text-gray-700"
    : "text-gray-400";

  const submitForm = () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !category.trim() ||
      !pdcaState ||
      !priority ||
      !assignedTo.trim() ||
      !targetDate ||
      targetDateTextColor === "text-red-700"
    ) {
      return;
    }

    const newKvp: Kvp = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      state: pdcaState,
      assignedTo: assignedTo.trim(),
      targetDate,
      priority,
      createdBy: "Aktueller Benutzer",
      createdAt: new Date().toISOString().split("T")[0],
      expectedBenefit: expectedBenefit.trim(),
    };
    addKvp(newKvp);
    onClose();
    toast.success(`KVP ${newKvp.title} erfolgreich hinzugefügt!`, {
      position: "top-center",
      className:
        "mt-6 color-green-500 font-poppins text-sm rounded-lg shadow-lg ",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-700/80 shadow-md flex items-center justify-center">
      <div className="px-6 py-4 bg-white rounded-lg shadow-md w-120 relative">
        <button
          type="button"
          className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl text-gray-700 font-semibold  mt-4">
          Neuen KVP hinzufügen
          <img
            src="/spark-logo.png"
            alt="Add"
            className="inline-block h-6 w-6 mb-3 object-cover"
          />
        </h2>

        <p className="text-xs text-gray-500 mb-4">
          Bitte füllen Sie alle Pflichtfelder aus.
        </p>
        <form
          className="flex flex-col items-start gap-4"
          onSubmit={handleSubmit}
        >
          <span className="text-sm pl-1 -mb-3 text-gray-500">Titel *</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            placeholder="Titel"
            className="w-full border text-sm text-gray-800 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm pl-1 -mb-3 text-gray-500">
            Beschreibung *
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Beschreibung"
            className="w-full border text-sm text-gray-800 border-gray-300 h-30 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 items-center mt-3 gap-4 w-full">
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Kategorie *
              </span>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder="Kategorie"
                className="text-xs w-full border text-gray-800 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                PCDA-Phase *
              </span>
              <select
                value={pdcaState}
                onChange={(e) =>
                  setPdcaState(e.target.value as Kvp["state"] | "")
                }
                required
                className={`text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${pcdaTextColor}`}
              >
                <option value="">PCDA-Phase</option>
                <option value="Plan">Plan</option>
                <option value="Do">Do</option>
                <option value="Check">Check</option>
                <option value="Act">Act</option>
              </select>
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Zugewiesen an
              </span>
              <input
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                type="text"
                placeholder="Zugewiesen an"
                className="text-xs w-full border text-gray-700 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs pl-1 -mb-3 text-gray-500 ">
                Zieldatum
              </span>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                placeholder="Zieldatum"
                className={`text-xs w-full border text-gray-400 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 ${targetDateTextColor}`}
              />
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Priorität *
              </span>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Kvp["priority"] | "")
                }
                required
                className={`text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 ${priorityTextColor}`}
              >
                <option value="">Priorität</option>
                <option value="High">Hoch</option>
                <option value="Medium">Mittel</option>
                <option value="Low">Niedrig</option>
              </select>
              <span className="text-xs pl-1 -mb-3 text-gray-500">
                Erwarteter Nutzen
              </span>
              <input
                type="text"
                placeholder="z.B 30% Zeitersparnis"
                value={expectedBenefit}
                onChange={(e) => setExpectedBenefit(e.target.value)}
                className="text-xs w-full border text-gray-800 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="border-t border-gray-200 w-full mt-3" />
          <div className="flex w-full items-center justify-end gap-2  my-2">
            <ColorButton color="gray" icon="" onClick={onClose} type="button">
              Abbrechen
            </ColorButton>
            <ColorButton color="blue" icon="/add.svg" type="submit">
              KVP hinzufügen
            </ColorButton>
          </div>
        </form>
      </div>
    </div>
  );
}
