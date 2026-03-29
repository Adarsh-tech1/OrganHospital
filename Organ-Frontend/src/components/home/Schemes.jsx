import { HiBuildingLibrary, HiSignal } from "react-icons/hi2";
import { GiHospital } from "react-icons/gi";

function Schemes() {
  const schemes = [
    {
      title: "NOTTO",
      subtitle: "National Organ & Tissue Transplant Organisation",
      description:
        "Government regulatory body ensuring transparent and equitable organ distribution across India",
      icon: HiBuildingLibrary,
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "Ayushman Bharat",
      subtitle: "Healthcare Support Program",
      description:
        "Provides financial assistance up to ₹5 lakh for BPL families for transplant surgeries",
      icon: GiHospital,
      color: "from-orange-600 to-orange-400",
    },
    {
      title: "OrganIndia",
      subtitle: "NGO for Awareness",
      description:
        "Nation-wide campaign promoting organ donation and creating awareness among masses",
      icon: HiSignal,
      color: "from-green-600 to-green-400",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-900 min-h-[500px] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Government Initiatives
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Supporting organ donation through policies and programs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schemes.map((scheme, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${scheme.color} p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 min-h-[300px] flex flex-col justify-between`}
            >
              <div>
                <div className="mb-4">
                  <scheme.icon className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {scheme.title}
                </h3>
                <p className="text-white font-semibold mb-3">
                  {scheme.subtitle}
                </p>
                <p className="text-white text-sm leading-relaxed">
                  {scheme.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schemes;
