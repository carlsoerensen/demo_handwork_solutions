'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Calendar, Mail, CheckSquare, FileText, Clock, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function InternalAI() {
  const initialMessages: Message[] = [
    {
      id: '1',
      content: 'Hej Carl! Jeg er din interne AI-assistent til Tømrerfirmaet Carl Sørensen. Jeg har adgang til alle dine systemer - kalender, opgaveliste, e-mails, CRM og projektstyring. Jeg kan hjælpe dig med at administrere din daglige arbejdsgang, håndtere kundekommunikation og optimere din forretning.',
      role: 'assistant',
      timestamp: new Date()
    },
    {
      id: '2',
      content: '**Dine systemer er synkroniseret:**\n\n• **Kalender**: Google Calendar - 3 møder i dag\n• **Opgaveliste**: 5 aktive opgaver denne uge\n• **E-mails**: 12 nye beskeder venter\n• **Projekter**: 3 aktive projekter i gang\n• **Kunder**: 8 aktive kundeforhold\n\nJeg kan hjælpe dig med at:\n• Planlægge møder og besigtigelser\n• Håndtere opgaver og projekter\n• Skrive og sende e-mails\n• Dokumentere møder og noter\n• Følge op på kunder og projekter\n\nHvad skal vi arbejde med i dag?',
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

  const handleRefresh = () => {
    setMessages([...initialMessages]);
    setInput('');
    setIsLoading(false);
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
      const response = await fetch('/api/internal-ai', {
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

  const quickActions = [
    { icon: <Calendar className="w-4 h-4" />, label: "Kalender", action: "Vis min kalender for i dag - hvilke møder og besigtigelser har jeg?" },
    { icon: <CheckSquare className="w-4 h-4" />, label: "Opgaver", action: "Hvad er mine opgaver for i dag? Vis mig min opgaveliste" },
    { icon: <Mail className="w-4 h-4" />, label: "E-mails", action: "Skriv en e-mail til Familie Nielsen om deres køkkentilbud" },
    { icon: <FileText className="w-4 h-4" />, label: "Projekter", action: "Hvad er status på mine aktive projekter? Vis mig projektoversigt" },
    { icon: <Clock className="w-4 h-4" />, label: "Kunder", action: "Hvilke kunder skal jeg følge op med? Vis mig kundeliste" }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-2">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden chat-container">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Intern AI Agent</h2>
                <p className="text-blue-100 text-xs">Administrativ assistent</p>
              </div>
            </div>
            <button 
              onClick={handleRefresh}
              className="p-1.5 hover:bg-blue-800 rounded-lg transition-colors"
              title="Genstart chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex flex-col h-[450px]">
          {/* Quick Actions */}
          <div className="p-3 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-3">Hurtige handlinger:</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setInput(action.action)}
                  className="flex flex-col items-center space-y-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-sm font-medium"
                  title={action.action}
                >
                  <div className="text-blue-600">
                    {action.icon}
                  </div>
                  <span className="text-gray-700 text-xs text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-sm ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <div 
                    className="text-sm leading-relaxed prose prose-sm max-w-none"
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
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">AI skriver...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-gray-50">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv din besked..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                title="Send besked"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
