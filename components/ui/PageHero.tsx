import { Container } from "./Container";

export function PageHero({ title, description }: { title: string; description?: string }) {
  return (
    <section className="brand-gradient py-16 sm:py-20">
      <Container className="text-center">
        <h1 className="font-title text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">{description}</p>}
      </Container>
    </section>
  );
}
