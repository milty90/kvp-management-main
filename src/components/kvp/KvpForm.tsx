import { useState, useEffect } from "react";
import type { Kvp } from "../../types";
import ColorButton from "../buttons/ColorButton";
import { useKvpContext } from "../../context/KvpContext";
import { showToast } from "../items/ToastItem";
import { kvpInputFormData } from "../../utils/kvpInputFormData";
import { kvpInputFormColor } from "../../utils/kvpInputFromColor";
import { supabase } from "../../utils/supabase";
import { useTheme } from "../../context/ThemeContext";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useTranslation } from "../../utils/useTranslation";
import { isDemoUser } from "../../features/authDatabase";
import { useSessionContext } from "../../context/SessionContext";
import { logActivity } from "../../storage/kvpDatabase";
import { sliceText } from "../../utils/sliceText";

interface KvpFormProps {
  onClose: () => void;
  initialData?: Kvp;
}

export default function KvpForm({ onClose, initialData }: KvpFormProps) {
  const { addKvp, updateKvp } = useKvpContext();
  const translation = useTranslation();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [category, setCategory] = useState(initialData?.category || "");
  const [pdcaState, setPdcaState] = useState<Kvp["state"] | "">(
    initialData?.state || "",
  );
  const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || "");
  const [targetDate, setTargetDate] = useState(initialData?.targetDate || "");
  const [priority, setPriority] = useState<Kvp["priority"] | "">(
    initialData?.priority || "",
  );
  const [benefit, setBenefit] = useState(initialData?.benefit || "");
  const [createdBy, setCreatedBy] = useState(
    initialData?.createdBy || translation.pdcaForm.unknownUser,
  );

  const { theme } = useTheme();
  const width = useWindowWidth();
  const { session } = useSessionContext();
  const isDemo = isDemoUser(session?.user?.email);

  useEffect(() => {
    const fetchUser = async () => {
      if (!initialData?.createdBy) {
        const { data } = await supabase.auth.getUser();
        setCreatedBy(
          data.user?.email?.split("@")[0] || translation.pdcaForm.unknownUser,
        );
      }
    };
    fetchUser();
  }, [initialData?.createdBy]);

  const { pdcaTextColor, priorityTextColor, targetDateTextColor } =
    kvpInputFormColor({
      pdcaState: pdcaState as Kvp["state"],
      targetDate,
      priority: priority as Kvp["priority"],
    });

  const { newKvp, updateKvpData } = kvpInputFormData({
    title,
    description,
    category,
    pdcaState: pdcaState as Kvp["state"],
    assignedTo,
    targetDate,
    priority: priority as Kvp["priority"],
    benefit: benefit,
    initialData,
    createdBy: createdBy,
  });

  function submitForm() {
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

    initialData ? updateKvp(updateKvpData) : addKvp(newKvp);

    onClose();
    showToast(
      width,
      theme,
      "success",
      `${translation.pdcaForm.pdca} ${initialData ? translation.pdcaForm.updated : translation.pdcaForm.added}: ${initialData ? updateKvpData.title : newKvp.title}`,
    );

    logger();
  }

  const logger = async () => {
    await logActivity({
      id: Date.now().toString(),
      userId: session?.user.id || "unknown",
      userName: session?.user.email || "Unknown User",
      action: initialData ? "UPDATED" : "CREATED",
      entityType: "PDCA",
      entityId: initialData ? String(initialData.id) : String(newKvp.id),
      details: `User ${initialData ? "updated" : "created"} PDCA "${initialData ? sliceText(updateKvpData.title, 50) : sliceText(newKvp.title, 50)}".`,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 z-40 bg-gray-700/30 shadow-md flex items-center justify-center">
      <div className="px-6 bg-surface md:rounded-lg pt-4 md:py-4 h-full md:h-auto shadow-md w-120 relative">
        <button
          type="button"
          className="absolute top-3 right-4 text-3xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl text-text-primary font-semibold mt-4">
          {initialData
            ? translation.pdcaForm.editTitle
            : translation.pdcaForm.createTitle}
          <img
            src={theme === "dark" ? "/spark-logo-dark.png" : "/spark-logo.png"}
            alt="Add"
            className="inline-block h-6 w-6 mb-2.5 ml-1 object-cover"
          />
        </h2>

        <p className="text-xs text-text-secondary mb-4">
          {translation.pdcaForm.subTitle}
        </p>
        <form
          className="flex flex-col items-start gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <span className="text-sm pl-1 -mb-3 text-text-primary">
            {translation.pdcaForm.formTitle} *
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            required
            placeholder={translation.pdcaForm.formTitlePlaceholder}
            className={`w-full border text-sm text-text-primary border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"}`}
          />
          <span className="text-sm pl-1 -mb-3 text-text-primary">
            {translation.pdcaForm.formDescription} *
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder={translation.pdcaForm.formDescriptionPlaceholder}
            className={`w-full border text-sm text-text-primary resize-none border-gray-300 h-30 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"}`}
          />
          <div className="grid grid-cols-2 items-center mt-2 gap-4 w-full">
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs pl-1 -mb-3 text-text-primary">
                {translation.pdcaForm.formCategory} *
              </span>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                placeholder={translation.pdcaForm.formCategoryPlaceholder}
                className={`text-xs w-full border text-text-primary border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} placeholder:text-text-secondary`}
              />
              <span className="text-xs pl-1 -mb-3 text-text-primary">
                {translation.pdcaForm.formPdcaStateTitle} *
              </span>
              <select
                value={pdcaState}
                onChange={(e) =>
                  setPdcaState(e.target.value as Kvp["state"] | "")
                }
                required
                className={` text-xs w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} ${pdcaTextColor}`}
              >
                <option value="">
                  {translation.pdcaForm.formPdcaState[0]}
                </option>
                <option value="Plan">
                  {translation.pdcaForm.formPdcaState[1]}
                </option>
                <option value="Do">
                  {translation.pdcaForm.formPdcaState[2]}
                </option>
                <option value="Check">
                  {translation.pdcaForm.formPdcaState[3]}
                </option>
                <option value="Act">
                  {translation.pdcaForm.formPdcaState[4]}
                </option>
              </select>
              <span className="text-xs pl-1 -mb-3 text-text-primary">
                {translation.pdcaForm.formAssignedTo}
              </span>
              <input
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                type="text"
                placeholder={translation.pdcaForm.formAssignedToPlaceholder}
                className={`text-xs w-full border text-text-primary border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} placeholder:text-text-secondary`}
              />
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="text-xs pl-1 -mb-3 text-text-primary">
                {translation.pdcaForm.formTargetDate}
              </span>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                placeholder={translation.pdcaForm.formTargetDatePlaceholder}
                className={`text-xs w-full max-w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} ${targetDateTextColor}`}
              />
              <span className="text-xs pl-1 -mb-3 text-text-primary">
                {translation.pdcaForm.formPriority[0]} *
              </span>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Kvp["priority"] | "")
                }
                required
                className={`text-xs w-full border border-gray-300 rounded-md p-2  focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} ${priorityTextColor}`}
              >
                <option value="">{translation.pdcaForm.formPriority[0]}</option>
                <option value="High">
                  {translation.pdcaForm.formPriority[1]}
                </option>
                <option value="Medium">
                  {translation.pdcaForm.formPriority[2]}
                </option>
                <option value="Low">
                  {translation.pdcaForm.formPriority[3]}
                </option>
              </select>
              <span className="text-xs pl-1 -mb-3 text-text-primary">
                {translation.pdcaForm.formBenefit}
              </span>
              <input
                type="text"
                placeholder={translation.pdcaForm.formBenefitPlaceholder}
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
                className={`text-xs w-full border text-text-primary border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ${theme === "dark" ? "focus:ring-green-500" : "focus:ring-blue-500"} placeholder:text-text-secondary`}
              />
            </div>
          </div>
          <div
            className={`border-t ${theme === "dark" ? "border-gray-500" : "border-gray-300"} w-full mt-2`}
          />
          <div className="flex w-full items-center justify-end gap-2  my-2">
            <ColorButton
              color="gray"
              icon=""
              onClick={onClose}
              type="button"
              isTextOnly={true}
            >
              {translation.pdcaForm.cancelButton}
            </ColorButton>
            {isDemo ? (
              <div className="opacity-60">
                <ColorButton
                  color="gray"
                  icon="denied.svg"
                  onClick={() =>
                    showToast(
                      width,
                      theme,
                      "warning",
                      translation.demoMode.toastMessage,
                    )
                  }
                  type="button"
                >
                  {initialData
                    ? translation.pdcaForm.saveEditButton
                    : translation.pdcaForm.saveCreateButton}
                </ColorButton>
              </div>
            ) : (
              <ColorButton
                color={theme === "dark" ? "green" : "blue"}
                icon="/add.svg"
                type="submit"
              >
                {initialData
                  ? translation.pdcaForm.saveEditButton
                  : translation.pdcaForm.saveCreateButton}
              </ColorButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
