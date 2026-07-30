import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import type { Statistic } from "@/lib/types";

export function QuickStats({ stats }: { stats: Statistic[] }) {
  if (stats.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat._id} className="text-center" hoverLift={false}>
              <div className="font-display text-3xl font-bold text-coral sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-ink-soft">{stat.label}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
