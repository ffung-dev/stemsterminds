import { Card } from "@/components/ui/Card";

export interface InfoCardItem {
  key: string;
  title: string;
  description: string;
}

export function InfoCardGrid({ items, columns = 3 }: { items: InfoCardItem[]; columns?: 2 | 3 }) {
  if (items.length === 0) return null;

  return (
    <div
      className={
        columns === 2
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2"
          : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {items.map((item) => (
        <Card key={item.key}>
          <h3 className="font-header text-lg font-bold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm text-ink-soft">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
