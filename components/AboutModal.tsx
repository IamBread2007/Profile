"use client";

import { site } from "@/lib/config";
import SectionModal from "@/components/SectionModal";

type AboutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <SectionModal isOpen={isOpen} onClose={onClose} title="/about">
      <div className="flex flex-col gap-5 leading-relaxed">
        {/* Paragraphs */}
        <div className="space-y-3 text-base text-base-content/90 font-sans">
          {site.about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Tech Stack Skills */}
        <div className="mt-2 border-t border-base-content/10 pt-4">
          <h3 className="text-xs uppercase font-mono text-accent font-bold tracking-wider mb-3">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {site.about.skills.map((skill) => (
              <span
                key={skill}
                className="badge badge-outline badge-accent font-mono py-3 px-3 hover:bg-accent/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionModal>
  );
}
