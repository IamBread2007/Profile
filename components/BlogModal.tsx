"use client";

import { site } from "@/lib/config";
import SectionModal from "@/components/SectionModal";

type BlogModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BlogModal({ isOpen, onClose }: BlogModalProps) {
  return (
    <SectionModal isOpen={isOpen} onClose={onClose} title="/blog" maxWidth="max-w-3xl">
      <div className="flex flex-col gap-4">
        {site.blog.posts.map((post, index) => (
          <div
            key={index}
            className="card border border-base-content/10 bg-base-300/40 p-4 transition-colors hover:border-accent/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-mono text-base font-bold text-accent">
                  {post.title}
                </h3>
                <span className="text-xs text-base-content/50 font-mono shrink-0">
                  {post.date}
                </span>
              </div>
              <p className="mt-2 text-sm text-base-content/80 font-sans">
                {post.summary}
              </p>
            </div>
            {post.url && post.url !== "#" && (
              <div className="mt-3 pt-2 border-t border-base-content/10 flex justify-end">
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
    </SectionModal>
  );
}
