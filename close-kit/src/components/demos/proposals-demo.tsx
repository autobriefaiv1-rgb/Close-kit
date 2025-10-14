import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function ProposalsDemo() {
    const image = PlaceHolderImages.find((img) => img.id === 'demo-proposals');
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Streamlined Proposal Management</CardTitle>
                <CardDescription>Create, send, and track all your proposals from a single, intuitive interface. Filter by status to stay on top of your sales pipeline.</CardDescription>
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
