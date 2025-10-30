import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Vehicle {
  id: number;
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

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    // Load from localStorage on initial mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored vehicles:', e);
        return initialVehicles;
      }
    }
    return initialVehicles;
  });

  // Save to localStorage whenever vehicles change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  }, [vehicles]);

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newId = Math.max(...vehicles.map(v => v.id), 0) + 1;
    setVehicles([...vehicles, { ...vehicle, id: newId }]);
  };

  const updateVehicle = (id: number, updatedVehicle: Omit<Vehicle, 'id'>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...updatedVehicle, id } : v));
  };

  const deleteVehicle = (id: number) => {
    setVehicles(vehicles.filter(v => v.id !== id));
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
