import { MousePointerClick, PackageCheck, Send } from "lucide-react"

const icons = [MousePointerClick, PackageCheck, Send]

export default function HowItWorks({ dict }: { dict: any }) {
    return (
        <section id="how-it-works" className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                        {dict.howItWorks.title}
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                        {dict.howItWorks.subtitle}
                    </p>
                </div>
                <div className="grid gap-12 md:grid-cols-3">
                    {dict.howItWorks.steps.map((step: any, index: number) => {
                        const Icon = icons[index]
                        return (
                            <div key={index} className="relative flex flex-col items-center text-center">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-background border border-border shadow-sm">
                                    <Icon className="h-10 w-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed max-w-xs">
                                    {step.description}
                                </p>

                                {/* Connector Line (Desktop only, except last item) */}
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-10 rtl:left-auto rtl:right-[60%] rtl:rotate-180 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
