import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-trekGreen-100 via-trekGreen-200 to-trekGreen-300 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-trekGreen-100/80 via-trekGreen-200/80 to-trekGreen-300/80"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-8">
              <img 
                src="/logo.png" 
                alt="Trek & Drive Logo" 
                className="h-20 w-20 mr-6 drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-4xl md:text-5xl font-bold drop-shadow-sm">
                About <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>
              </h1>
            </div>
            <p className="text-xl text-trekGray-800 max-w-3xl mx-auto font-medium">
              Making every journey effortless with reliable car rental services across Rwanda
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-padding">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                <div className="flex items-center mb-8">
                  <img 
                    src="/logo.png" 
                    alt="Trek & Drive Logo" 
                    className="h-12 w-12 mr-4"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <h2 className="text-3xl font-bold m-0">
                    <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>
                  </h2>
                </div>
                
                <p className="text-lg text-trekGray-700 mb-6 leading-relaxed">
                  At <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>, we make every journey effortless. For the past five years, we've been one of Rwanda's most reliable car rental companies serving clients in Kigali and across the country with dependable vehicles and outstanding service.
                </p>

                <p className="text-lg text-trekGray-700 mb-6 leading-relaxed">
                  We rent cars for every need whether you want the freedom of a solo drive or the comfort of a professional chauffeur. Our diverse fleet includes compact city cars, SUVs, 4x4s, and executive rides, all fully maintained, insured, and ready for your next trip.
                </p>

                <p className="text-lg text-trekGray-700 mb-8 leading-relaxed">
                  At <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>, we value consistency, honesty, and convenience. From quick airport pickups to long-distance adventures, we're committed to keeping your journey smooth, safe, and memorable.
                </p>

                <div className="text-center">
                  <p className="text-xl font-semibold mb-2">
                    Go smooth, Go further, Go with
                  </p>
                  <div className="flex items-center justify-center">
                    <img 
                      src="/logo.png" 
                      alt="Trek & Drive Logo" 
                      className="h-8 w-8 mr-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="text-xl font-bold">
                      <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-trekGray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-trekGray-900">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-trekGreen-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">C</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-trekGray-900">Consistency</h3>
                <p className="text-trekGray-600">Reliable service every time, everywhere</p>
              </div>
              <div className="text-center">
                <div className="bg-trekGreen-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">H</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-trekGray-900">Honesty</h3>
                <p className="text-trekGray-600">Transparent pricing and honest communication</p>
              </div>
              <div className="text-center">
                <div className="bg-trekGreen-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">C</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-trekGray-900">Convenience</h3>
                <p className="text-trekGray-600">Easy booking and flexible rental options</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default About;