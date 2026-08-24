"use client";

import { site } from "@/lib/config";

export default function ProjectsView() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300">
      <div className="card w-full max-w-5xl border border-base-content/15 bg-base-200/95 shadow-2xl backdrop-blur-xl">
        <div className="card-body p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-base-content/10 pb-4">
            <h1 className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              /projects
            </h1>
            <a
              href="#home"
              className="btn btn-soft btn-secondary btn-sm font-mono text-xs cursor-pointer"
            >
              ← Back
            </a>
          </div>

          {/* Projects Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {site.projects.map((project) => (
              <div
                key={project.name}
                className="card border border-base-content/10 bg-base-300/70 p-5 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 shadow-md flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-mono text-lg font-bold text-primary">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm text-base-content/80 font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {project.tech && project.tech.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="badge badge-ghost badge-sm font-mono text-xs bg-base-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {(project.url || project.repo) && (
                  <div className="mt-5 pt-3 border-t border-base-content/10 flex items-center justify-end gap-2">
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
