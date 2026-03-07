import React, { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Search, Phone, Video, MoreVertical } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_CONVERSATIONS = [
	{
		id: 1,
		name: 'Elena Rostova',
		avatar: 'https://i.pravatar.cc/150?img=47',
		online: true,
		unread: 2,
		messages: [
			{ id: 101, text: 'Hey! Are we still on for the design review later?', sender: 'them', timestamp: '10:30 AM' },
			{ id: 102, text: 'Yes, absolutely. I just finished the wireframes.', sender: 'me', timestamp: '10:32 AM' },
			{ id: 103, text: 'Perfect! I want to look closely at the mobile navigation.', sender: 'them', timestamp: '10:35 AM' },
			{ id: 104, text: 'I made some bold choices there. You will love it.', sender: 'me', timestamp: '10:38 AM' },
			{ id: 105, text: 'Can\'t wait! See you at 2 PM.', sender: 'them', timestamp: '10:40 AM' },
		]
	},
	{
		id: 2,
		name: 'Marcus Chen',
		avatar: 'https://i.pravatar.cc/150?img=11',
		online: false,
		unread: 0,
		messages: [
			{ id: 201, text: 'Did you get the API keys I sent?', sender: 'them', timestamp: 'Yesterday' },
			{ id: 202, text: 'Got them. Testing the endpoints now.', sender: 'me', timestamp: 'Yesterday' },
			{ id: 203, text: 'Let me know if you hit any rate limits.', sender: 'them', timestamp: 'Yesterday' },
		]
	},
	{
		id: 3,
		name: 'Sarah Jenkins',
		avatar: 'https://i.pravatar.cc/150?img=5',
		online: true,
		unread: 1,
		messages: [
			{ id: 301, text: 'The new color palette is gorgeous! 😍', sender: 'them', timestamp: '9:15 AM' },
		]
	},
	{
		id: 4,
		name: 'Product Team',
		avatar: 'https://i.pravatar.cc/150?img=24',
		online: true,
		unread: 0,
		messages: [
			{ id: 401, text: 'We need to push the release to Thursday.', sender: 'them', timestamp: 'Mon' },
			{ id: 402, text: 'That gives us time for more QA. Good call.', sender: 'me', timestamp: 'Mon' },
		]
	},
	{
		id: 5,
		name: 'David Okafor',
		avatar: 'https://i.pravatar.cc/150?img=33',
		online: false,
		unread: 0,
		messages: [
			{ id: 501, text: 'Coffee tomorrow morning?', sender: 'them', timestamp: 'Sun' },
			{ id: 502, text: 'You know it. Usual place?', sender: 'me', timestamp: 'Sun' },
			{ id: 503, text: 'Yep, 8:30.', sender: 'them', timestamp: 'Sun' },
		]
	},
];

