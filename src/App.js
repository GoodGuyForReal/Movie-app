import Home from "./components/pages/Home";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from 'react-router-dom';
import MoviePageHero from './components/pages/MoviePageHero.jsx'
import Footer from "./components/Footer";
import Discover from "./components/pages/Discover";
import { request } from "./Request";
import ScrollToTop from "./components/ScrollToTop";
import Person from "./components/pages/Person";



function App() {
  return (
    <div>

      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Discover" element={<Discover fetchURL={request.requestPopular} />} />
        <Route path=":id" element={<MoviePageHero />} />
        <Route path="/Person" element={<Person />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
