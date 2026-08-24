"use client";

import { site } from "@/lib/config";

export default function BlogView() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300">
      <div className="card w-full max-w-4xl border border-base-content/15 bg-base-200/95 shadow-2xl backdrop-blur-xl">
        <div className="card-body p-5 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-base-content/10 pb-4">
            <h1 className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              /blog
            </h1>
            <a
              href="#home"
              className="btn btn-soft btn-secondary btn-sm font-mono text-xs cursor-pointer"
            >
              ← Back
            </a>
          </div>

          {/* Posts List */}
          <div className="mt-6 flex flex-col gap-4">
            {site.blog.posts.map((post, idx) => (
              <div
                key={idx}
                className="card border border-base-content/10 bg-base-300/70 p-5 transition-all duration-300 hover:border-primary/40 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-mono text-base sm:text-lg font-bold text-primary">
                      {post.title}
                    </h3>
                    <span className="font-mono text-xs text-base-content/50">
                      {post.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-base-content/80 font-sans leading-relaxed">
                    {post.summary}
                  </p>
                </div>
                {Boolean(post.url) && (
                  <div className="mt-4 pt-3 border-t border-base-content/10 flex justify-end">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-soft btn-accent btn-xs font-mono cursor-pointer"
                    >
                      visit ↗
                    </a>
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
