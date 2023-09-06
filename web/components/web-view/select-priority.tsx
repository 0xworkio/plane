// react
import React, { useState } from "react";

// icons
import { ChevronDownIcon } from "lucide-react";

// constants
import { PRIORITIES } from "constants/project";

// components
import { getPriorityIcon } from "components/icons";
import { WebViewModal } from "./web-view-modal";

// helpers
import { capitalizeFirstLetter } from "helpers/string.helper";

type Props = {
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
};

export const PrioritySelect: React.FC<Props> = (props) => {
  const { value, onChange, disabled = false } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WebViewModal
        isOpen={isOpen}
        modalTitle="Select priority"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <WebViewModal.Options
          options={
            PRIORITIES?.map((priority) => ({
              label: priority ? capitalizeFirstLetter(priority) : "None",
              value: priority,
              checked: priority === value,
              onClick: () => {
                setIsOpen(false);
                if (disabled) return;
                onChange(priority);
              },
              icon: (
                <span
                  className={`text-left text-xs capitalize rounded ${
                    priority === "urgent"
                      ? "border-red-500/20 text-red-500"
                      : priority === "high"
                      ? "border-orange-500/20 text-orange-500"
                      : priority === "medium"
                      ? "border-yellow-500/20 text-yellow-500"
                      : priority === "low"
                      ? "border-green-500/20 text-green-500"
                      : "border-custom-border-200 text-custom-text-200"
                  }`}
                >
                  {getPriorityIcon(priority, "text-sm")}
                </span>
              ),
            })) || []
          }
        />
      </WebViewModal>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        className={
          "relative w-full px-2.5 py-0.5 text-base flex justify-between items-center gap-0.5 text-custom-text-100"
        }
      >
        {value ? capitalizeFirstLetter(value) : "None"}
        <ChevronDownIcon className="w-5 h-5" />
      </button>
    </>
  );
};
