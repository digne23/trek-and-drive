import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VehicleCard from "@/components/VehicleCard";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { supabase, Vehicle } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;

      setVehicles(data || []);
    } catch (error: any) {
      console.error('Error loading vehicles:', error);
      toast({
        title: "Error Loading Vehicles",
        description: "Failed to load vehicles. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-trekGreen-600"></div>
            <p className="mt-4 text-trekGray-600">Loading vehicles...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-trekGray-600">No vehicles available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Vehicles;
