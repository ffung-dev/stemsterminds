import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function VolunteerCTA({
  heading,
  body,
  buttonText,
  buttonLink,
}: {
  heading: string;
  body: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <section className="brand-gradient py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">{body}</p>
        <div className="mt-8">
          <Button href={buttonLink} size="lg">
            {buttonText}
          </Button>
        </div>
      </Container>
    </section>
  );
}
