import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { StoryProvider } from '@/contexts/StoryContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kids Learning Bot - Stories & Tutoring with AI',
  description: 'Create personalized stories and get educational help for children with AI. Safe storytelling, interactive tutoring, and age-appropriate learning experiences.',
  keywords: ['kids stories', 'children stories', 'AI tutoring', 'educational AI', 'safe content', 'kids learning', 'homework help'],
  authors: [{ name: 'Kids Learning Bot Team' }],
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#8b5cf6',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 min-h-screen`}>
        <StoryProvider>
          {/* Background decorations */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
          </div>
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </StoryProvider>
      </body>
    </html>
  );
}