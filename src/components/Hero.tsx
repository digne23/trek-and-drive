
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Image Section */}
      <div className="relative flex-1 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Explore Beyond Limits
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto">
              Find the perfect vehicle for your next adventure with Trek&Drive. 
              Reliable, affordable, and ready for the road less traveled.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Button Section */}
      <div className="bg-white py-8 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate("/vehicles")} 
              className="btn-primary text-xl px-12 py-8 flex items-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Car className="mr-3 h-6 w-6" />
              View All Cars
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
