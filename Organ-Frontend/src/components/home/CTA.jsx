import { useNavigate } from "react-router-dom";
import { HiHeart, HiShieldCheck, HiClock } from "react-icons/hi2";

function CTA() {
  const navigate = useNavigate();

  return (
    <div className="relative py-20 px-6 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 min-h-[500px] flex items-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <div className="mb-6 flex justify-center">
          <HiHeart className="w-20 h-20 text-white animate-pulse" />
        </div>
        <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
          Be Someone's Miracle
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed">
          Every donation can save up to 7 lives. Join thousands of donors who
          are making a real difference. Your generosity today could be someone's
          tomorrow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Card 1 */}
          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white border-opacity-50 h-full">
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-br from-red-500 to-pink-500 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HiHeart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                Save 7 Lives
              </h3>
              <p className="text-gray-600 text-lg">
                One organ donor can help up to 7 people live healthier, longer
                lives
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white border-opacity-50 h-full">
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HiClock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                Just 4 Minutes
              </h3>
              <p className="text-gray-600 text-lg">
                Quick and easy registration process takes less than 4 minutes
                online
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white border-opacity-50 h-full">
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <HiShieldCheck className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                100% Secure
              </h3>
              <p className="text-gray-600 text-lg">
                Your data is encrypted with military-grade security & privacy
                guaranteed
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            Register as Donor
          </button>
          <button
            onClick={() => navigate("/request-organ")}
            className="bg-blue-900 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-all duration-300 border-2 border-white transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            Request Organ
          </button>
        </div>
      </div>
    </div>
  );
}

export default CTA;
