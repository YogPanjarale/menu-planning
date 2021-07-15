import 'tailwindcss/tailwind.css'
import "../styles/main.css"
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <>
  <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Nutritive Value Calculator for finding nutrional values of food items" />
        <meta name="keywords" content="Nutritive Value Calculatorr" />
        {/* Primary Meta Tags */}
        <title>Nutritive Value Calculator</title>
        <meta name="title" content="Nutritive Value Calculator" />
        <meta name="description" content="Nutritive Value Calculator for finding nutrional values of food items" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://menu-planning.vercel.app/home" />
        <meta property="og:title" content="Nutritive Value Calculator" />
        <meta property="og:description" content="Nutritive Value Calculator for finding nutrional values of food items" />
        <meta property="og:image" content = 'https://menu-planning.vercel.app/screenshot.png' />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://menu-planning.vercel.app/home" />
        <meta property="twitter:title" content="Nutritive Value Calculator" />
        <meta property="twitter:description" content="Nutritive Value Calculator for finding nutrional values of food items" />
        <meta property="twitter:image" content='https://menu-planning.vercel.app/screenshot.png' />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/images/icons/icon-192x192.png"
          rel="icon"
          type="image/png"
          sizes="192x192"
        />
        <link
          href="/images/icons/icon-72x72.png"
          rel="icon"
          type="image/png"
          sizes="72x72"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
  <Component {...pageProps} />
  </>
}

export default MyApp
