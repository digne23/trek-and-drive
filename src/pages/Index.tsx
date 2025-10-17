
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VehicleCard from "@/components/VehicleCard";
import BookingProcess from "@/components/BookingProcess";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Link } from "react-router-dom";

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
    
    
    image: "/kia_sportage.JPG"
  }
];

const features = [
  {
    title: "Diverse Fleet",
    description: "From compact cars to spacious SUVs and luxury vehicles, we have the perfect car for any journey."
  },
  {
    title: "Flexible Rental Options",
    description: "Daily, weekly, or monthly rentals with competitive rates and special long-term discounts."
  },
  {
    title: "Adventure Ready",
    description: "Optional equipment like GPS, roof racks, and camping gear to enhance your adventure."
  },
  {
    title: "24/7 Support",
    description: "Our customer service team is available around the clock to assist with any questions or issues."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Featured Vehicles */}
      <section id="vehicles" className="container-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Fleet</h2>
            <p className="section-subtitle">
              Discover our selection of vehicles perfect for any adventure or travel need. 
              Comfort, reliability, and style for every journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/vehicles">
              <Button className="btn-primary">
                View All Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <BookingProcess />
      
      {/* Features Section */}
      <section className="container-padding bg-trekGreen-500">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Why Choose Trek&Drive
            </h2>
            <p className="text-xl text-trekGreen-100 mb-12 max-w-3xl mx-auto">
              We offer more than just car rentals—we provide reliable transportation solutions for every adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-3 text-trekGreen-600">{feature.title}</h3>
                <p className="text-trekGray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      {/* CTA Section */}
      <section className="bg-trekGray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-trekGreen-600 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready for Your Next Adventure?
                </h2>
                <p className="text-trekGreen-100 text-lg">
                  Book your vehicle today and hit the road with confidence.
                </p>
              </div>
              <Link to="/vehicles">
                <Button className="bg-white text-trekGreen-600 hover:bg-trekGray-100 px-8 py-6 text-lg font-semibold">
                  Book Your Car Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
