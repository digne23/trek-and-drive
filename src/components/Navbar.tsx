
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-trekGreen-600 font-bold text-2xl">Trek<span className="text-trekGray-700">&</span>Drive</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-trekGray-800 hover:text-trekGreen-600 transition-colors">Home</Link>
            <Link to="/vehicles" className="text-trekGray-800 hover:text-trekGreen-600 transition-colors">Vehicles</Link>
            <Link to="/about" className="text-trekGray-800 hover:text-trekGreen-600 transition-colors">About Us</Link>
            <Link to="/vehicles">
              <Button className="bg-trekGreen-500 hover:bg-trekGreen-600 text-white">Book Now</Button>
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-trekGray-800 hover:text-trekGreen-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-trekGray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="px-4 py-2 text-trekGray-800 hover:text-trekGreen-600 transition-colors">Home</Link>
              <Link to="/vehicles" className="px-4 py-2 text-trekGray-800 hover:text-trekGreen-600 transition-colors">Vehicles</Link>
              <Link to="/about" className="px-4 py-2 text-trekGray-800 hover:text-trekGreen-600 transition-colors">About Us</Link>
              <Link to="/vehicles">
                <Button className="mx-4 bg-trekGreen-500 hover:bg-trekGreen-600 text-white">Book Now</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
