import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Clock, User, Mail, Phone, Check } from "lucide-react";

const pricingTiers = [
  { hours: 1, pricePerHour: 15000, total: 15000, label: "1 Hour" },
  { hours: 2, pricePerHour: 10000, total: 20000, label: "2 Hours" },
  { hours: 3, pricePerHour: 10000, total: 30000, label: "3 Hours" },
  { hours: 4, pricePerHour: null, total: 40000, label: "4+ Hours", isFlat: true },
];

const PayPerHour = () => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+250",
    phone: "",
    date: "",
    time: "",
    endTime: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split("T")[0];

  const countryCodes = [
    { code: "+250", country: "Rwanda", flag: "\u{1F1F7}\u{1F1FC}" },
    { code: "+254", country: "Kenya", flag: "\u{1F1F0}\u{1F1EA}" },
    { code: "+256", country: "Uganda", flag: "\u{1F1FA}\u{1F1EC}" },
    { code: "+255", country: "Tanzania", flag: "\u{1F1F9}\u{1F1FF}" },
    { code: "+243", country: "DRC", flag: "\u{1F1E8}\u{1F1E9}" },
    { code: "+1", country: "USA", flag: "\u{1F1FA}\u{1F1F8}" },
    { code: "+44", country: "UK", flag: "\u{1F1EC}\u{1F1E7}" },
    { code: "+33", country: "France", flag: "\u{1F1EB}\u{1F1F7}" },
  ];

  const calcEndTime = (startTime: string, hours: number) => {
    const [h, m] = startTime.split(":").map(Number);
    const endH = (h + hours) % 24;
    return `${String(endH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      // Auto-fill end time when start time changes and a tier is selected
      if (field === "time" && selectedTier !== null && value) {
        next.endTime = calcEndTime(value, pricingTiers[selectedTier].hours);
      }
      return next;
    });
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (selectedTier === null) newErrors.tier = "Please select a package";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const tier = pricingTiers[selectedTier!];
    let phone = formData.phone;
    if (formData.countryCode === "+250" && phone.startsWith("0")) {
      phone = phone.slice(1);
    }
    const message =
      `Hello Trek&Drive! I'd like to book a Pay Per Hour rental.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.countryCode} ${phone}\n` +
      (formData.email ? `*Email:* ${formData.email}\n` : "") +
      `*Package:* ${tier.label} - ${tier.total.toLocaleString()} RWF\n` +
      `*Date:* ${formData.date}\n` +
      `*Start Time:* ${formData.time}\n` +
      `*End Time:* ${formData.endTime}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/250788322882?text=${encoded}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-trekGreen-600 via-trekGreen-500 to-trekGreen-700 text-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Flexible Hourly Rentals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Pay Per Hour
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Need a car for just a few hours? Choose from our affordable hourly packages and only pay for the time you need.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 bg-trekGray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-trekGray-900 mb-4">
            Choose Your Package
          </h2>
          <p className="text-center text-trekGray-600 mb-10 max-w-xl mx-auto">
            Select the duration that works best for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedTier(index);
                  if (formData.time) {
                    setFormData((prev) => ({
                      ...prev,
                      endTime: calcEndTime(prev.time, pricingTiers[index].hours),
                    }));
                  }
                  if (errors.tier) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.tier;
                      return next;
                    });
                  }
                }}
                className={`relative rounded-2xl p-6 text-left transition-all duration-200 border-2 ${
                  selectedTier === index
                    ? "border-trekGreen-500 bg-white shadow-lg scale-[1.02]"
                    : "border-trekGray-200 bg-white hover:border-trekGreen-300 hover:shadow-md"
                }`}
              >
                {selectedTier === index && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-trekGreen-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-sm font-medium text-trekGreen-600 mb-1">
                  {tier.label}
                </div>
                <div className="text-3xl font-bold text-trekGray-900 mb-1">
                  {tier.total.toLocaleString()}
                  <span className="text-base font-normal text-trekGray-500"> RWF</span>
                </div>
                {tier.isFlat ? (
                  <p className="text-sm text-trekGray-500">Flat rate for 4 hours or more</p>
                ) : (
                  <p className="text-sm text-trekGray-500">
                    {tier.pricePerHour!.toLocaleString()} RWF/hour
                  </p>
                )}
                <p className="text-xs text-trekGreen-600 font-medium mt-2">Only in Kigali</p>
              </button>
            ))}
          </div>
          {errors.tier && (
            <p className="text-red-500 text-sm text-center mt-3">{errors.tier}</p>
          )}
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-trekGray-900 mb-8">
              Book Your Ride
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-trekGray-700 font-medium">
                  <User className="w-4 h-4" /> Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-trekGray-700 font-medium">
                  <Mail className="w-4 h-4" /> Email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-trekGray-700 font-medium">
                  <Phone className="w-4 h-4" /> Phone Number *
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(val) => handleInputChange("countryCode", val)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((c) => (
                        <SelectItem key={c.code + c.country} value={c.code}>
                          {c.flag} {c.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Phone number"
                    className={`flex-1 ${errors.phone ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Date */}
              <div>
                <Label htmlFor="date" className="flex items-center gap-2 mb-2 text-trekGray-700 font-medium">
                  <Clock className="w-4 h-4" /> Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={today}
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className={errors.date ? "border-red-500" : ""}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* Start Time & End Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time" className="flex items-center gap-2 mb-2 text-trekGray-700 font-medium">
                    <Clock className="w-4 h-4" /> Start Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className={errors.time ? "border-red-500" : ""}
                  />
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                </div>
                <div>
                  <Label htmlFor="endTime" className="flex items-center gap-2 mb-2 text-trekGray-700 font-medium">
                    <Clock className="w-4 h-4" /> End Time *
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className={errors.endTime ? "border-red-500" : ""}
                  />
                  {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                </div>
              </div>


              {/* Submit */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-trekGreen-500 hover:bg-trekGreen-600 text-white py-6 text-lg font-semibold"
              >
                Book via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PayPerHour;
