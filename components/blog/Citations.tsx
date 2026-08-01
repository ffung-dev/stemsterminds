export function Citations({ citations }: { citations: string[] }) {
  if (citations.length === 0) return null;

  return (
    <section className="mt-10 rounded-2xl border border-border-soft bg-surface-soft p-6">
      <h2 className="font-header text-lg font-bold text-ink">Sources</h2>
      <div className="mt-4 space-y-3">
        {citations.map((citation, index) => (
          <p key={index} className="text-sm leading-relaxed text-ink-soft">
            {citation}
          </p>
        ))}
      </div>
    </section>
  );
}
