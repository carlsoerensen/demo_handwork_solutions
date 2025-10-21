'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  Mail, 
  FileText, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  DollarSign,
  Zap,
  Target,
  BarChart3,
  Smartphone,
  ArrowLeft
} from 'lucide-react';

export default function AutomatiseringPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const automationCategories = [
    { id: 'all', name: 'Alle', icon: <Zap className="w-5 h-5" /> },
    { id: 'kundeservice', name: 'Kundeservice', icon: <Users className="w-5 h-5" /> },
    { id: 'administration', name: 'Administration', icon: <FileText className="w-5 h-5" /> },
    { id: 'projektstyring', name: 'Projektstyring', icon: <Target className="w-5 h-5" /> },
    { id: 'salgsoptimering', name: 'Salgsoptimering', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  const automations = [
    {
      id: 1,
      category: 'kundeservice',
      title: 'AI Kundesupport 24/7',
      description: 'Din hjemmeside besvarer automatisk kundespørgsmål og kvalificerer leads, mens du sover.',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      value: 'Spar 15 timer/uge',
      timeSaved: '15 timer/uge',
      revenue: '+25% flere kunder',
      features: [
        'Besvarer spørgsmål om projekter',
        'Kvalificerer potentielle kunder',
        'Booker besigtigelser automatisk',
        'Sender tilbud og opfølgning'
      ],
      example: 'Familie Nielsen besøger din hjemmeside kl. 22:00 og får øjeblikkelig svar på deres spørgsmål om køkkenrenovering. AI booker automatisk en besigtigelse næste dag.'
    },
    {
      id: 2,
      category: 'administration',
      title: 'Automatisk Kalenderstyring',
      description: 'AI planlægger dine møder, besigtigelser og projekter baseret på din tilgængelighed og kundernes ønsker.',
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      value: 'Spar 8 timer/uge',
      timeSaved: '8 timer/uge',
      revenue: '+30% bedre planlægning',
      features: [
        'Automatisk mødeplanlægning',
        'Optimerer ruteplanlægning',
        'Sender påmindelser til kunder',
        'Koordinerer med underleverandører'
      ],
      example: 'AI planlægger automatisk din dag: 9:00 besigtigelse i Valby, 11:00 møde med VVS-mand, 14:00 køkkenprojekt i Frederiksberg - alt optimeret for køretid.'
    },
    {
      id: 3,
      category: 'administration',
      title: 'Intelligent Opgaveliste',
      description: 'AI opretter, prioriterer og følger op på alle dine opgaver baseret på projekternes status og deadlines.',
      icon: <CheckSquare className="w-8 h-8 text-purple-600" />,
      value: 'Spar 6 timer/uge',
      timeSaved: '6 timer/uge',
      revenue: '+40% færre forsinkelser',
      features: [
        'Automatisk opgaveoprettelse',
        'Intelligent prioritering',
        'Deadline-påmindelser',
        'Projektstatus opdateringer'
      ],
      example: 'AI opretter automatisk opgaver: "Bestil tagsten til Valby-projekt", "Ring til Familie Hansen om godkendelse", "Send faktura til Familie Larsen" - alt baseret på projekternes fremskridt.'
    },
    {
      id: 4,
      category: 'kundeservice',
      title: 'Automatiske E-mails',
      description: 'AI skriver og sender personlige e-mails til kunder, tilbud, opfølgning og projektopdateringer.',
      icon: <Mail className="w-8 h-8 text-orange-600" />,
      value: 'Spar 10 timer/uge',
      timeSaved: '10 timer/uge',
      revenue: '+35% bedre kommunikation',
      features: [
        'Personlige tilbud e-mails',
        'Automatisk opfølgning',
        'Projektopdateringer',
        'Kundeservice beskeder'
      ],
      example: 'AI sender automatisk: "Hej Familie Nielsen, her er jeres køkkentilbud", "Familie Hansen, jeres badeværelse er 80% færdig", "Familie Larsen, materialerne er bestilt" - alt personligt og professionelt.'
    },
    {
      id: 5,
      category: 'projektstyring',
      title: 'Smart Projektstyring',
      description: 'AI overvåger alle dine projekter, koordinerer med underleverandører og holder kunderne informeret.',
      icon: <Target className="w-8 h-8 text-red-600" />,
      value: 'Spar 12 timer/uge',
      timeSaved: '12 timer/uge',
      revenue: '+50% bedre projektflow',
      features: [
        'Automatisk statusopdatering',
        'Koordination med VVS/elektriker',
        'Materialeplanlægning',
        'Kundekommunikation'
      ],
      example: 'AI koordinerer automatisk: "VVS-mand kommer tirsdag 10:00", "Tagsten leveres onsdag", "Elektriker booket til fredag" - og holder alle parter informeret.'
    },
    {
      id: 6,
      category: 'salgsoptimering',
      title: 'Intelligent Tilbudsgenerator',
      description: 'AI genererer præcise tilbud baseret på dine tidligere projekter, materialepriser og lokale forhold.',
      icon: <BarChart3 className="w-8 h-8 text-indigo-600" />,
      value: 'Spar 20 timer/uge',
      timeSaved: '20 timer/uge',
      revenue: '+60% flere tilbud',
      features: [
        'Automatisk tilbudsgenerering',
        'Præcise materialeberegninger',
        'Lokale priser og forhold',
        'Konkurrencedygtige priser'
      ],
      example: 'AI genererer automatisk: "Køkkenrenovering 15m²: 45.000 kr", "Badeværelse 8m²: 28.000 kr", "Tagprojekt 120m²: 85.000 kr" - alt baseret på dine data og lokale forhold.'
    }
  ];

  const filteredAutomations = selectedCategory === 'all' 
    ? automations 
    : automations.filter(auto => auto.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          {/* Navigation */}
          <div className="mb-4 md:mb-6">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tilbage til AI Agenter</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
              AI Automatisering til Tømrere
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Se hvordan AI kan automatisere din daglige administration og 
              give dig mere tid til det, du elsker - at bygge og skabe.
            </p>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-blue-600 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Hvad kan AI automatisering gøre for dig?</h2>
            <p className="text-blue-100 text-sm md:text-base">Konkrete resultater fra andre tømrere</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="bg-blue-700 bg-opacity-50 p-4 md:p-6 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold mb-2">80+</div>
              <div className="text-blue-100 text-xs md:text-sm">Timer sparet per måned</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 p-4 md:p-6 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold mb-2">+40%</div>
              <div className="text-blue-100 text-xs md:text-sm">Flere kunder</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 p-4 md:p-6 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold mb-2">+60%</div>
              <div className="text-blue-100 text-xs md:text-sm">Højere omsætning</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Vælg kategori for at se automatiseringer</h3>
            <p className="text-xs md:text-sm text-gray-600">Klik på en kategori for at filtrere automatiseringer</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {automationCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-xs md:text-sm ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Automation Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredAutomations.map((automation) => (
            <div key={automation.id} className="bg-white rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex items-start space-x-3 mb-3 md:mb-4">
                <div className="flex-shrink-0">
                  {automation.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 leading-tight">{automation.title}</h3>
                  <div className="text-xs md:text-sm text-gray-500 mt-1">Automatisering</div>
                </div>
              </div>

              <p className="text-gray-600 mb-3 md:mb-4 leading-relaxed text-sm">
                {automation.description}
              </p>

              {/* Value Metrics */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="bg-green-50 p-2 md:p-3 rounded-lg">
                  <div className="text-sm md:text-lg font-bold text-green-600">{automation.timeSaved}</div>
                  <div className="text-xs text-green-700">Tid sparet</div>
                </div>
                <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
                  <div className="text-sm md:text-lg font-bold text-blue-600">{automation.revenue}</div>
                  <div className="text-xs text-blue-700">Resultat</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-3 md:mb-4 flex-1">
                <h4 className="font-semibold text-gray-900 mb-2 text-xs md:text-sm">Hvad gør det:</h4>
                <ul className="space-y-1">
                  {automation.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 text-xs md:text-sm">Eksempel:</h4>
                <p className="text-xs text-gray-600 italic leading-relaxed">{automation.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
