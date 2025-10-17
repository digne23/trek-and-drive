
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
      
      <div className="bg-trekGreen-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-trekGray-900">
              Our Vehicle Fleet
            </h1>
            <p className="text-lg text-trekGray-700">
              Discover the perfect vehicle for your next adventure with Trek&Drive.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
