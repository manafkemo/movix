import { Clock, MapPin, Zap, MessageCircle } from "lucide-react"

const icons = [Clock, MapPin, Zap, MessageCircle]

export default function Features({ dict }: { dict: any }) {
    return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        {dict.features.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-muted-foreground">
                        {dict.features.subtitle}
                    </p>
                </div>
                <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {dict.features.items.map((feature: any, index: number) => {
                        const Icon = icons[index]
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-colors"
                            >
                                <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary`}>
                                    <Icon className="h-8 w-8" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
