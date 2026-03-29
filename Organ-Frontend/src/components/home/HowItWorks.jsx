import { HiCheckCircle, HiSparkles } from "react-icons/hi2";
import { MdAppRegistration, MdSmartToy } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Register",
      description: "Sign up and create your donor profile securely",
      icon: MdAppRegistration,
    },
    {
      number: "2",
      title: "Add Details",
      description: "Provide your medical and organ information",
      icon: AiOutlineDatabase,
    },
    {
      number: "3",
      title: "AI Matching",
      description: "Our AI finds perfect recipient matches",
      icon: MdSmartToy,
    },
    {
      number: "4",
      title: "Verification",
      description: "Doctors verify compatibility and health",
      icon: HiCheckCircle,
    },
    {
      number: "5",
      title: "Save Life",
      description: "Your organ gives someone a second chance",
      icon: HiSparkles,
    },
  ];

  return (
    <div className="py-16 px-6 bg-white min-h-[500px] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          A simple 5-step process to make a life-changing difference
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-2">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <div className="text-center">
                  <step.icon className="w-9 h-9 text-white mx-auto" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[40%] h-1 bg-gradient-to-r from-blue-500 to-blue-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
