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
          title="Our Leaders"
          description="Meet the executives of STEMsterMinds!"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {team.map((member, index) => (
            <Card key={member._id} className="w-full sm:w-64">
              <RoundedImage image={member.photo} alt={member.name} seed={index} className="aspect-square w-full" />
              <h3 className="mt-4 font-header text-lg font-bold text-ink">{member.name}</h3>
              <p className="text-sm font-semibold text-coral">{member.role}</p>
              <p className="mt-2 text-sm text-ink-soft">{member.bio}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
