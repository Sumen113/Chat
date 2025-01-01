import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useChat from '../hooks/useChat';
import { User } from '../types';
import { Card, CardHeader, CardTitle } from './ui/card';

type Props = {};

const MainWindow = (props: Props) => {
    const { user } = useAuth();
    const { messages, sendMessage } = useChat(user);

    return (
        <div className="w-full border-r h-screen overflow-y-auto flex flex-col">
            <div className="p-4 py-3 border-b border-border bg-card">
                <h2 className="text-lg font-semibold text-center">Chat World</h2>
            </div>

            <ScrollArea className="flex-1 p-4 ">
                <div className="grid gap-3 max-w-screen-md mx-auto mb-20">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className="bg-card py-2.5 p-3 rounded-lg border border-border/90 min-w-[30%] max-w-[80%] w-fit"
                        >
                            <h4 className="mb-1 text-muted-foreground text-sm capitalize">{message.userName}</h4>

                            <p className="text-foreground/80 ">{message.content}</p>

                            <p className="text-muted-foreground text-xs text-right mt-0.5">
                                {new Date(message.timestamp).toLocaleString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                            </p>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-border bg-card">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        const content = (e.target as any).message.value;
                        sendMessage(content, user as User);
                        (e.target as any).message.value = '';
                    }}
                    className="flex gap-2  max-w-screen-md mx-auto"
                >
                    <Textarea
                        name="message"
                        rows={3}
                        placeholder="Write your message here..."
                        className="min-h-[50px] bg-background"
                    />
                    <Button size="icon" className="shrink-0">
                        <Send className="size-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default MainWindow;
