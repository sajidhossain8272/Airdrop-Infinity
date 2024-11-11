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
      <title>Airdrop Infinity | Bringing you the best crypto airdrops, in 2025!</title>
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
