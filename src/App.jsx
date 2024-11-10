import "./App.css";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import { HeadProvider } from "react-head";

function App() {
  return (
    <>
    <HeadProvider>
    <Nav></Nav>
    <Banner></Banner>
    <Footer></Footer>
    </HeadProvider>
    </>
  );
}

export default App;
