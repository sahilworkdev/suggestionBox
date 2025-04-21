import { features } from "@/constants/features";
import { ShineBorder } from "../magicui/shine-border";

export default function FeaturesSection() {
  return (
    <section
    id="features"
    className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24 mx-auto px-4 sm:px-0"
  >
    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
      <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
        Features
      </h2>
      <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Everything you need to collect anonymous suggestions with ease and privacy.
      </p>
    </div>
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border bg-background p-6"
          >
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-bold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
  );
}
