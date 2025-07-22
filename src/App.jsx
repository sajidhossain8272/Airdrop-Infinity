import { Helmet } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import "./App.css";
import AdBanner from "./Components/Adbanner";

function App() {
  return (
    <>
      <Helmet>
        <title>
          Airdrop Infinity | Best Crypto Airdrops & Tips 2025
        </title>
        <meta
          name="description"
          content="Discover and claim top cryptocurrency airdrops from various blockchain projects. Your premier source for crypto rewards and strategies."
        />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Airdrop Infinity",
            url: "https://www.airdropinfinity.com/",
            logo: "https://www.airdropinfinity.com/Logo-t.png",
            description: "Your premier source for cryptocurrency airdrops and blockchain rewards strategies.",
            sameAs: [
              "https://x.com/airdropinfiniti",
              "https://www.facebook.com/airdropinfinity",
              "https://medium.com/@airdropinfinity",
            ],
          })}
        </script>

        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`}></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </script>
      </Helmet>
<AdBanner /> 
      <Nav />
      <main className="min-h-[calc(100vh-160px)]">
        <Outlet /> {/* This renders nested routes */}
      </main>
      <Footer />
      
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;