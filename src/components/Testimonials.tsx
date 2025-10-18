
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    content: "Trek&Drive made our family road trip so easy. The SUV was spotless and perfect for our adventure through the mountains.",
    author: "Sarah Johnson",
    title: "Family Traveler"
  },
  {
    id: 2,
    content: "As a business traveler, I appreciate their efficiency and the quality of vehicles. Always reliable and professional service.",
    author: "Michael Chen",
    title: "Business Executive"
  },
  {
    id: 3,
    content: "The camping package with the 4x4 was exactly what we needed for our off-road exploration. Will definitely rent again!",
    author: "Emma & David",
    title: "Adventure Seekers"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-trekGray-900">What Our Customers Say</h2>
          <p className="text-base sm:text-lg lg:text-xl text-trekGray-700 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
            Don't just take our word for it—hear from some of our satisfied customers!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg hover:shadow-xl transition-shadow h-full">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-trekOrange text-base sm:text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-trekGray-700 mb-4 sm:mb-6 italic flex-1 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="bg-trekGreen-200 text-trekGreen-700 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                    {testimonial.author[0]}
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="font-semibold text-sm sm:text-base text-trekGray-900">{testimonial.author}</p>
                    <p className="text-xs sm:text-sm text-trekGray-600">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
