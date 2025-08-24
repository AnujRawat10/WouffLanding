import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold lowercase mb-4">furs</h2>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Your trusted partner in pet care. We provide comprehensive services delivered with love for your furry
              family members.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lowercase">quick links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors lowercase">
                  services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors lowercase">
                  about us
                </a>
              </li>
              <li>
                <a href="#blogs" className="text-gray-300 hover:text-white transition-colors lowercase">
                  blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors lowercase">
                  contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 lowercase">contact info</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                (555) 123-4567
              </p>
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                hello@Wouff.com
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                123 Pet Street, Animal City
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
              <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/404" className="text-gray-300 hover:text-white transition-colors">
                404
              </a>
              <a href="/password" className="text-gray-300 hover:text-white transition-colors">
                Password
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-sm text-gray-300">
              <p className="mb-1">© 2025 Company name. All rights reserved.</p>
              <p className="text-xs">
                Created by <span className="text-white">Flouix</span> • Powered by{" "}
                <span className="text-white">Webflow</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
