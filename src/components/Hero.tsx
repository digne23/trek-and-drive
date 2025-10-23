
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Image Section */}
      <div className="relative flex-1 bg-cover bg-center" style={{ backgroundImage: "url('/Nyungwe_National_Park (1).jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-2xl leading-tight">
              Explore Beyond Limits
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 drop-shadow-md max-w-3xl mx-auto leading-relaxed px-4">
              Find the perfect vehicle for your next adventure with Trek&Drive. 
              Reliable, affordable, and ready for the road less traveled.
            </p>
          </div>
          
          {/* CTA Button inside hero */}
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate("/vehicles")} 
              className="group relative bg-white/90 hover:bg-white text-trekGreen-600 hover:text-trekGreen-700 text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 flex items-center shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm font-semibold"
            >
              <Car className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-12" />
              <span className="relative z-10">Explore Our Fleet</span>
              <div className="absolute inset-0 bg-gradient-to-r from-trekGreen-500/10 to-trekGreen-600/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
