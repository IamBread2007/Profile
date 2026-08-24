import { site } from "@/lib/config";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto w-full max-w-3xl scroll-mt-8 px-4 py-24"
    >
      <h2 className="mb-6 font-mono text-3xl text-primary">
        {site.about.heading}
      </h2>
      <div className="card border border-base-content/10 bg-base-200/80 shadow-xl backdrop-blur">
        <div className="card-body gap-4">
          {site.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="mt-2 flex flex-wrap gap-2">
            {site.about.skills.map((skill) => (
              <span key={skill} className="badge badge-outline badge-accent font-mono">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
