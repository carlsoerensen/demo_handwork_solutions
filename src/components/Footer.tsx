export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Klar til at automatisere din forretning?
        </h2>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          Lad os vise dig, hvordan AI kan transformere din daglige arbejdsgang
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://calendly.com/cs-tilbudsgenerator/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm text-center"
          >
            Få Gratis Demo
          </a>
          <a 
            href="tel:+4550799640"
            className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors text-sm text-center"
          >
            Ring til os: +45 50 79 96 40
          </a>
        </div>
      </div>
    </footer>
  );
}
