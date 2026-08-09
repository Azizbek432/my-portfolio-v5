"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-[#0a0a0c]">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-full mx-auto"></div>
        <div className="h-8 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
      </div>
    </div>
  );
}