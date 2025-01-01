import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { User } from '../types';
import { db } from '../lib/firebase';

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUserId = Cookies.get('userId');
        const savedName = Cookies.get('userName');
        if (savedUserId && savedName) checkExistingUser(savedUserId, savedName);
    }, []);

    const getUserAgent = () =>  window.navigator.userAgent;

    const checkExistingUser = async (savedUserId: string, name: string) => {
        const userAgent = getUserAgent();
        // const userRef = doc(db, 'users', savedUserId);

        const userSnap = await getDocs(
            query(collection(db, 'users'), where('name', '==', name), where('userAgent', '==', userAgent))
        );

        if (!userSnap.empty) {
            const existingUser = userSnap.docs[0].data() as User;
            await updateDoc(doc(db, 'users', existingUser.id), {
                isOnline: true,
                lastOnline: Date.now(),
            });
            setUser(existingUser);
            return existingUser;
        }

        return null;
    };

    const initializeUser = async (name: string) => {
        const userAgent = getUserAgent();

        // Check if user exists with same name and userAgent
        const existingUser = await checkExistingUser('', name);
        if (existingUser) {
            Cookies.set('userId', existingUser.id, { expires: 7 });
            Cookies.set('userName', name, { expires: 7 });
            return existingUser;
        }

        // Create new user if no existing user found
        const userId = crypto.randomUUID();
        const newUser: User = {
            id: userId,
            name,
            isOnline: true,
            lastOnline: Date.now(),
            userAgent,
            isTyping: false,
        };

        await setDoc(doc(db, 'users', userId), newUser);
        Cookies.set('userId', userId, { expires: 7 });
        Cookies.set('userName', name, { expires: 7 });
        setUser(newUser);

        // Update online status when user closes/refreshes the page
        window.addEventListener('beforeunload', () => {
            updateDoc(doc(db, 'users', userId), {
                isOnline: false,
                lastOnline: Date.now(),
                isTyping: false,
            });
        });

        return newUser;
    };

    return { user, initializeUser };
};

export default useAuth;
