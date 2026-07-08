import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="glow-blob left-1/4 top-1/4 h-80 w-80 bg-brand-cyan/40" aria-hidden />
      <div className="glow-blob bottom-1/4 right-1/4 h-80 w-80 bg-brand-purple/40" aria-hidden />
      <div className="relative px-6 text-center">
        <p className="font-display text-8xl font-bold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
          This page drifted off the network
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
