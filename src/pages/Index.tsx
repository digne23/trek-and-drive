
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VehicleCard from "@/components/VehicleCard";
import BookingProcess from "@/components/BookingProcess";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Link } from "react-router-dom";
import { supabase, Vehicle } from "@/lib/supabase";

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedVehicles();
  }, []);

  const fetchFeaturedVehicles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('id', { ascending: true })
        .limit(3);

      if (error) throw error;

      setVehicles(data || []);
    } catch (error: any) {
      console.error('Error loading vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      {/* Featured Vehicles */}
      <section id="vehicles" className="container-padding">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-trekGray-900">Our Fleet</h2>
            <p className="text-base sm:text-lg lg:text-xl text-trekGray-700 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
              Discover our selection of vehicles perfect for any adventure or travel need.
              Comfort, reliability, and style for every journey.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-trekGreen-600"></div>
              <p className="mt-4 text-trekGray-600">Loading vehicles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  name={vehicle.name}
                  category={vehicle.category}
                  passengers={vehicle.passengers}
                  price={vehicle.price}
                  image={vehicle.image}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/vehicles">
              <Button className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3">
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
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
              Why Choose Trek&Drive
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-trekGreen-100 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
              We offer more than just car rentals—we provide reliable transportation solutions for every adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-trekGreen-600">{feature.title}</h3>
                <p className="text-sm sm:text-base text-trekGray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      {/* CTA Section */}
      <section className="bg-trekGray-100 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-trekGreen-600 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                  Ready for Your Next Adventure?
                </h2>
                <p className="text-trekGreen-100 text-base sm:text-lg leading-relaxed">
                  Book your vehicle today and hit the road with confidence.
                </p>
              </div>
              <Link to="/vehicles">
                <Button className="bg-white text-trekGreen-600 hover:bg-trekGray-100 px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-base sm:text-lg font-semibold w-full sm:w-auto">
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
