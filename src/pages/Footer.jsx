 
import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Clock,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      // In a real app, you would submit to your API here
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <footer className="bg-zinc-900 text-zinc-100 py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="border-t border-zinc-800 pt-2 flex flex-col md:flex-row justify-between items-center"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Gym Info */}
          <div className="space-y-9">
            <h3 className="text-2xl font-bold tracking-tight mt-4">GYMSARTHI</h3>
            <p className="text-zinc-400 max-w-xs">
              Transforming lives through fitness since 2010. Join our community
              and achieve your fitness goals.
            </p>
            <div className="flex space-x-14">
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "Classes",
                "Membership",
                "Trainers",
                "Schedule",
                "About Us",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
                <span className="text-zinc-400">
                  123 Fitness Street, Gym City, GC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-zinc-400" />
                <span className="text-zinc-400">(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-zinc-400" />
                <span className="text-zinc-400">info@powerfitgym.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-zinc-400 mt-0.5" />
                <div className="text-zinc-400">
                  <p>Mon-Fri: 5:00 AM - 10:00 PM</p>
                  <p>Sat-Sun: 7:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-zinc-400">
              Subscribe to get special offers, free giveaways, and fitness tips.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="p-1 rounded-sm bg-zinc-800 border-zinc-700 text-black placeholder:text-zinc-500"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2  rounded-xl"
                disabled={isSubmitted}
              >
                {isSubmitted ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-800 my-3 pt-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} PowerFit Gym. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-zinc-500 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-zinc-500 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
