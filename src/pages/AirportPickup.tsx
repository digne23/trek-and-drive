import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, User, Mail, Phone, Plane } from "lucide-react";

const AirportPickup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+250",
    phone: "",
    flightNumber: "",
    fromDestination: "",
    pickupDate: "",
    arrivalTime: "",
    destination: "",
    selectedContact: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  // Country codes with flags (full country names)
  const countryCodes = [
    { code: "+213", country: "Algeria", flag: "🇩🇿" },
    { code: "+244", country: "Angola", flag: "🇦🇴" },
    { code: "+54", country: "Argentina", flag: "🇦🇷" },
    { code: "+374", country: "Armenia", flag: "🇦🇲" },
    { code: "+297", country: "Aruba", flag: "🇦🇼" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+43", country: "Austria", flag: "🇦🇹" },
    { code: "+973", country: "Bahrain", flag: "🇧🇭" },
    { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
    { code: "+32", country: "Belgium", flag: "🇧🇪" },
    { code: "+229", country: "Benin", flag: "🇧🇯" },
    { code: "+591", country: "Bolivia", flag: "🇧🇴" },
    { code: "+387", country: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { code: "+267", country: "Botswana", flag: "🇧🇼" },
    { code: "+55", country: "Brazil", flag: "🇧🇷" },
    { code: "+246", country: "British Indian Ocean Territory", flag: "🇮🇴" },
    { code: "+673", country: "Brunei", flag: "🇧🇳" },
    { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
    { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
    { code: "+257", country: "Burundi", flag: "🇧🇮" },
    { code: "+855", country: "Cambodia", flag: "🇰🇭" },
    { code: "+237", country: "Cameroon", flag: "🇨🇲" },
    { code: "+1", country: "Canada", flag: "🇨🇦" },
    { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
    { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
    { code: "+235", country: "Chad", flag: "🇹🇩" },
    { code: "+56", country: "Chile", flag: "🇨🇱" },
    { code: "+86", country: "China", flag: "🇨🇳" },
    { code: "+57", country: "Colombia", flag: "🇨🇴" },
    { code: "+269", country: "Comoros", flag: "🇰🇲" },
    { code: "+242", country: "Congo", flag: "🇨🇬" },
    { code: "+506", country: "Costa Rica", flag: "🇨🇷" },
    { code: "+225", country: "Côte d’Ivoire", flag: "🇨🇮" },
    { code: "+385", country: "Croatia", flag: "🇭🇷" },
    { code: "+53", country: "Cuba", flag: "🇨🇺" },
    { code: "+357", country: "Cyprus", flag: "🇨🇾" },
    { code: "+420", country: "Czechia", flag: "🇨🇿" },
    { code: "+45", country: "Denmark", flag: "🇩🇰" },
    { code: "+253", country: "Djibouti", flag: "🇩🇯" },
    { code: "+1", country: "Dominican Republic", flag: "🇩🇴" },
    { code: "+593", country: "Ecuador", flag: "🇪🇨" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+503", country: "El Salvador", flag: "🇸🇻" },
    { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
    { code: "+291", country: "Eritrea", flag: "🇪🇷" },
    { code: "+372", country: "Estonia", flag: "🇪🇪" },
    { code: "+268", country: "Eswatini", flag: "🇸🇿" },
    { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
    { code: "+298", country: "Faroe Islands", flag: "🇫🇴" },
    { code: "+358", country: "Finland", flag: "🇫🇮" },
    { code: "+33", country: "France", flag: "🇫🇷" },
    { code: "+241", country: "Gabon", flag: "🇬🇦" },
    { code: "+220", country: "The Gambia", flag: "🇬🇲" },
    { code: "+995", country: "Georgia", flag: "🇬🇪" },
    { code: "+49", country: "Germany", flag: "🇩🇪" },
    { code: "+233", country: "Ghana", flag: "🇬🇭" },
    { code: "+30", country: "Greece", flag: "🇬🇷" },
    { code: "+299", country: "Greenland", flag: "🇬🇱" },
    { code: "+502", country: "Guatemala", flag: "🇬🇹" },
    { code: "+224", country: "Guinea", flag: "🇬🇳" },
    { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
    { code: "+509", country: "Haiti", flag: "🇭🇹" },
    { code: "+504", country: "Honduras", flag: "🇭🇳" },
    { code: "+36", country: "Hungary", flag: "🇭🇺" },
    { code: "+354", country: "Iceland", flag: "🇮🇸" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+62", country: "Indonesia", flag: "🇮🇩" },
    { code: "+98", country: "Iran", flag: "🇮🇷" },
    { code: "+964", country: "Iraq", flag: "🇮🇶" },
    { code: "+353", country: "Ireland", flag: "🇮🇪" },
    { code: "+972", country: "Israel", flag: "🇮🇱" },
    { code: "+39", country: "Italy", flag: "🇮🇹" },
    { code: "+81", country: "Japan", flag: "🇯🇵" },
    { code: "+962", country: "Jordan", flag: "🇯🇴" },
    { code: "+7", country: "Kazakhstan", flag: "🇰🇿" },
    { code: "+254", country: "Kenya", flag: "🇰🇪" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+856", country: "Laos", flag: "🇱🇦" },
    { code: "+371", country: "Latvia", flag: "🇱🇻" },
    { code: "+961", country: "Lebanon", flag: "🇱🇧" },
    { code: "+266", country: "Lesotho", flag: "🇱🇸" },
    { code: "+218", country: "Libya", flag: "🇱🇾" },
    { code: "+423", country: "Liechtenstein", flag: "🇱🇮" },
    { code: "+370", country: "Lithuania", flag: "🇱🇹" },
    { code: "+352", country: "Luxembourg", flag: "🇱🇺" },
    { code: "+261", country: "Madagascar", flag: "🇲🇬" },
    { code: "+265", country: "Malawi", flag: "🇲🇼" },
    { code: "+60", country: "Malaysia", flag: "🇲🇾" },
    { code: "+960", country: "Maldives", flag: "🇲🇻" },
    { code: "+223", country: "Mali", flag: "🇲🇱" },
    { code: "+356", country: "Malta", flag: "🇲🇹" },
    { code: "+230", country: "Mauritius", flag: "🇲🇺" },
    { code: "+262", country: "Reunion", flag: "🇷🇪" },
    { code: "+52", country: "Mexico", flag: "🇲🇽" },
    { code: "+373", country: "Moldova", flag: "🇲🇩" },
    { code: "+377", country: "Monaco", flag: "🇲🇨" },
    { code: "+976", country: "Mongolia", flag: "🇲🇳" },
    { code: "+382", country: "Montenegro", flag: "🇲🇪" },
    { code: "+212", country: "Morocco", flag: "🇲🇦" },
    { code: "+258", country: "Mozambique", flag: "🇲🇿" },
    { code: "+95", country: "Myanmar", flag: "🇲🇲" },
    { code: "+264", country: "Namibia", flag: "🇳🇦" },
    { code: "+977", country: "Nepal", flag: "🇳🇵" },
    { code: "+31", country: "Netherlands", flag: "🇳🇱" },
    { code: "+64", country: "New Zealand", flag: "🇳🇿" },
    { code: "+505", country: "Nicaragua", flag: "🇳🇮" },
    { code: "+227", country: "Niger", flag: "🇳🇪" },
    { code: "+234", country: "Nigeria", flag: "🇳🇬" },
    { code: "+47", country: "Norway", flag: "🇳🇴" },
    { code: "+968", country: "Oman", flag: "🇴🇲" },
    { code: "+92", country: "Pakistan", flag: "🇵🇰" },
    { code: "+507", country: "Panama", flag: "🇵🇦" },
    { code: "+595", country: "Paraguay", flag: "🇵🇾" },
    { code: "+51", country: "Peru", flag: "🇵🇪" },
    { code: "+63", country: "Philippines", flag: "🇵🇭" },
    { code: "+48", country: "Poland", flag: "🇵🇱" },
    { code: "+351", country: "Portugal", flag: "🇵🇹" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
    { code: "+40", country: "Romania", flag: "🇷🇴" },
    { code: "+7", country: "Russia", flag: "🇷🇺" },
    { code: "+250", country: "Rwanda", flag: "🇷🇼" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+221", country: "Senegal", flag: "🇸🇳" },
    { code: "+248", country: "Seychelles", flag: "🇸🇨" },
    { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
    { code: "+65", country: "Singapore", flag: "🇸🇬" },
    { code: "+421", country: "Slovakia", flag: "🇸🇰" },
    { code: "+386", country: "Slovenia", flag: "🇸🇮" },
    { code: "+27", country: "South Africa", flag: "🇿🇦" },
    { code: "+82", country: "South Korea", flag: "🇰🇷" },
    { code: "+34", country: "Spain", flag: "🇪🇸" },
    { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
    { code: "+249", country: "Sudan", flag: "🇸🇩" },
    { code: "+597", country: "Suriname", flag: "🇸🇷" },
    { code: "+268", country: "Eswatini", flag: "🇸🇿" },
    { code: "+46", country: "Sweden", flag: "🇸🇪" },
    { code: "+41", country: "Switzerland", flag: "🇨🇭" },
    { code: "+963", country: "Syria", flag: "🇸🇾" },
    { code: "+255", country: "Tanzania", flag: "🇹🇿" },
    { code: "+66", country: "Thailand", flag: "🇹🇭" },
    { code: "+228", country: "Togo", flag: "🇹🇬" },
    { code: "+216", country: "Tunisia", flag: "🇹🇳" },
    { code: "+90", country: "Türkiye", flag: "🇹🇷" },
    { code: "+256", country: "Uganda", flag: "🇺🇬" },
    { code: "+380", country: "Ukraine", flag: "🇺🇦" },
    { code: "+971", country: "United Arab Emirates", flag: "🇦🇪" },
    { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
    { code: "+1", country: "United States", flag: "🇺🇸" },
    { code: "+598", country: "Uruguay", flag: "🇺🇾" },
    { code: "+998", country: "Uzbekistan", flag: "🇺🇿" },
    { code: "+58", country: "Venezuela", flag: "🇻🇪" },
    { code: "+84", country: "Vietnam", flag: "🇻🇳" },
    { code: "+260", country: "Zambia", flag: "🇿🇲" },
    { code: "+263", country: "Zimbabwe", flag: "🇿🇼" }
  ];

  // Sort countries alphabetically by full country name
  const sortedCountryCodes = [...countryCodes].sort((a, b) => a.country.localeCompare(b.country));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Only allow numbers for phone field
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleCountryCodeChange = (value: string) => {
    setFormData(prev => ({ ...prev, countryCode: value }));
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.flightNumber.trim()) newErrors.flightNumber = "Flight number is required";
    if (!formData.fromDestination.trim()) newErrors.fromDestination = "Origin destination is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.arrivalTime) newErrors.arrivalTime = "Arrival time is required";
    if (!formData.destination.trim()) newErrors.destination = "Destination is required";
    if (!formData.selectedContact) newErrors.selectedContact = "Please select a contact method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMessage = () => {
    // Format arrival time to include AM/PM
    const formatTime = (timeString: string) => {
      if (!timeString) return timeString;
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    };

    return `Hello Trek & Drive Team,

I would like to book an airport pickup service.
Please find my complete booking details below:

👤 PERSONAL INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phone}

✈️ FLIGHT DETAILS:
Flight Number: ${formData.flightNumber}
From: ${formData.fromDestination}
To: Kigali International Airport

🚗 PICKUP DETAILS:
Pickup Date: ${formData.pickupDate}
Arrival Time: ${formatTime(formData.arrivalTime)}
Destination: ${formData.destination}

Please confirm:
1. Airport pickup service availability for the requested date and time
2. Total cost for the airport pickup service
3. Estimated travel time to destination
4. Driver contact information
5. Meeting point at the airport

Thank you for your service!`;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const message = buildMessage();
    console.log('Message:', message);
    
    switch (formData.selectedContact) {
      case "whatsapp":
        const whatsappUrl = `https://wa.me/250788322882?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        break;
        
      case "instagram":
        try {
          await navigator.clipboard.writeText(message);
          window.open('https://ig.me/m/trek_and_drive', '_blank');
          setTimeout(() => {
            alert('Message copied to clipboard! Paste it in the Instagram DM that just opened.');
          }, 500);
        } catch (err) {
          alert(`Please copy this message and send it to @trek_and_drive on Instagram:\n\n${message}`);
          window.open('https://instagram.com/trek_and_drive', '_blank');
        }
        break;
        
      case "email":
        const subject = `Airport Pickup Request - ${formData.name}`;
        const body = message;
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
                    <div className="flex gap-2 mt-1">
                      <Select value={formData.countryCode} onValueChange={handleCountryCodeChange}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sortedCountryCodes.map((country) => (
                            <SelectItem key={`${country.country}-${country.code}`} value={country.code}>
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.country} ({country.code})</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`flex-1 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Flight Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-trekGray-800 flex items-center gap-2">
                    <Plane className="h-5 w-5 text-trekGreen-600" />
                    Flight Details
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="flightNumber" className="text-sm font-medium">Flight Number </Label>
                      <Input
                        id="flightNumber"
                        name="flightNumber"
                        type="text"
                        value={formData.flightNumber}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.flightNumber ? 'border-red-500' : ''}`}
                        placeholder="e.g., WB123"
                      />
                      {errors.flightNumber && <p className="text-red-500 text-xs mt-1">{errors.flightNumber}</p>}
                    </div>
                    
                    <div className="flex items-end">
                      <div className="text-center w-full">
                        <span className="text-sm font-medium text-trekGray-600"></span>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="fromDestination" className="text-sm font-medium">From </Label>
                      <Input
                        id="fromDestination"
                        name="fromDestination"
                        type="text"
                        value={formData.fromDestination}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.fromDestination ? 'border-red-500' : ''}`}
                        placeholder="e.g., Nairobi"
                      />
                      {errors.fromDestination && <p className="text-red-500 text-xs mt-1">{errors.fromDestination}</p>}
                    </div>
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
                      <Input
                        id="arrivalTime"
                        name="arrivalTime"
                        type="time"
                        value={formData.arrivalTime}
                        onChange={handleInputChange}
                        className={`mt-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 ${errors.arrivalTime ? 'border-red-500' : ''}`}
                        step="300"
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#d1d5db #f3f4f6'
                        }}
                      />
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
                      placeholder="Enter hotel name or destination address"
                      rows={3}
                    />
                    {errors.destination && <p className="text-red-500 text-xs mt-1">{errors.destination}</p>}
                    <p className="text-xs text-gray-500 mt-1">
                      Please provide the hotel name or complete address where you want to be dropped off.
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
