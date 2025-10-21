# Håndværker AI - Tømrerfirmaet Carl Sørensen

A modern Next.js website with an AI-powered chatbot for a Danish carpenter business. The website features a beautiful gradient design and an intelligent chatbot that helps qualify potential customers.

## Features

- 🎨 Modern, responsive design with gradient backgrounds
- 🤖 AI-powered chatbot using OpenAI GPT-4o-mini
- 📱 Mobile-friendly interface
- 🎯 Customer qualification system
- 💬 Real-time chat interface

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd handvaerker-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

**Important**: The `.env.local` file is automatically ignored by git for security. Never commit your actual API keys to the repository.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI Chatbot

The chatbot is designed to:
- Help customers with carpenter-related questions
- Qualify potential customers by collecting contact information
- Provide information about Tømrerfirmaet Carl Sørensen
- Guide users through the consultation process

## Deployment

### GitHub Repository Setup

To push this code to GitHub:

1. Create a new repository on GitHub
2. Add the remote origin:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
```

3. Push the code:
```bash
git branch -M main
git push -u origin main
```

### Vercel Deployment

The easiest way to deploy is using Vercel:

1. Connect your GitHub repository to Vercel
2. In your Vercel dashboard, go to Settings → Environment Variables
3. Add the following environment variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your actual OpenAI API key
   - **Environment**: Production, Preview, Development (select all)
4. Deploy automatically

**Security Note**: Your API key is now safely stored in Vercel's environment variables and not exposed in your code.

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # API route for OpenAI integration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   └── ChatBot.tsx        # AI chatbot component
```

## Customization

- Update the company information in the chatbot prompt
- Modify the styling in `src/app/page.tsx`
- Adjust the AI behavior in `src/app/api/chat/route.ts`

## License

This project is proprietary software for Tømrerfirmaet Carl Sørensen.
