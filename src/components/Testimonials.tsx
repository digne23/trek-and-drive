
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
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it—hear from some of our satisfied customers!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-trekOrange text-lg">★</span>
                  ))}
                </div>
                <p className="text-trekGray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="bg-trekGreen-200 text-trekGreen-700 h-10 w-10 rounded-full flex items-center justify-center font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-trekGray-900">{testimonial.author}</p>
                    <p className="text-sm text-trekGray-600">{testimonial.title}</p>
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
