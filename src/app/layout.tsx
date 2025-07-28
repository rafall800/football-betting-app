import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Instal Betting',
  description: 'Instal battle royale',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          const theme = localStorage.getItem("theme");
          if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
