import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface BookingPopupProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
  vehiclePrice: number;
}

const BookingPopup = ({ isOpen, onClose, vehicleName, vehiclePrice }: BookingPopupProps) => {
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [driverOption, setDriverOption] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const buildMessage = () => {
    const pickup = pickupDate ? pickupDate : "(not set)";
    const ret = returnDate ? returnDate : "(not set)";
    const driver = driverOption ? driverOption : "(not selected)";
    const loc = location ? location : "(not selected)";
    
    return `Hello Trek & Drive Team,

I would like to book the ${vehicleName} for my upcoming trip.
Please find my booking details below:

Pickup Date: ${pickup}

Return Date: ${ret}

Driver Option: ${driver}

Destination Location: ${loc}

Kindly confirm the vehicle's availability, total rental cost, and any required documentation for the booking process.`;
  };

  const handleBookNow = async () => {
    if (!selectedContact) return;

    const message = buildMessage();
    console.log('Message:', message);
    
    switch (selectedContact) {
      case "whatsapp":
        const whatsappUrl = `https://wa.me/250788322882?text=${encodeURIComponent(message)}`;
        console.log('WhatsApp URL:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
        break;
        
      case "instagram":
        // Copy message to clipboard first
        try {
          await navigator.clipboard.writeText(message);
          // Try to open Instagram DM directly (works on mobile)
          window.open('https://ig.me/m/trek_and_drive', '_blank');
          // Show alert after a brief delay
          setTimeout(() => {
            alert('Message copied to clipboard! Paste it in the Instagram DM that just opened.');
          }, 500);
        } catch (err) {
          console.log('Clipboard error:', err);
          // Fallback: show message in alert
          alert(`Please copy this message and send it to @trek_and_drive on Instagram:\n\n${message}`);
          window.open('https://instagram.com/trek_and_drive', '_blank');
        }
        break;
        
      case "email":
        const subject = `Booking Request - ${vehicleName}`;
        const body = message;
        // Use Gmail compose URL which opens in browser
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=manzisteve2000@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
        break;
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between text-lg sm:text-xl">
            Book Your Vehicle
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 touch-button"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 pr-2">
          {/* Vehicle Details */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="vehicle-name" className="text-sm sm:text-base">Vehicle</Label>
              <Input
                id="vehicle-name"
                value={vehicleName}
                readOnly
                className="bg-gray-50 text-sm sm:text-base h-10 sm:h-11"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <Label htmlFor="pickup-date" className="text-sm sm:text-base">Pick-up Date</Label>
                <Input
                  id="pickup-date"
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label htmlFor="return-date" className="text-sm sm:text-base">Return Date</Label>
                <Input
                  id="return-date"
                  type="date"
                  value={returnDate}
                  min={pickupDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="h-10 sm:h-11 text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="vehicle-price" className="text-sm sm:text-base">Price per day</Label>
              <Input
                id="vehicle-price"
                value={`${vehiclePrice} RWF`}
                readOnly
                className="bg-gray-50 text-sm sm:text-base h-10 sm:h-11"
              />
            </div>

            <div>
              <Label className="text-sm sm:text-base">Driver Option</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2">
                <Button
                  type="button"
                  variant={driverOption === "Solo Drive" ? "default" : "outline"}
                  onClick={() => setDriverOption("Solo Drive")}
                  className="h-10 sm:h-11 text-xs sm:text-sm touch-button"
                >
                  Solo Drive
                </Button>
                <Button
                  type="button"
                  variant={driverOption === "Professional Chauffeur" ? "default" : "outline"}
                  onClick={() => setDriverOption("Professional Chauffeur")}
                  className="h-10 sm:h-11 text-xs sm:text-sm touch-button"
                >
                  Professional Chauffeur
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-sm sm:text-base">Destination Location</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <Button
                  type="button"
                  variant={location === "Kigali" ? "default" : "outline"}
                  onClick={() => setLocation("Kigali")}
                  className="h-10 sm:h-11 text-xs sm:text-sm touch-button"
                >
                  Kigali
                </Button>
                <Button
                  type="button"
                  variant={location === "Upcountry" ? "default" : "outline"}
                  onClick={() => setLocation("Upcountry")}
                  className="h-10 sm:h-11 text-xs sm:text-sm touch-button"
                >
                  Upcountry
                </Button>
                <Button
                  type="button"
                  variant={location === "Mixed Trip" ? "default" : "outline"}
                  onClick={() => setLocation("Mixed Trip")}
                  className="h-10 sm:h-11 text-xs sm:text-sm touch-button sm:col-span-1 col-span-1"
                >
                  Mixed Trip
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base">Contact us via:</Label>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              <Button
                variant={selectedContact === "whatsapp" ? "default" : "outline"}
                onClick={() => setSelectedContact("whatsapp")}
                className="flex items-center gap-3 justify-start h-11 sm:h-12 text-sm sm:text-base touch-button"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </Button>
              
              <Button
                variant={selectedContact === "instagram" ? "default" : "outline"}
                onClick={() => setSelectedContact("instagram")}
                className="flex items-center gap-3 justify-start h-11 sm:h-12 text-sm sm:text-base touch-button"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
                Instagram
              </Button>
              
              <Button
                variant={selectedContact === "email" ? "default" : "outline"}
                onClick={() => setSelectedContact("email")}
                className="flex items-center gap-3 justify-start h-11 sm:h-12 text-sm sm:text-base touch-button"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </Button>
            </div>
          </div>

        </div>
        
        {/* Book Button - Sticky at bottom */}
        <div className="flex-shrink-0 pt-4 border-t border-gray-200 bg-white">
          <Button
            onClick={handleBookNow}
            disabled={!selectedContact || !driverOption || !location}
            className="w-full bg-trekGreen-500 hover:bg-trekGreen-600 text-white h-12 sm:h-14 text-base sm:text-lg font-semibold touch-button"
          >
            Book Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingPopup;