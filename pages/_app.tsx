import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Critical viewport meta tag for mobile optimization */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" 
        />
        
        {/* Performance optimizations */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Mobile web app capabilities */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CyberQuest" />
        
        {/* Prevent zoom on form focus (Android) */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Default title */}
        <title>CyberQuest - Penelitian Keamanan Digital</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
