import { useState } from "react";

function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      {/* Background Video OR Gradient */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={() => setVideoError(true)}
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video/organ.mp4" type="video/mp4" />
        </video>
      )}

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-blue-900/40 to-black/50"></div>

      {/* Floating circles for visual effect */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
        <div className="mb-6 text-7xl animate-bounce">❤️</div>
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white leading-tight drop-shadow-lg">
          One Donor Can Save Lives
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mb-2 drop-shadow-md">
          Join India's mission to save up to 8 lives through organ donation.
        </p>
        <p className="text-lg text-blue-200 max-w-xl mb-10 drop-shadow-md">
          Be someone's miracle today.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
            Become a Donor
          </button>

          <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
            Request Organ
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Hero;
