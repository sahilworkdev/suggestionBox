import { AnimatedShinyText } from "../magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import CallToActionBtn from "../buttons/callToActionBtn";

export default function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-8 md:pb-12 md:pt-10 lg:py-32 px-4 sm:px-0">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          {" "}
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Introducing Suggestion Box</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Speak Freely. Suggest Anonymously.
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Collect honest feedback from your team or audience with zero pressure.
          No accounts, no tracking—just a private, secure way to receive genuine
          suggestions through unique shareable links.
        </p>
        <div className="space-x-4">
          <CallToActionBtn />
        </div>
      </div>
    </section>
  );
}
