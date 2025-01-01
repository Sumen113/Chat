export interface User {
  id: string;
  name: string;
  isOnline: boolean;
  lastOnline: number;
  userAgent: string;
  isTyping?: boolean;
  typingTimeout?: NodeJS.Timeout;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
}
