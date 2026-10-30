
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
// import Portfolio from "./components/Portfolio.jsx";
import Services from "./components/Services.jsx";
import Pricing from "./components/Pricing.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* <Portfolio /> */}
        <Services />
        <Pricing />
        <About />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap footer-row">
          {/* ✏️ EDIT HERE: footer text */}
          {/* <p>© {new Date().getFullYear()} Nitin. Built with React.</p> */}
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </>
  );
}
