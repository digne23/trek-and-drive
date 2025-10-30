import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

interface Vehicle {
  id: number;
  firebaseId?: string; // Firestore document ID
  name: string;
  category: string;
  passengers: number;
  price: number;
  plateNo?: string;
  image: string;
}

interface VehicleContextType {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: number, vehicle: Omit<Vehicle, 'id'>) => void;
  deleteVehicle: (id: number) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const initialVehicles: Vehicle[] = [
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
    plateNo: "",
    image: "/kia_sportage.JPG"
  },
  {
    id: 4,
    name: "Hyundai Tucson 2012",
    category: "Compact SUV (Crossover)",
    passengers: 5,
    price: 40000,
    plateNo: "RAG 239 G",
    image: "/hyundai_tucson_2012.JPG"
  },
  {
    id: 5,
    name: "Hyundai Tucson 2011",
    category: "Compact SUV (Crossover)",
    passengers: 5,
    price: 40000,
    plateNo: "RAG 774 L",
    image: "/hyundai_tucson_2011.JPG"
  }
];

const STORAGE_KEY = 'trek-drive-vehicles';
const VEHICLES_COLLECTION = 'vehicles';

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize: Load from Firestore or migrate from localStorage
  useEffect(() => {
    const initializeVehicles = async () => {
      try {
        const vehiclesRef = collection(db, VEHICLES_COLLECTION);
        const snapshot = await getDocs(vehiclesRef);

        if (snapshot.empty) {
          // No data in Firestore, check localStorage for migration
          const stored = localStorage.getItem(STORAGE_KEY);
          let vehiclesToMigrate = initialVehicles;

          if (stored) {
            try {
              vehiclesToMigrate = JSON.parse(stored);
            } catch (e) {
              console.error('Failed to parse stored vehicles:', e);
            }
          }

          // Migrate to Firestore
          console.log('Migrating vehicles to Firestore...');
          for (const vehicle of vehiclesToMigrate) {
            await addDoc(vehiclesRef, vehicle);
          }

          // Clear localStorage after migration
          localStorage.removeItem(STORAGE_KEY);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing vehicles:', error);
        setIsLoading(false);
      }
    };

    initializeVehicles();
  }, []);

  // Real-time listener for Firestore changes
  useEffect(() => {
    const vehiclesRef = collection(db, VEHICLES_COLLECTION);

    const unsubscribe = onSnapshot(vehiclesRef, (snapshot) => {
      const vehiclesList: Vehicle[] = [];
      snapshot.forEach((doc) => {
        vehiclesList.push({
          ...doc.data() as Vehicle,
          firebaseId: doc.id,
        });
      });
      setVehicles(vehiclesList);
    }, (error) => {
      console.error('Error listening to vehicles:', error);
    });

    return () => unsubscribe();
  }, []);

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    try {
      const newId = Math.max(...vehicles.map(v => v.id), 0) + 1;
      const vehicleWithId = { ...vehicle, id: newId };
      await addDoc(collection(db, VEHICLES_COLLECTION), vehicleWithId);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      throw error;
    }
  };

  const updateVehicle = async (id: number, updatedVehicle: Omit<Vehicle, 'id'>) => {
    try {
      const vehicle = vehicles.find(v => v.id === id);
      if (vehicle?.firebaseId) {
        const vehicleDoc = doc(db, VEHICLES_COLLECTION, vehicle.firebaseId);
        await updateDoc(vehicleDoc, { ...updatedVehicle, id });
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  };

  const deleteVehicle = async (id: number) => {
    try {
      const vehicle = vehicles.find(v => v.id === id);
      if (vehicle?.firebaseId) {
        await deleteDoc(doc(db, VEHICLES_COLLECTION, vehicle.firebaseId));
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  };

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle, updateVehicle, deleteVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};
