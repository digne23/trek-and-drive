
import Navbar from "@/components/Navbar";
import VehicleCard from "@/components/VehicleCard";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
 

// Sample vehicle data - in a real app, this would come from an API or database
const vehicles = [
  {
    id: 1,
    name: "Kia Sorento 2011",
    category: "Midsize SUV (Crossover)",
    passengers: 7,
    price: 60000,
    image: "/kia_sorento.jpg"
  },
  {
    id: 2,
    name: "Toyota Prius 2013",
    category: "Economy",
    passengers: 5,
    price: 40000,
    
    image: "/toyota_prius_2013.JPG"
  },
  {
    id: 3,
    name: "Kia Sportage 2009",
    category: "Compact SUV",
    passengers: 5,
    price: 40000,
    plateNo:"",
    image: "/kia_sportage.JPG"
  },
  {
    id: 4,
    name: "Hyundai Tucson 2012",
    category: "Compact SUV (Crossover)",
    passengers: 5,
    price: 40000,
    plateNo:"RAG 239 G",
    image: "/hyundai_tucson_2012.JPG"
  },
  {
    id: 5,
    name: "Hyundai Tucson 2011",
    category: "Compact SUV (Crossover)",
    passengers: 5,
    price: 40000,
    plateNo:"RAG 774 L",
    image: "/hyundai_tucson_2011.JPG"
  }
];

const Vehicles = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative bg-gradient-to-br from-trekGreen-100 via-trekGreen-200 to-trekGreen-300 py-8 sm:py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-trekGreen-100/80 via-trekGreen-200/80 to-trekGreen-300/80"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-trekGray-900">
              Our Vehicle Fleet
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-trekGray-700 max-w-3xl mx-auto">
              Discover the perfect vehicle for your next adventure with Trek&Drive.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} {...vehicle} />
          ))}
        </div>
      </div>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Vehicles;