const ChatsView = () => {
	const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
	const [selectedChatId, setSelectedChatId] = useState<number>(INITIAL_CONVERSATIONS[0].id);
	const [message, setMessage] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const filteredConversations = useMemo(() => {
		return conversations.filter(c => 
			c.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [conversations, searchQuery]);

	const selectedChat = useMemo(() => {
		return conversations.find(c => c.id === selectedChatId) || conversations[0];
	}, [conversations, selectedChatId]);

	const totalUnread = useMemo(() => {
		return conversations.reduce((acc, curr) => acc + curr.unread, 0);
	}, [conversations]);

	const handleSendMessage = (e?: React.FormEvent) => {
		e?.preventDefault();
		if (!message.trim()) return;

		setConversations(prev => prev.map(conv => {
			if (conv.id === selectedChatId) {
				return {
					...conv,
					messages: [
						...conv.messages,
						{
							id: Date.now(),
							text: message,
							sender: 'me',
							timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
						}
					]
				};
			}
			return conv;
		}));
		setMessage('');
	};

	const handleSelectChat = (id: number) => {
		setSelectedChatId(id);
		setConversations(prev => prev.map(conv => 
			conv.id === id ? { ...conv, unread: 0 } : conv
		));
	};

	return (
		<div className="flex h-[calc(100vh-120px)] overflow-hidden bg-background rounded-3xl border shadow-sm">
			
			{/* LEFT PANEL: Conversation List */}
			<div className="w-full md:w-80 lg:w-96 flex flex-col border-r bg-card/50 backdrop-blur-sm">
				<div className="p-4 border-b space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-inner">
								<MessageCircle size={20} />
							</div>
							<h2 className="text-xl font-bold tracking-tight">Chats</h2>
						</div>
						{totalUnread > 0 && (
							<Badge variant="default" className="rounded-full px-2 py-0.5 shadow-sm">
								{totalUnread} new
							</Badge>
						)}
					</div>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input 
							placeholder="Search messages..." 
							className="pl-9 bg-background/50 border-none shadow-inner rounded-2xl"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
					{filteredConversations.length === 0 ? (
						<div className="p-4 text-center text-muted-foreground text-sm">
							No conversations found.
						</div>
					) : (
						filteredConversations.map(chat => {
							const lastMessage = chat.messages[chat.messages.length - 1];
							const isSelected = chat.id === selectedChatId;

							return (
								<button
									key={chat.id}
									onClick={() => handleSelectChat(chat.id)}
									className={`w-full text-left p-3 rounded-2xl transition-all duration-200 flex items-center gap-3 relative overflow-hidden group ${
										isSelected 
											? 'bg-primary/10 shadow-sm' 
											: 'hover:bg-muted/50 transparent'
									}`}
								>
									{isSelected && (
										<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
									)}
									
									<div className="relative">
										<Avatar className="h-12 w-12 border-2 border-background shadow-sm transition-transform group-hover:scale-105">
											<AvatarImage src={chat.avatar} alt={chat.name} />
											<AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
										</Avatar>
										{chat.online && (
											<div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-background shadow-sm" />
										)}
									</div>
									
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-0.5">
											<span className={`font-semibold truncate ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>
												{chat.name}
											</span>
											<span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
												{lastMessage?.timestamp}
											</span>
										</div>
										<div className="flex items-center justify-between gap-2">
											<p className="text-sm text-muted-foreground truncate flex-1">
												{lastMessage?.sender === 'me' && <span className="text-xs opacity-70 mr-1">You:</span>}
												{lastMessage?.text}
											</p>
											{chat.unread > 0 && (
												<Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center rounded-full shadow-sm shrink-0">
													{chat.unread}
												</Badge>
											)}
										</div>
									</div>
								</button>
							);
						})
					)}
				</div>
			</div>

			{/* RIGHT PANEL: Chat Area */}
			<div className="hidden md:flex flex-1 flex-col bg-background/50 relative">
				{/* Decorative Background Blob */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

				{/* Header */}
				<div className="h-[72px] px-6 border-b flex items-center justify-between bg-card/30 backdrop-blur-md z-10 sticky top-0">
					<div className="flex items-center gap-4">
						<Avatar className="h-10 w-10 shadow-sm border border-border/50">
							<AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
							<AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="font-bold text-foreground leading-tight">{selectedChat.name}</h3>
							<p className="text-xs text-muted-foreground flex items-center gap-1">
								{selectedChat.online ? (
									<><span className="h-2 w-2 rounded-full bg-green-500 inline-block" /> Active now</>
								) : (
									<><span className="h-2 w-2 rounded-full bg-muted-foreground inline-block" /> Offline</>
								)}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
							<Phone size={18} />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
							<Video size={18} />
						</Button>
						<Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
							<MoreVertical size={18} />
						</Button>
					</div>
				</div>

				{/* Messages Area */}
				<div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 custom-scrollbar">
					{selectedChat.messages.map((msg, idx) => {
						const isMe = msg.sender === 'me';
						const showAvatar = !isMe && (idx === 0 || selectedChat.messages[idx - 1].sender === 'me');

						return (
							<div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
								<div className={`flex items-end gap-2 max-w-[75%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
									{!isMe && (
										<div className="w-8 shrink-0">
											{showAvatar && (
												<Avatar className="h-8 w-8 shadow-sm">
													<AvatarImage src={selectedChat.avatar} />
													<AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
												</Avatar>
											)}
										</div>
									)}
									
									<div 
										className={`px-5 py-3 shadow-sm text-sm ${
											isMe 
												? 'bg-primary text-primary-foreground rounded-2xl rounded-br-sm bg-gradient-to-br from-primary to-primary/80' 
												: 'bg-card border text-card-foreground rounded-2xl rounded-bl-sm'
										}`}
									>
										{msg.text}
									</div>
								</div>
								<span className={`text-[10px] text-muted-foreground mt-1.5 ${isMe ? 'mr-2' : 'ml-12'}`}>
									{msg.timestamp}
								</span>
							</div>
						);
					})}
				</div>

				{/* Input Area */}
				<div className="p-4 border-t bg-card/30 backdrop-blur-md z-10">
					<form onSubmit={handleSendMessage} className="flex items-end gap-2 max-w-4xl mx-auto">
						<div className="flex-1 bg-background rounded-3xl border shadow-inner p-1 pl-4 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
							<Input 
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Type your message..." 
								className="border-0 shadow-none focus-visible:ring-0 bg-transparent px-0 h-10"
							/>
							<Button 
								type="submit" 
								size="icon" 
								disabled={!message.trim()}
								className="rounded-full shrink-0 h-10 w-10 shadow-sm transition-transform hover:scale-105 active:scale-95"
							>
								<Send size={18} className="ml-0.5" />
							</Button>
						</div>
					</form>
				</div>
			</div>
			
			{/* Style overrides for scrollbar inside component for simplicity without global css changes */}
			<style dangerouslySetInnerHTML={{__html: `
				.custom-scrollbar::-webkit-scrollbar {
					width: 6px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: transparent;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background-color: rgba(156, 163, 175, 0.3);
					border-radius: 20px;
				}
				.custom-scrollbar:hover::-webkit-scrollbar-thumb {
					background-color: rgba(156, 163, 175, 0.5);
				}
			`}} />
		</div>
	);
};

export default ChatsView;
