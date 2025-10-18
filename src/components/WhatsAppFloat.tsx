
import { MessageSquare } from "lucide-react";

interface WhatsAppFloatProps {
  phoneNumber?: string;
}

export const WhatsAppFloat = ({ phoneNumber = "250788322882" }: WhatsAppFloatProps) => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <button 
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare size={24} className="sm:w-7 sm:h-7" />
    </button>
  );
};
