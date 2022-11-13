import Home from "./components/pages/Home";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from 'react-router-dom';
import MoviePageHero from './components/pages/MoviePageHero.jsx'
import Footer from "./components/Footer";
import Discover from "./components/pages/Discover";
import { request } from "./Request";
import ScrollToTop from "./components/ScrollToTop";
import Person from "./components/pages/Person";
import SignUp from "./components/pages/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import SignIn from "./components/pages/SignIn";
import Account from "./components/pages/Account";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />/
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Discover" element={<Discover fetchURL={request.requestPopular} />} />
          <Route path=":id" element={<MoviePageHero />} />
          <Route path="/Person/:id" element={<Person />} />
        </Routes>
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
