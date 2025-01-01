import React from 'react';
import { Input } from './ui/input';
import { RainbowButton } from './ui/rainbow-button';

type Props = {};

const Welcome = (props: Props) => {
    return (
        <div className="min-h-screen">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,120,120,0.3),rgba(255,255,255,0))]"></div>

            <div className="max-w-screen-xl mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
                <div className="-translate-y-[15%]">
                    <h1 className="text-6xl leading-[1.1] font-semibold text-center">
                        Collection of modern,
                        <br /> background snippets
                    </h1>
                    <p className="text-muted-foreground mt-10 max-w-screen-md mx-auto text-center text-2xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident hic soluta laudantium
                        repellat at rerum ad fugit
                    </p>

                    <div>
                        <form className="mt-20 space-y-8" onSubmit={e => e.preventDefault()}>
                            {/* <input
                                type="name"
                                name="name"
                                id="name"
                                className="w-full border border-neutral-700 rounded-md p-2"
                                placeholder="Enter your name"
                            /> */}

                            {/* <Input /> */}
                            <input
                                type="name"
                                name="name"
                                id="name"
                                className="w-full max-w-md mx-auto bg-muted/50 block border border-neutral-600 rounded-md p-2.5 md:text-lg"
                                placeholder="Enter your name"
                            />

                            {/* <button className="mt-4 bg-primary-500 text-white rounded-md p-2 w-full">Login</button> */}
                            <RainbowButton className='block mx-auto'>Join the Chat</RainbowButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
