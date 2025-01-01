import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Message, User } from '../types';
import { db } from '../lib/firebase';

 const useChat = (currentUser: User | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const TYPING_TIMEOUT = 3000; // 3 seconds

  useEffect(() => {
    // Subscribe to last 100 messages
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Message))
        .reverse();
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleTyping = async () => {
    if (!currentUser) return;

    // Clear existing timeout
    if (currentUser.typingTimeout) {
      clearTimeout(currentUser.typingTimeout);
    }

    // Set user as typing
    await updateDoc(doc(db, 'users', currentUser.id), {
      isTyping: true
    });

    // Set timeout to clear typing status
    const timeout = setTimeout(async () => {
      await updateDoc(doc(db, 'users', currentUser.id), {
        isTyping: false
      });
    }, TYPING_TIMEOUT);

    // Update user's typing timeout
    currentUser.typingTimeout = timeout;
  };

  const sendMessage = async (content: string, user: User) => {
    if (!user) return;

    const newMessage = {
      userId: user.id,
      userName: user.name,
      content,
      timestamp: Date.now(),
    };

    // Clear typing indicator when sending message
    await updateDoc(doc(db, 'users', user.id), {
      isTyping: false
    });

    if (user.typingTimeout) {
      clearTimeout(user.typingTimeout);
    }

    await addDoc(collection(db, 'messages'), newMessage);
  };

  return { messages, sendMessage, handleTyping };
};

export default useChat;