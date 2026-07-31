import { cx } from "@/lib/utils";

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cx("animate-pulse rounded-2xl bg-decoration/60", className)} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cx("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-full bg-decoration/60"
          style={{ width: `${100 - index * 12}%` }}
        />
      ))}
    </div>
  );
}

export function SkeletonCardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-border-soft bg-surface p-6">
          <SkeletonBlock className="mb-4 h-40 w-full" />
          <SkeletonText lines={2} />
        </div>
      ))}
    </div>
  );
}
