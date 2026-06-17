import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4">About Apna Bazar</h3>
            <p className="text-sm mb-4">
              Your trusted online shopping destination for quality products at best prices.
            </p>
            <div className="flex gap-4">
              <Facebook size={20} className="hover:text-primary cursor-pointer" />
              <Twitter size={20} className="hover:text-primary cursor-pointer" />
              <Instagram size={20} className="hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-primary">Shop</a></li>
              <li><a href="/" className="hover:text-primary">About Us</a></li>
              <li><a href="/" className="hover:text-primary">Contact</a></li>
              <li><a href="/" className="hover:text-primary">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-primary">Help Center</a></li>
              <li><a href="/" className="hover:text-primary">Shipping Info</a></li>
              <li><a href="/" className="hover:text-primary">Returns</a></li>
              <li><a href="/" className="hover:text-primary">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>1-800-APNA-BAZAR</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@apnabazar.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-1" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Apna Bazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
