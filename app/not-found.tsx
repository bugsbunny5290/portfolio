import { Button, Section } from "@/components/ui";

export default function NotFound(): React.ReactElement {
  return (
    <Section className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
      <p className="mt-2 text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button href="/" className="mt-8">
        Go Home
      </Button>
    </Section>
  );
}
