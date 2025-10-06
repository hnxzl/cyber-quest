import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="description" content="CyberQuest - Penelitian Keamanan Digital SMAN 1 Katapang" />
        <meta name="keywords" content="cyber security, digital safety, phishing, ransomware, password security" />
        <meta name="author" content="SMAN 1 Katapang Research Team" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
