'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, RotateCcw, Minimize2, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const initialMessages: Message[] = [
    {
      id: '1',
      content: 'Velkommen til Tømrer og Snedkerfirmaet Carl Sørensen! Vi er et erfaret håndværksfirma, der specialiserer os i tømrer- og snedkerarbejde af høj kvalitet. Uanset om du har brug for renovering, nybygning, møbelarbejde eller andre træarbejder, står vi klar til at hjælpe.',
      role: 'assistant',
      timestamp: new Date()
    },
    {
      id: '2',
      content: 'Hvad kan jeg hjælpe dig med i dag?\n\n• Har du et konkret projekt, hvor du ønsker et tilbud?\n• Søger du inspiration eller råd til et kommende projekt?\n• Eller har du måske et generelt spørgsmål om vores ydelser?\n\nFortæl mig gerne lidt om, hvad du har i tankerne, så kan jeg guide dig i den rigtige retning.',
      role: 'assistant',
      timestamp: new Date()
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    // Only scroll within the chat container, not the entire page
    const chatContainer = messagesEndRef.current?.closest('.overflow-y-auto');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setInput('');
    setIsLoading(false);
    
    // Add a small delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setMessages([...initialMessages]);
    setIsRefreshing(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'Beklager, jeg kunne ikke behandle din besked.',
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error('Error calling API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Beklager, der opstod en fejl. Prøv venligst igen.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-2 group"
        >
          <MessageCircle className="h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-medium text-sm md:text-base">Chat med AI</span>
        </button>
      )}

          {/* Chat Window */}
          {isOpen && (
            <div className={`absolute bottom-0 right-0 w-[calc(100vw-1rem)] sm:w-[calc(100vw-4rem)] md:w-[calc(100vw-6rem)] lg:w-[calc(100vw-8rem)] xl:w-[calc(100vw-12rem)] 2xl:w-[calc(100vw-16rem)] bg-white rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-500 ease-in-out chat-container ${
              isMinimized ? 'h-16' : 'h-[calc(100vh-0.5rem)] sm:h-[calc(100vh-2rem)]'
            }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 md:p-6 rounded-t-2xl flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="w-6 h-6 md:w-7 md:h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm md:text-base lg:text-lg truncate">Tømrer & Snedkerfirmaet</h3>
                <p className="text-blue-100 text-xs md:text-sm">Carl Sørensen</p>
                <p className="text-blue-200 text-xs md:text-sm">Hvordan kan jeg hjælpe dig?</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 md:p-3 hover:bg-blue-800 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Genstart chat"
              >
                <RotateCcw className={`h-4 w-4 md:h-5 md:w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button 
                onClick={handleMinimize}
                className="p-2 md:p-3 hover:bg-blue-800 rounded-lg transition-all duration-200 hover:scale-110"
                title={isMinimized ? "Udvid chat" : "Minimer chat"}
              >
                {isMinimized ? <ChevronDown className="h-4 w-4 md:h-5 md:w-5" /> : <Minimize2 className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
              <button
                onClick={handleClose}
                className="p-2 md:p-3 hover:bg-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                title="Luk chat"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>

          {/* Messages - Only show when not minimized */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[70%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <div 
                        className="text-sm md:text-base leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br>')
                        }}
                      />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="bg-white text-gray-800 px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-sm border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm md:text-base text-gray-600">AI skriver...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 md:p-6 border-t border-gray-200 bg-white">
                <form onSubmit={handleSubmit} className="flex space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Skriv din besked..."
                    className="flex-1 px-4 md:px-6 py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 hover:border-blue-300 text-sm md:text-base"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="p-3 md:p-4 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-110"
                    title="Stemmeindtastning"
                  >
                    <Mic className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 md:p-4 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 shadow-lg"
                    title="Send besked"
                  >
                    <Send className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
