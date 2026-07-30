import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TeamMember } from "@/lib/types";

export function TeamGrid({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Our People"
          title="Meet the Team"
          description="The students and volunteers leading STEMsterMinds."
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Card key={member._id}>
              <RoundedImage image={member.photo} alt={member.name} seed={index} className="aspect-square w-full" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{member.name}</h3>
              <p className="text-sm font-semibold text-coral">{member.role}</p>
              <p className="mt-2 text-sm text-ink-soft">{member.bio}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
