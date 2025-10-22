
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import BookingPopup from "./BookingPopup";

interface VehicleProps {
  name: string;
  category: string;
  passengers: number;
  price: number;
  image: string;
}

const VehicleCard = ({ name, category, passengers, price, image }: VehicleProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
          <div className="mb-3 sm:mb-0">
            <span className="inline-block bg-trekGreen-100 text-trekGreen-600 px-2 py-1 text-xs font-semibold rounded-full mb-2">
              {category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-trekGray-900 leading-tight">{name}</h3>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-trekGreen-600 font-bold text-lg sm:text-xl">{price} RWF</p>
            <p className="text-trekGray-500 text-xs sm:text-sm">per day</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto pt-4 border-t border-trekGray-200 gap-3 sm:gap-0">
          <div className="flex items-center justify-center sm:justify-start">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-trekGray-600">Passengers</p>
              <p className="font-semibold text-sm sm:text-base">{passengers}</p>
            </div>
          </div>
          <Button 
            className="bg-trekGreen-500 hover:bg-trekGreen-600 text-white flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base py-2 sm:py-2"
            onClick={handleBookNow}
          >
            <MessageSquare size={14} className="sm:w-4 sm:h-4" />
            Book Now
          </Button>
        </div>
      </div>
      
      <BookingPopup
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicleName={name}
        vehiclePrice={price}
      />
    </Card>
  );
};

export default VehicleCard;
