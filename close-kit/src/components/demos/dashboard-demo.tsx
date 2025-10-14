import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function DashboardDemo() {
    const image = PlaceHolderImages.find((img) => img.id === 'demo-dashboard');
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Your Command Center</CardTitle>
                <CardDescription>Get a bird's-eye view of your business with key metrics like total revenue, acceptance rate, and recent proposal activity, all in one place.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video overflow-hidden rounded-lg border">
                    {image && (
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
