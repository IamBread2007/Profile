"use client";

import { site } from "@/lib/config";
import SectionModal from "@/components/SectionModal";

type ProjectsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectsModal({ isOpen, onClose }: ProjectsModalProps) {
  return (
    <SectionModal isOpen={isOpen} onClose={onClose} title="/projects" maxWidth="max-w-4xl">
      <div className="grid gap-4 sm:grid-cols-2">
        {site.projects.map((project) => (
          <div
            key={project.name}
            className="card border border-base-content/15 bg-base-300/60 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="card-body p-5 flex flex-col justify-between">
              <div>
                <h3 className="card-title font-mono text-lg text-primary font-bold">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm text-base-content/80 mt-1.5 font-sans leading-relaxed">
                  {project.description}
                </p>
                {project.tech && project.tech.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="badge badge-ghost badge-sm font-mono text-[11px] bg-base-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {(project.url || project.repo) && (
                <div className="card-actions justify-end mt-4 pt-3 border-t border-base-content/10 gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-soft btn-accent btn-xs font-mono"
                    >
                      visit ↗
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-xs font-mono text-base-content/70 hover:text-base-content"
                    >
                      source ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionModal>
  );
}
