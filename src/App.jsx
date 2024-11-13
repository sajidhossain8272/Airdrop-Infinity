import { Helmet } from "react-helmet-async";
import "./App.css";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { HeadProvider } from "react-head";

function App() {
  return (
    <>
      <Helmet>
        <title>
          Airdrop Infinity | Bringing you the best crypto airdrops, in 2025!
        </title>
        <script type='application/ld+json'>
          {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Airdrop Infinity",
          "url": "https://www.airdropinfinity.com/",
          "logo": "../public/Logo-t.png",
          "description": "Airdrop Infinity – Bringing you the best crypto airdrops, in 2025! Discover and claim top cryptocurrency airdrops from various blockchain projects.",
          "sameAs": [
            "https://x.com/airdropinfiniti",
            "https://www.facebook.com/airdropinfinity",
            "https://medium.com/@airdropinfinity"
          ]
        }
        `}
        </script>
      </Helmet>
      <HeadProvider>
        <Nav></Nav>
        <Banner></Banner>
        <Footer></Footer>
      </HeadProvider>
    </>
  );
}

export default App;
