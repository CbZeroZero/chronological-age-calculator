import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from "next/font/google";
import Navbar from '@/components/Navbar';
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';
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
          {children}
        </NextIntlClientProvider>
        {
          process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-XPCMFY2EL5" />
        }
        {
          process.env.NODE_ENV === 'production' &&
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "mjfmss4qax");
            `}
          </Script>
        }
      </body>
    </html>
  );
}
