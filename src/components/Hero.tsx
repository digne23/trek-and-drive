
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
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32 flex items-center justify-center min-h-screen">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-2xl leading-tight">
              Explore Beyond Limits
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 sm:mb-8 drop-shadow-md max-w-3xl mx-auto leading-relaxed px-4">
              Find the perfect vehicle for your next adventure with Trek&Drive. 
              Reliable, affordable, and ready for the road less traveled.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Button Section */}
      <div className="bg-white py-6 sm:py-8 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate("/vehicles")} 
              className="btn-primary text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 md:py-8 flex items-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <Car className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              View All Cars
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
