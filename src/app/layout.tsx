import type {Metadata} from 'next';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {MouseSpotlight} from '@/components/ui/mouse-spotlight';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Lazoronix | Institutional Forensic Intelligence & Digital Asset Investigation',
  description: 'Specialized forensic investigation for victims of financial trading fraud, institutional investment schemes, and digital asset access challenges. Leading with evidence-based intelligence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NHXDBCBQ');`,
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30 relative">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NHXDBCBQ"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <MouseSpotlight />
        {children}
        <Toaster />
        
        {/* Tawk.to Stable Initialization */}
        <Script id="tawk-init" strategy="afterInteractive">
          {`
            window.Tawk_API = window.Tawk_API || {};
            window.Tawk_LoadStart = new Date();
          `}
        </Script>
        <Script 
          id="tawk-embed"
          src="https://embed.tawk.to/6a3186cd16fcef1d436f9c5b/1jr8nd581" 
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
