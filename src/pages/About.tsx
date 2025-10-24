import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-trekGreen-100 via-trekGreen-200 to-trekGreen-300 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-trekGreen-100/80 via-trekGreen-200/80 to-trekGreen-300/80"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8">
              <img 
                src="/logo.png" 
                alt="Trek & Drive Logo" 
                className="h-16 w-16 sm:h-20 sm:w-20 mb-4 sm:mb-0 sm:mr-6 drop-shadow-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-sm">
                About <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>
              </h1>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-trekGray-800 max-w-4xl mx-auto font-medium px-4">
              Making every journey effortless with reliable car rental services across Rwanda
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container-padding">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 sm:mb-8">
                  <img 
                    src="/logo.png" 
                    alt="Trek & Drive Logo" 
                    className="h-10 w-10 sm:h-12 sm:w-12 mb-3 sm:mb-0 sm:mr-4"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <h2 className="text-2xl sm:text-3xl font-bold m-0 text-center sm:text-left">
                    <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>
                  </h2>
                </div>
                
                <p className="text-base sm:text-lg text-trekGray-700 mb-4 sm:mb-6 leading-relaxed">
                  At <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>, we make every journey effortless. For the past five years, we've been one of Rwanda's most reliable car rental companies serving clients in Kigali and across the country with dependable vehicles and outstanding service.
                </p>

                <p className="text-base sm:text-lg text-trekGray-700 mb-4 sm:mb-6 leading-relaxed">
                  We rent cars for every need whether you want the freedom of a solo drive or the comfort of a professional chauffeur. Our diverse fleet includes compact city cars, SUVs, 4x4s, and executive rides, all fully maintained, insured, and ready for your next trip.
                </p>

                <p className="text-base sm:text-lg text-trekGray-700 mb-6 sm:mb-8 leading-relaxed">
                  At <span className="text-trekGreen-600">Trek</span><span className="text-trekGray-900">&</span><span className="text-trekGreen-600">Drive</span>, we value consistency, honesty, and convenience. From quick airport pickups to long-distance adventures, we're committed to keeping your journey smooth, safe, and memorable.
                </p>

                <div className="text-center mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-trekGreen-200">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-trekGreen-400 to-trekGreen-500 blur-xl opacity-20 rounded-full"></div>
                    <p className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 tracking-tight leading-tight">
                      <span className="bg-gradient-to-r from-trekGreen-600 via-trekGreen-500 to-trekGreen-600 bg-clip-text text-transparent italic">
                        Go smooth, Go further,
                      </span>
                      <br />
                      <span className="text-trekGray-800 italic">Go with</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <img
                      src="/logo.png"
                      alt="Trek & Drive Logo"
                      className="h-8 w-8 sm:h-10 sm:w-10 mr-3 drop-shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
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
      <section className="bg-trekGray-100 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-trekGray-900">
              Our Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="bg-trekGreen-500 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white text-xl sm:text-2xl font-bold">C</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-trekGray-900">Consistency</h3>
                <p className="text-sm sm:text-base text-trekGray-600">Reliable service every time, everywhere</p>
              </div>
              <div className="text-center">
                <div className="bg-trekGreen-500 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white text-xl sm:text-2xl font-bold">H</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-trekGray-900">Honesty</h3>
                <p className="text-sm sm:text-base text-trekGray-600">Transparent pricing and honest communication</p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="bg-trekGreen-500 rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-white text-xl sm:text-2xl font-bold">C</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-trekGray-900">Convenience</h3>
                <p className="text-sm sm:text-base text-trekGray-600">Easy booking and flexible rental options</p>
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