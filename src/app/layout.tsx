import type { Metadata } from 'next';
import { Albert_Sans } from 'next/font/google';
import '../styles/globals.css';

const albert = Albert_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenWeather Playground',
  description: 'A playground for OpenWeather API by Paul L. using Next.js',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={albert.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
