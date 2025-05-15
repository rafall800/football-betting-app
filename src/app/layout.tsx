import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { getUser } from '@/lib/dal';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Instal Betting',
  description: 'Instal battle royal',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const htmlClass = user?.theme === 'dark' ? 'dark' : '';
  return (
    <html lang='en' className={htmlClass}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
