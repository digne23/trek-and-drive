import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    content: "One of the most reliable and trustworthy car rental company in Kigali",
    author: "Ndayisenga Thierry",
    title: "Google Review",
    rating: 5,
    googleReviewUrl: "https://www.google.com/search?q=trek+and+drive&rlz=1C1RLNS_enRW1044RW1044&oq=trek+and+drive&gs_lcrp=EgZjaHJvbWUyCggAEEUYFhgeGDkyCAgBEAAYFhgeMggIAhAAGBYYHjIICAMQABgWGB4yCAgEEAAYFhgeMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEJMTAyOTNqMGo3qAIIsAIB8QX9Uzkx4Ip2Kw&sourceid=chrome&ie=UTF-8#lrd=0x19dca7da8b448dd5:0x12013f7f5add66e1,1,,,,"
  },
  {
    id: 2,
    content: "I rented a Toyota RAV4 from Trek and Drive for a weekend trip. The car was spotless and performed perfectly. Highly recommended for anyone needing a dependable rental service",
    author: "Digne Sugira",
    title: "Google Review", 
    rating: 5,
    googleReviewUrl: "https://www.google.com/search?q=trek+and+drive&rlz=1C1RLNS_enRW1044RW1044&oq=trek+and+drive&gs_lcrp=EgZjaHJvbWUyCggAEEUYFhgeGDkyCAgBEAAYFhgeMggIAhAAGBYYHjIICAMQABgWGB4yCAgEEAAYFhgeMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEJMTAyOTNqMGo3qAIIsAIB8QX9Uzkx4Ip2Kw&sourceid=chrome&ie=UTF-8#lrd=0x19dca7da8b448dd5:0x12013f7f5add66e1,1,,,,"
  },
  {
    id: 3,
    content: "Excellent customer service",
    author: "Uwamahoro Emelyne",
    title: "Google Review",
    rating: 5,
    googleReviewUrl: "https://www.google.com/search?q=trek+and+drive&rlz=1C1RLNS_enRW1044RW1044&oq=trek+and+drive&gs_lcrp=EgZjaHJvbWUyCggAEEUYFhgeGDkyCAgBEAAYFhgeMggIAhAAGBYYHjIICAMQABgWGB4yCAgEEAAYFhgeMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEJMTAyOTNqMGo3qAIIsAIB8QX9Uzkx4Ip2Kw&sourceid=chrome&ie=UTF-8#lrd=0x19dca7da8b448dd5:0x12013f7f5add66e1,1,,,,"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-trekGray-900">What Our Customers Say</h2>
          <p className="text-base sm:text-lg lg:text-xl text-trekGray-700 mb-4 sm:mb-6 max-w-4xl mx-auto px-4">
            Don't just take our word for it—hear from some of our satisfied customers!
          </p>
          <a 
            href={testimonials[0].googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-trekGreen-600 font-medium hover:text-trekGreen-700 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm sm:text-base">Real Google Reviews - Click to read more</span>
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                <div className="mb-4 sm:mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-trekOrange text-base sm:text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-trekGray-700 mb-4 sm:mb-6 italic flex-1 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-trekGreen-200 text-trekGreen-700 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                      {testimonial.author[0]}
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <p className="font-semibold text-sm sm:text-base text-trekGray-900">{testimonial.author}</p>
                      <p className="text-xs sm:text-sm text-trekGray-600">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a 
                    href={testimonial.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-trekGreen-600 hover:text-trekGreen-700 text-sm font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Read on Google
                  </a>
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