'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[url('/LandingPageImages/footerImg.png')] bg-cover bg-no-repeat bg-left md:bg-top text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="select-none h-[30vh]">Jobgenix</div>

        {/* Subscribe Section */}
        <div className="mt-20">
          <h3 className="text-lg font-semibold">Subscribe</h3>
          <p className="text-gray-400 text-xs">Join our community to receive updates.</p>
          <div className="flex justify-center mt-2 gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-64 text-black rounded-xl focus:outline-none"
            />
            <button className="bg-[#0073e6] px-4 py-2 rounded-xl">Subscribe</button>
          </div>
          <p className="text-gray-500 text-xs mt-2">By subscribing you agree to our Privacy Policy</p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left mt-8 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-400 space-y-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/opportunities?type=jobs">Explore Jobs</Link></li>
              <li><Link href="/comingSoon">Top Courses</Link></li>
              <li><Link href="/comingSoon">For Employers</Link></li>
              <li><Link href="/comingSoon">Mentorship</Link></li>
              <li><Link href="/comingSoon">Blog</Link></li>
              <li><Link href="/comingSoon">About Us</Link></li>
              <li><Link href="/comingSoon">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Popular Categories</h4>
            <ul className="text-gray-400 space-y-1">
              <li><Link href="/comingSoon">IT & Software</Link></li>
              <li><Link href="/comingSoon">Marketing & Sales</Link></li>
              <li><Link href="/comingSoon">Design & Creatives</Link></li>
              <li><Link href="/comingSoon">Business & Management</Link></li>
              <li><Link href="/comingSoon">Data Science & AI</Link></li>
              <li><Link href="/opportunities?type=internships">Internships</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="text-gray-400 space-y-1">
              <li><Link href="/comingSoon">Resume Builder</Link></li>
              <li><Link href="/comingSoon">Career Guides</Link></li>
              <li><Link href="/comingSoon">Interview Tips</Link></li>
              <li><Link href="/comingSoon">Success Stories</Link></li>
              <li><Link href="/comingSoon">FAQs</Link></li>
              <li><Link href="/comingSoon">Support Centre</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Legal</h4>
            <ul className="text-gray-400 space-y-1">
              <li><Link href="/comingSoon">Terms & Conditions</Link></li>
              <li><Link href="/comingSoon">Privacy Policy</Link></li>
              <li><Link href="/comingSoon">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Logo and Socials */}
        <div className="flex justify-between items-center mt-20">
          <Image src="/LandingPageImages/logoDark.svg" alt="Logo" height={100} width={100} />
          <div className="flex justify-center space-x-4">
            <a target="_blank" href="https://www.instagram.com/jobgenix.unbeatable/" rel="noopener noreferrer">
              <FaFacebookF className="text-gray-400 cursor-pointer hover:text-white" />
            </a>
            <a target="_blank" href="https://www.instagram.com/jobgenix.unbeatable/" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 cursor-pointer hover:text-white" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/company/successwithjobgenix/" rel="noopener noreferrer">
              <FaLinkedinIn className="text-gray-400 cursor-pointer hover:text-white" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t flex justify-between border-gray-700 mt-6 py-4 text-xs text-gray-500">
          <p>Made with 🩷 for dreamers</p>
          <p>© 2025 JobGenix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
