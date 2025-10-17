
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
      className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare size={28} />
    </button>
  );
};
