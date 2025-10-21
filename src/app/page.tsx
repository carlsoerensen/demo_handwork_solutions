import { Brain, Lightbulb } from "lucide-react";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Brain className="h-8 w-8 text-blue-600" />
                <Lightbulb className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold text-gray-900">Håndværker AI</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Hjem</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Om os</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Kontakt</a>
            </nav>

            {/* CTA Button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Få AI-Værktøjer
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            AI til Håndværkere
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Din Digitale Værktøjskasse
          </h2>
        </div>

        {/* Description Box */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center">
            <p className="text-white text-lg md:text-xl leading-relaxed">
              Forestil dig: Du vågner op til en dag, hvor alle dine tilbud er lavet, kunderne er booket, 
              e-mails er besvaret og din kalender er perfekt planlagt - alt sammen mens du sov. 
              Dette er ikke en drøm, det er din nye virkelighed med AI-værktøjer, der arbejder for dig 24/7.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
          Bliv Kontaktet
        </button>

        {/* Second CTA Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Klar til at komme i gang?
            </h3>
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
              Vi tager et uforpligtende møde med dig, analyserer din forretning og viser dig de konkrete muligheder med AI.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Få Din Gratis Analyse
            </button>
          </div>
        </div>

        {/* Digital Toolbox Section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Din Digitale Værktøjskasse
          </h2>
        </div>

        {/* ChatBot Component */}
        <div className="fixed bottom-6 right-6 z-50">
          <ChatBot />
        </div>
      </main>
    </div>
  );
}
