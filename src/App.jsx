import { Helmet } from "react-helmet-async";
import "./App.css";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { HeadProvider } from "react-head";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />
      <Helmet>
        <title>
          Airdrop Infinity | Bringing you the best crypto airdrops, in 2025!
        </title>

        {/* Structured Data */}
        <script type='application/ld+json'>
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Airdrop Infinity",
            url: "https://www.airdropinfinity.com/",
            logo: "../public/Logo-t.png",
            description:
              "Airdrop Infinity – Bringing you the best crypto airdrops, in 2025! Discover and claim top cryptocurrency airdrops from various blockchain projects.",
            sameAs: [
              "https://x.com/airdropinfiniti",
              "https://www.facebook.com/airdropinfinity",
              "https://medium.com/@airdropinfinity",
            ],
          })}
        </script>

        {/* Google Analytics */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-4KTTR97QHT'
        ></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4KTTR97QHT');
          `}
        </script>
      </Helmet>
      <HeadProvider>
        <Nav />
        <Banner />
        <Footer />
        <SpeedInsights />
      </HeadProvider>
    </>
  );
}

export default App;
