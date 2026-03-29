import { HiSparkles } from "react-icons/hi2";
import { GiHeartOrgan } from "react-icons/gi";
import { FiTrendingUp } from "react-icons/fi";
import { MdHandshake } from "react-icons/md";

function Stats() {
  const stats = [
    {
      number: "20,000+",
      label: "Transplants (India)",
      icon: GiHeartOrgan,
      color: "from-blue-600 to-blue-400",
    },
    {
      number: "4.8L+",
      label: "Registered Donors",
      icon: MdHandshake,
      color: "from-green-600 to-green-400",
    },
    {
      number: "0.5%",
      label: "Current Donation Rate",
      icon: FiTrendingUp,
      color: "from-yellow-600 to-yellow-400",
    },
    {
      number: "4L+",
      label: "Lives Waiting",
      icon: HiSparkles,
      color: "from-red-600 to-red-400",
    },
  ];

  return (
    <div className="py-16 px-6 bg-gray-950 min-h-[400px] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Impact by Numbers
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Every number represents a real life and a hopeful future
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className="mb-4">
                <stat.icon className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-white font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;
