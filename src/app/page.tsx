'use client';

import { useState } from 'react';
import { MessageCircle, Monitor, Smartphone, User, Users, Zap } from 'lucide-react';
import ChatBot from "@/components/ChatBot";
import IntegratedChat from "@/components/IntegratedChat";
import InternalAI from "@/components/InternalAI";
import Footer from "@/components/Footer";
import Link from 'next/link';

export default function Home() {
  const [aiType, setAiType] = useState<'customer' | 'internal'>('customer');
  const [viewMode, setViewMode] = useState<'integrated' | 'popup'>('integrated');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="flex justify-between items-center py-3 md:hidden">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-sm"></div>
                </div>
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900">Carl Sørensen</h1>
                <p className="text-xs text-gray-500">
                  {aiType === 'customer' ? 'AI Support' : 'Intern AI'}
                </p>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center space-x-2">
              <Link 
                href="/automatisering"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Automatisering"
              >
                <Zap className="w-4 h-4" />
              </Link>
              
              {/* Mobile AI Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-0.5">
                <button
                  onClick={() => setAiType('customer')}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    aiType === 'customer'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600'
                  }`}
                  title="AI Agent til hjemmeside"
                >
                  <Users className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setAiType('internal')}
                  className={`p-1.5 rounded-md transition-all duration-200 ${
                    aiType === 'internal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600'
                  }`}
                  title="Intern AI Agent"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile View Mode Toggle - Only show for customer AI */}
              {aiType === 'customer' && (
                <div className="flex bg-gray-100 rounded-lg p-0.5 ml-2">
                  <button
                    onClick={() => setViewMode('integrated')}
                    className={`p-1.5 rounded-md transition-all duration-200 ${
                      viewMode === 'integrated'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                    title="Integreret"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('popup')}
                    className={`p-1.5 rounded-md transition-all duration-200 ${
                      viewMode === 'popup'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600'
                    }`}
                    title="Popup Widget"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Tømrer & Snedkerfirmaet Carl Sørensen</h1>
                <p className="text-xs text-gray-500">
                  {aiType === 'customer' ? 'AI Kundesupport' : 'Intern AI Agent'}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              {/* Main Navigation */}
              <div className="flex items-center space-x-3">
                <Link 
                  href="/automatisering"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <Zap className="w-4 h-4" />
                  <span>Automatisering</span>
                </Link>
              </div>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-300"></div>

              {/* AI Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setAiType('customer')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    aiType === 'customer'
                      ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>AI Agent til hjemmeside</span>
                </button>
                <button
                  onClick={() => setAiType('internal')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    aiType === 'internal'
                      ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Intern AI Agent</span>
                </button>
              </div>

              {/* View Mode Toggle - Only show for customer AI */}
              {aiType === 'customer' && (
                <>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('integrated')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'integrated'
                          ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                      <span>Integreret</span>
                    </button>
                    <button
                      onClick={() => setViewMode('popup')}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        viewMode === 'popup'
                          ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Popup Widget</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {aiType === 'customer' ? (
          // Customer AI (Website AI Agent)
          viewMode === 'integrated' ? (
            <IntegratedChat />
          ) : (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
              <div className="text-center max-w-2xl w-full">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                  AI Kundesupport Widget
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-4">
                  Se vores AI-assistent i aktion som en popup widget. Perfekt til kundesupport
                  og at hjælpe potentielle kunder med deres tømrerprojekter.
                </p>
                <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border mx-4">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Popup widget er aktiv i hjørnet →
                  </p>
                </div>
              </div>
              
              {/* Popup ChatBot */}
              <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
                <ChatBot />
              </div>
            </div>
          )
        ) : (
          // Internal AI Agent
          <InternalAI />
        )}
      </main>

      <Footer />
    </div>
  );
}
