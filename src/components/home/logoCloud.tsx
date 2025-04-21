import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"
import { logos } from "@/constants/logos"

export default function LogoCloud() {
  return (
    <section className="bg-background overflow-hidden py-8 sm:py-12 md:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-4 sm:gap-6">
          <div className="w-full md:max-w-36 lg:max-w-44 md:border-r md:pr-4 lg:pr-6 text-center md:text-right mb-4 md:mb-0">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Powering the best teams</p>
          </div>
          <div className="relative w-full md:w-[calc(100%-9rem)] lg:w-[calc(100%-11rem)] py-3 sm:py-4 md:py-6">
            <InfiniteSlider speedOnHover={20} speed={40} gap={64} className="py-2">
              {logos.map((logo, index) => (
                <div key={index} className="flex items-center px-2 sm:px-4">
                  <img
                    className="h-auto max-h-5 sm:max-h-6 md:max-h-7 w-auto dark:invert object-contain"
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    style={{
                      height: `min(${logo.height}px, 28px)`,
                      maxWidth: "120px",
                    }}
                  />
                </div>
              ))}
            </InfiniteSlider>

            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-background" />
            <div className="absolute inset-y-0 right-0 w-12 sm:w-16 md:w-20 bg-gradient-to-l from-background" />

            {/* Progressive blur effects */}
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-16 md:w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-16 md:w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
