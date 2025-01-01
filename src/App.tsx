import Dashboard from './components/dashboard';
import Welcome from './components/welcome';
import useAuth from './hooks/useAuth';
import useChat from './hooks/useChat';
import useOnlineUsers from './hooks/useOnlineUsers';

function App() {
    const { initializeUser, user, isLoading } = useAuth();
    const { messages, sendMessage } = useChat(user);
    const { users } = useOnlineUsers();

    if (!user) return <Welcome onSubmit={initializeUser} isLoading={isLoading} />;

    return <Dashboard />

  
    // return (
    //     <div>
    //         <h1>Chat</h1>
    //         <div>
    //             {messages.map(message => (
    //                 <div key={message.id}>
    //                     <strong>{message.userName}</strong>: {message.content}
    //                 </div>
    //             ))}
    //         </div>
    //         <form
    //             onSubmit={e => {
    //                 e.preventDefault();
    //                 const content = (e.target as any).content.value;
    //                 sendMessage(content, user);
    //                 (e.target as any).content.value = '';
    //             }}
    //         >
    //             <input type="text" name="content" id="content" />
    //             <button>Send</button>
    //         </form>
    //         <h2>Online Users {users.length} </h2>
    //         <ul>
    //             {users.map(user => (
    //                 <li key={user.id}>
    //                     {user.name} [{user.isOnline ? 'online' : 'offline'}]
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
}

export default App;
