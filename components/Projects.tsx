import { site } from "@/lib/config";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 mx-auto w-full max-w-4xl scroll-mt-8 px-4 pb-28"
    >
      <h2 className="mb-6 font-mono text-3xl text-primary">/projects</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {site.projects.map((project) => (
          <div
            key={project.name}
            className="card border border-base-content/10 bg-base-200/80 shadow-xl backdrop-blur transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="card-body">
              <h3 className="card-title font-mono text-secondary">
                {project.name}
              </h3>
              <p className="text-sm text-base-content/80">{project.description}</p>
              {project.tech && project.tech.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="badge badge-ghost badge-sm font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              {(project.url || project.repo) && (
                <div className="card-actions mt-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-soft btn-accent btn-sm font-mono"
                    >
                      visit
                    </a>
                  )}
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm font-mono"
                    >
                      source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
