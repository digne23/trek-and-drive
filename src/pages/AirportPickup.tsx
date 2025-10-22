import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, Upload, User, Mail, Phone } from "lucide-react";

const AirportPickup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    arrivalTime: "",
    timePeriod: "AM",
    destination: "",
    ticketDetails: null as File | null,
    selectedContact: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, ticketDetails: file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.arrivalTime) newErrors.arrivalTime = "Arrival time is required";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required";
    if (!formData.selectedContact) newErrors.selectedContact = "Please select a contact method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMessage = () => {
    const ticketInfo = formData.ticketDetails ? `\nTicket Details: ${formData.ticketDetails.name}` : "\nTicket Details: Not provided";
    
    return `Hello Trek & Drive Team,

I would like to book an airport pickup service.
Please find my booking details below:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Pickup Date: ${formData.pickupDate}
Arrival Time: ${formData.arrivalTime} ${formData.timePeriod}
Destination: ${formData.destination}${ticketInfo}

Kindly confirm the pickup service availability and provide the total cost for the airport pickup service.`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const message = buildMessage();
    console.log('Message:', message);
    
    switch (formData.selectedContact) {
      case "whatsapp":
        const whatsappUrl = `https://wa.me/250788322882?text=${encodeURIComponent(message)}`;
        console.log('WhatsApp URL:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
        break;
        
      case "instagram":
        // Copy message to clipboard first
        try {
          await navigator.clipboard.writeText(message);
          // Try to open Instagram DM directly (works on mobile)
          window.open('https://ig.me/m/trek_and_drive', '_blank');
          // Show alert after a brief delay
          setTimeout(() => {
            alert('Message copied to clipboard! Paste it in the Instagram DM that just opened.');
          }, 500);
        } catch (err) {
          console.log('Clipboard error:', err);
          // Fallback: show message in alert
          alert(`Please copy this message and send it to @trek_and_drive on Instagram:\n\n${message}`);
          window.open('https://instagram.com/trek_and_drive', '_blank');
        }
        break;
        
      case "email":
        const subject = `Airport Pickup Request - ${formData.name}`;
        const body = message;
        // Use Gmail compose URL which opens in browser
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=manzisteve2000@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-trekGreen-500 to-trekGreen-600 text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Airport Pickup Service
            </h1>
            <p className="text-lg sm:text-xl text-trekGreen-100 mb-8">
              Reliable and comfortable airport transfers to your destination. 
              Book your pickup service and travel with peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-trekGray-900 mb-6 sm:mb-8 text-center">
                Book Your Airport Pickup
              </h2>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-trekGray-800 flex items-center gap-2">
                    <User className="h-5 w-5 text-trekGreen-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Pickup Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-trekGray-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-trekGreen-600" />
                    Pickup Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pickupDate" className="text-sm font-medium">Pickup Date *</Label>
                      <Input
                        id="pickupDate"
                        name="pickupDate"
                        type="date"
                        value={formData.pickupDate}
                        min={today}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.pickupDate ? 'border-red-500' : ''}`}
                      />
                      {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="arrivalTime" className="text-sm font-medium">Arrival Time *</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="arrivalTime"
                          name="arrivalTime"
                          type="time"
                          value={formData.arrivalTime}
                          onChange={handleInputChange}
                          className={`flex-1 ${errors.arrivalTime ? 'border-red-500' : ''}`}
                        />
                        <select
                          name="timePeriod"
                          value={formData.timePeriod}
                          onChange={(e) => setFormData(prev => ({ ...prev, timePeriod: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-trekGreen-500"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                      {errors.arrivalTime && <p className="text-red-500 text-xs mt-1">{errors.arrivalTime}</p>}
                    </div>
                  </div>
                </div>

                {/* Destination */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-trekGray-800 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-trekGreen-600" />
                    Destination
                  </h3>
                  
                  <div>
                    <Label htmlFor="destination" className="text-sm font-medium">Destination Address *</Label>
                    <Textarea
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      className={`mt-1 ${errors.destination ? 'border-red-500' : ''}`}
                      placeholder="Enter your destination address or location"
                      rows={3}
                    />
                    {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Please provide the complete address or location where you want to be dropped off.
                    </p>
                  </div>
                </div>

                {/* Ticket Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-trekGray-800 flex items-center gap-2">
                    <Upload className="h-5 w-5 text-trekGreen-600" />
                    Flight Details (Optional)
                  </h3>
                  
                  <div>
                    <Label htmlFor="ticketDetails" className="text-sm font-medium">Upload Ticket/Booking Details</Label>
                    <Input
                      id="ticketDetails"
                      name="ticketDetails"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload your flight ticket, booking confirmation, or any relevant document (PDF, JPG, PNG, DOC, DOCX)
                    </p>
                  </div>
                </div>

                {/* Contact Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-trekGray-800">Contact us via: *</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      type="button"
                      variant={formData.selectedContact === "whatsapp" ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, selectedContact: "whatsapp" }))}
                      className="flex items-center gap-3 justify-start h-12 text-sm"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </Button>
                    
                    <Button
                      type="button"
                      variant={formData.selectedContact === "instagram" ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, selectedContact: "instagram" }))}
                      className="flex items-center gap-3 justify-start h-12 text-sm"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                      </svg>
                      Instagram
                    </Button>
                    
                    <Button
                      type="button"
                      variant={formData.selectedContact === "email" ? "default" : "outline"}
                      onClick={() => setFormData(prev => ({ ...prev, selectedContact: "email" }))}
                      className="flex items-center gap-3 justify-start h-12 text-sm"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Email
                    </Button>
                  </div>
                  {errors.selectedContact && <p className="text-red-500 text-xs mt-1">{errors.selectedContact}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-trekGreen-500 hover:bg-trekGreen-600 text-white h-12 text-base font-semibold"
                >
                  Book Airport Pickup
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AirportPickup;
