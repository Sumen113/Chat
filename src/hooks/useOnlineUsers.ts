import { useState, useEffect } from "react";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { User } from "../types";
import { db } from "../lib/firebase";


 const useOnlineUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      orderBy('lastOnline', 'desc'),
      limit(25)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as User);
      setUsers(updatedUsers);
    });

    return () => unsubscribe();
  }, []);

  return { users };
};

export default useOnlineUsers;
