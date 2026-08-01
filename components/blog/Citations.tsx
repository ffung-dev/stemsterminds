export function Citations({ citations }: { citations: string[] }) {
  if (citations.length === 0) return null;

  return (
    <section className="mt-10 rounded-2xl border border-border-soft bg-surface-soft p-6">
      <h2 className="font-header text-lg font-bold text-ink">Sources</h2>
      <ol className="mt-4 space-y-3">
        {citations.map((citation, index) => (
          <li key={index} className="flex gap-3 text-sm text-ink-soft">
            <span className="shrink-0 font-semibold text-coral">[{index + 1}]</span>
            <span className="leading-relaxed">{citation}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
