import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="brand-gradient flex flex-1 items-center py-24">
      <Container className="text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-button">
          <Rocket className="h-9 w-9 text-ink" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-title text-5xl font-bold text-ink">404</h1>
        <p className="mt-3 text-xl font-semibold text-ink">Looks like this page drifted off course.</p>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg">
            Back to Home
          </Button>
          <Button href="/events" variant="secondary" size="lg">
            Browse Events
          </Button>
        </div>
      </Container>
    </section>
  );
}
