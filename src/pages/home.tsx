import { ArrowRight, Loader2 } from 'lucide-react';
import ShineBorder from '../components/ui/shine-border';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import AnimatedGridPattern from '../components/ui/animated-grid-pattern';
import { useAuthContext } from '../context/auth-context';

type Props = {};

const Home = ({}: Props) => {
    const { initializeUser, isInitializing } = useAuthContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        const name = (e.target as any).name.value;
        initializeUser(name);
    };

    const LoginCard = () => (
        <ShineBorder
            className="mt-14 md:mt-24 backdrop-blur bg-card/50 relative w-full max-w-xl mx-auto"
            color={['#3b82f6', '#a855f7', '#f43f5e']}
            borderWidth={2}
            borderRadius={24}
        >
            <form onSubmit={handleSubmit} className="w-full">
                <CardHeader>
                    <CardTitle>Join the Chat</CardTitle>
                    <CardDescription>Enter a username</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        name="name"
                        placeholder="username"
                        className="bg-muted/50"
                        minLength={2}
                        maxLength={30}
                        autoComplete="name"
                        required
                    />
                </CardContent>
                <CardFooter>
                    <Button className="ml-auto">
                        Join<ArrowRight />{' '}
                    </Button>
                </CardFooter>
            </form>
        </ShineBorder>
    );

    return (
        <div className="min-h-dvh relative">
            <AnimatedGridPattern
                width={35}
                height={35}
                maxOpacity={0.2}
                className={'[mask-image:linear-gradient(to_top,#fff9,transparent)]'}
            />
            <div className="max-w-screen-xl mx-auto px-3 py-8 min-h-dvh flex items-center justify-center">
                <div className="-translate-y-3 md:-translate-y-6">
                    <div
                        className={
                            'group relative z-10 w-fit mx-auto rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800'
                        }
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                    </div>

                    <h1 className="text-3xl md:text-5xl mt-6 leading-[1.1] font-bold text-center" data-aos="fade-up" data-aos-delay="300">
                        join <span className="text-gradient">SumenSite Chat</span>
                    </h1>
                    <p
                        className="text-muted-foreground mt-2 md:mt-4 max-w-screen-sm mx-auto text-center md:text-xl"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        talk in class to do stuff
                    </p>

                    <div data-aos="fade-up" data-aos-delay="800">
                        {isInitializing ? (
                            <div className="mt-24 h-40 flex items-center justify-center">
                                <Loader2 className="size-14 animate-spin " />
                            </div>
                        ) : (
                            <LoginCard />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
