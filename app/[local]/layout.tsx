import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google'
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>

          <header>
            <Navbar />
          </header>
        </NextIntlClientProvider>

        {children}
        {
          process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-XPCMFY2EL5" />
        }
      </body>
    </html>
  );
}
