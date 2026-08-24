"use client";

import { useEffect, type ReactNode } from "react";

type SectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
};

export default function SectionModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-3xl",
}: SectionModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full ${maxWidth} max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border border-base-content/20 bg-base-200/95 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-200`}
      >
        {/* Modal Window Header */}
        <div className="flex items-center justify-between border-b border-base-content/10 bg-base-300/80 px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="size-3 rounded-full bg-[#ed8796] inline-block shadow-sm hover:opacity-80 transition-opacity cursor-pointer"
              title="Close"
            />
            <span className="size-3 rounded-full bg-[#eed49f] inline-block shadow-sm" />
            <span className="size-3 rounded-full bg-[#a6da95] inline-block shadow-sm" />
          </div>

          <span className="font-mono text-sm font-bold text-primary tracking-wide">
            {title}
          </span>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-xs btn-circle font-mono text-base-content/60 hover:text-base-content hover:bg-base-content/10"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 text-base-content font-mono scrollbar-thin scrollbar-thumb-base-content/20">
          {children}
        </div>
      </div>
    </div>
  );
}
