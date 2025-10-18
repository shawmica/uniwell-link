import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, Paperclip, Phone, Video } from 'lucide-react';

const mockChats = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'Thanks for the study session!',
    time: '2m ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Mike Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    lastMessage: 'See you tomorrow at 10 AM',
    time: '1h ago',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Study Group - CS301',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Group',
    lastMessage: 'Emily: Anyone wants to join the study session?',
    time: '3h ago',
    unread: 5,
    online: true,
  },
];

const mockMessages = [
  { id: '1', sender: 'them', text: 'Hi! Are you free for a study session today?', time: '10:30 AM' },
  { id: '2', sender: 'me', text: 'Yes! What time works for you?', time: '10:32 AM' },
  { id: '3', sender: 'them', text: 'How about 3 PM at the library?', time: '10:35 AM' },
  { id: '4', sender: 'me', text: 'Perfect! See you there.', time: '10:36 AM' },
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      // Send message logic here
      setMessage('');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">Chat with your peers and study partners</p>
      </div>

      <div className="grid h-[600px] overflow-hidden rounded-lg border border-border lg:grid-cols-3">
        {/* Chat List */}
        <div className="border-r border-border bg-card">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(600px-73px)]">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full border-b border-border p-4 text-left transition-colors hover:bg-muted ${
                  selectedChat.id === chat.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-success"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold truncate">{chat.name}</p>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-white">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedChat.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedChat.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.sender === 'me'
                        ? 'bg-secondary text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground px-2">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-border bg-card p-4">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
