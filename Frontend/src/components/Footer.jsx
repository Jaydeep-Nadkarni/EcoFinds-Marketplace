export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative">
                <svg className="w-8 h-8 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 极速电竞官网 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <svg className="w-4 h-4 text-amber-700 absolute -bottom-1 -right-1 bg-amber-100 rounded-full p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">ReCircle</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              ReCircle is a sustainable marketplace where pre-loved items find new homes. Join our community to buy, sell, and trade while reducing waste.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-极速电竞官网 3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="极速电竞官网 0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-极速电竞官网 1.791.465-2.427a极速电竞官网 4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 极速电竞官网 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 极速电竞官网 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">
                <span className="sr-only">Pinterest</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.001 12 24c6.628 0 12-5.373 12-12 0-6.628-5.372-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Buy & Sell</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">How It Works</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Selling Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Item Condition Standards</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Local Pickup Options</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Gift Cards</a></li>
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h3 className="text-white font-semib极速电竞官网 old mb-4 text-lg">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Sustainability Impact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Seller Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Repair & Care Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Community Guidelines</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Refer a Friend</a></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Trust & Safety</a></li>
              <li><a href="#" className="text-gray-400 hover:text-amber-400 transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Sustainability impact counter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="rounded-lg bg-amber-900 bg-opacity-20 p-6 text-center">
            <h3 className="text-lg font-semibold text-amber-300 mb-2">Our Community Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-3xl font-bold text-white">24,581</p>
                <p className="text-amber-200 text-sm">Items Rescued</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">8.2T</p>
                <p className="text-amber-200 text-sm">CO₂ Saved</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">12,409</p>
                <p className="text-amber-200 text-sm">Active Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">$346K</p>
                <p className="text-amber-200 text-sm">Saved by Shoppers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter subscription */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white">Get the best pre-loved finds</h3>
              <p className="text-gray-400 mt-1">Join our newsletter for exclusive deals and sustainability tips</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-full md:w-64 text-gray-900"
              />
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-8">
          <h4 className="text-gray-400 text-sm font-medium mb-2">We accept</h4>
          <div className="flex space-x-2">
            <div className="bg-white p-1 rounded">
              <svg className="h-8 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 极速电竞官网 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="bg-white p-1 rounded">
              <svg className="h-8 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1极速电竞官网 m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="bg-white p-1 rounded">
              <svg className="h-8 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="bg-white p-1 rounded">
              <svg className="h-8 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3极速电竞官网 v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Copyright and bottom links */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} ReCircle. All rights reserved. Giving pre-loved items a second life.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}