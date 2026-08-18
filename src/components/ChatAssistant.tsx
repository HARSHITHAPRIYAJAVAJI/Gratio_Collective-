import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming Button component is available and styled

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control chat modal visibility
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Gratio Collective assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState(''); // State for the user's input message
  const [isTyping, setIsTyping] = useState(false); // State to show/hide typing indicator
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref to scroll to the bottom of messages

  // Effect to scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll the chat view to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Predefined responses for the bot to simulate conversation
  const predefinedResponses: { [key: string]: string } = {
    'hello': 'Hello! Welcome to Gratio Collective. How can I assist you today?',
    'help': 'I can help you with orders, returns, product information, account issues, and general inquiries. What do you need help with?',
    'order': 'For order-related questions, please provide your order number and I\'ll help you track your purchase or resolve any issues.',
    'return': 'Our return policy allows returns within 30 days of purchase. Items must be in original condition. Would you like me to start a return request?',
    'shipping': 'We offer free shipping on orders over $100. Standard shipping takes 3-5 business days, express shipping takes 1-2 business days.',
    'payment': 'We accept all major credit cards, PayPal, and Apple Pay. Your payment information is always secure with us.',
    'account': 'For account issues, I can help you with password resets, profile updates, or account deletion. What specifically do you need help with?',
    'size': 'For sizing information, please check our size guide on each product page. If you need personalized sizing advice, I can connect you with our styling team.',
    'authentic': 'All items on Gratio Collective are authenticated by our expert team. Each luxury item comes with a certificate of authenticity.',
    'contact': 'You can reach our customer service team at support@gratiocollective.com or call us at 1-800-GRATIO. We\'re available Monday-Friday 9AM-6PM EST.',
    'default': 'I understand your question. For complex inquiries, I\'ll connect you with our customer service team who can provide more detailed assistance.'
  };

  // Function to get a bot response based on user input keywords
  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    for (const keyword in predefinedResponses) {
      if (lowerMessage.includes(keyword)) {
        return predefinedResponses[keyword];
      }
    }
    return predefinedResponses['default'];
  };

  // Handles sending a message from the user
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return; // Prevent sending empty messages

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]); // Add user message to chat
    setInputMessage(''); // Clear input field
    setIsTyping(true); // Show typing indicator

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]); // Add bot response to chat
      setIsTyping(false); // Hide typing indicator
    }, 1500); // 1.5 seconds delay
  };

  // Handles key presses in the input field, specifically for 'Enter' to send messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in input
      handleSendMessage(); // Send message
    }
  };

  // Quick action buttons for common user queries
  const quickActions = [
    { text: 'Track my order', action: () => setInputMessage('I need help tracking my order') },
    { text: 'Return policy', action: () => setInputMessage('What is your return policy?') },
    { text: 'Shipping info', action: () => setInputMessage('Tell me about shipping') },
    { text: 'Contact support', action: () => setInputMessage('How can I contact customer service?') }
  ];

  return (
    <>
      {/* Floating Chat Button - Visible when chat modal is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-all duration-300 z-50 group"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-6 w-6" />
          {/* New message indicator badge */}
          <span className="absolute -top-2 -left-2 bg-rose-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            !
          </span>
          {/* Tooltip for the chat button */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-slate-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
              Need help? Chat with us!
            </div>
          </div>
        </button>
      )}

      {/* Chat Modal - Visible when isOpen is true */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-xl z-50 flex flex-col">
          {/* Header of the chat modal */}
          <div className="bg-slate-800 text-white p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-medium">Gratio Assistant</h3>
                <p className="text-xs text-gray-300">Online now</p>
              </div>
            </div>
            {/* Close button for the chat modal */}
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-slate-700 p-1 rounded"
              aria-label="Close chat assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages display area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Sender avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-slate-700' : 'bg-gray-300'}`}>
                    {message.sender === 'user' ? (
                      <User className="h-3 w-3 text-white" />
                    ) : (
                      <Bot className="h-3 w-3 text-gray-600" />
                    )}
                  </div>
                  {/* Message bubble */}
                  <div className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator for the bot */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <Bot className="h-3 w-3 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>

          {/* Quick Actions - visible only when no conversations have occurred */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
              <div className="grid grid-cols-2 gap-1">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-md border border-gray-200 text-left transition-colors"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input field and send button */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-slate-700 text-white hover:bg-slate-600 p-2 rounded-lg disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;