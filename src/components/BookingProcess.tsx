
import { Calendar, Car, CheckCircle, MapPin } from "lucide-react";

const BookingProcess = () => {
  const steps = [
    {
      icon: <MapPin className="h-10 w-10 text-white" />,
      title: "Choose Location",
      description: "Select your pick-up and drop-off locations from our network of convenient spots."
    },
    {
      icon: <Calendar className="h-10 w-10 text-white" />,
      title: "Select Dates",
      description: "Pick the dates that work best for your adventure and schedule."
    },
    {
      icon: <Car className="h-10 w-10 text-white" />,
      title: "Choose Vehicle",
      description: "Browse our fleet and select the perfect vehicle for your journey."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-white" />,
      title: "Confirm & Go",
      description: "Complete your booking, and you're all set to hit the road."
    }
  ];

  return (
    <section id="how-it-works" className="bg-trekGray-100 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-trekGray-900">How It Works</h2>
          <p className="text-base sm:text-lg lg:text-xl text-trekGray-700 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
            Renting with Trek&Drive is simple and straightforward. Follow these easy steps to get on the road.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-trekGreen-500 rounded-full p-4 sm:p-6 mb-4 sm:mb-6">
                {step.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-trekGray-900">{step.title}</h3>
              <p className="text-sm sm:text-base text-trekGray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
