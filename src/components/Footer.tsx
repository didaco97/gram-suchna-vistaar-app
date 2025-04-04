
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t bg-white py-8">
      <div className="app-container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gramsuchna-green">ग्राम सूचना (Gram Suchna)</h3>
            <p className="text-sm text-gray-600">
              Providing rural citizens with easy access to government schemes, programs, and local news.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/agriculture" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  Agriculture
                </Link>
              </li>
              <li>
                <Link to="/healthcare" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  Local News
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-gramsuchna-green">Email:</span>
                <a href="mailto:contact@gramsuchna.gov.in" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  contact@gramsuchna.gov.in
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gramsuchna-green">Phone:</span>
                <a href="tel:1800-XXX-XXX" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  1800-XXX-XXX (Toll Free)
                </a>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-gramsuchna-green">Helpline:</span>
                <a href="tel:1800-XXX-XXX" className="text-sm text-gray-600 hover:text-gramsuchna-green">
                  1800-XXX-XXX
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} ग्राम सूचना (Gram Suchna). All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gramsuchna-green">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gramsuchna-green">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gramsuchna-green">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
