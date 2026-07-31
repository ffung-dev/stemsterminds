import { cx } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cx(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-coral">{eyebrow}</p>
      )}
      <h2 className="font-header text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-lg text-ink-soft">{description}</p>}
    </div>
  );
}
