import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { RainbowButton } from './ui/rainbow-button';

type Props = {
    isLoading: boolean;
    onSubmit: (name: string) => void;
};

const Welcome = ({ onSubmit, isLoading }: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        const name = (e.target as any).name.value;

        onSubmit(name);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                <div>
                    <h1 className="text-4xl leading-[1.1] font-semibold text-center">
                        Collection of modern, background snippets
                    </h1>
                    <p className="text-muted-foreground mt-6 max-w-screen-sm mx-auto text-center text-xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident hic soluta laudantium
                        repellat at rerum ad fugit
                    </p>

                    {isLoading ? (
                        <div className="mt-10 h-40 flex items-center justify-center">
                            <Loader2 className="size-14 animate-spin " />
                        </div>
                    ) : (
                        <form className="mt-20" onSubmit={handleSubmit}>
                            <Card className="max-w-lg m-auto">
                                <CardHeader>
                                    <CardTitle>Join the Chat</CardTitle>
                                    <CardDescription>Enter your name to join the chat</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Input name="name" placeholder="Enter your name" className="bg-muted/50" />
                                </CardContent>
                                <CardFooter>
                                    <Button className="ml-auto">
                                        Join the Chat <ArrowRight />{' '}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
