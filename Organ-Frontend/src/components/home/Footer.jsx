import { HiHeart, HiPhone, HiEnvelope, HiMapPin } from "react-icons/hi2";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* About Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HiHeart className="w-8 h-8 text-red-500" />
                <h3 className="text-2xl font-bold">OrganHub</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting donors with recipients to save lives through organ
                donation. Making a difference one life at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="/" className="hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/register" className="hover:text-white transition">
                    Become a Donor
                  </a>
                </li>
                <li>
                  <a
                    href="/request-organ"
                    className="hover:text-white transition"
                  >
                    Request Organ
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:text-white transition">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xl font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Medical Information
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-4">Contact Us</h4>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <HiPhone className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>1800-ORGAN-HELP</span>
                </div>
                <div className="flex items-start gap-2">
                  <HiEnvelope className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>help@organhub.in</span>
                </div>
                <div className="flex items-start gap-2">
                  <HiMapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-500" />
                  <span>Pan India Operations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700 my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              &copy; 2026 OrganHub. All rights reserved. | Saving Lives Together
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-400 p-3 rounded-full transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-blue-700 p-3 rounded-full transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-pink-500 p-3 rounded-full transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
