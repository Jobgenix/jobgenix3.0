'use client';

import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer
            className="  bg-[url('/images2/footerimg.png')] bg-cover bg-no-repeat bg-left  md:bg-top  text-white mt-24"
        >

            <div className="max-w-6xl mx-auto px-4 text-center ">

                <div className='select-none h-[30vh]'>Jobgenix</div>


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
                        <button className="bg-blue-500 px-4 py-2 rounded-xl">Subscribe</button>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">By subscribing you agree to our Privacy Policy</p>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left mt-8 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2">Quick Links</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li><a href="/comingSoon">Home</a></li>
                            <li><a href="/comingSoon">Explore Jobs</a></li>
                            <li><a href="/comingSoon">Top Courses</a></li>
                            <li><a href="/comingSoon">For Employers</a></li>
                            <li><a href="/comingSoon">Mentorship</a></li>
                            <li><a href="/comingSoon">Blog</a></li>
                            <li><a href="/comingSoon">About Us</a></li>
                            <li><a href="/comingSoon">Contact</a></li>

                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Popular Categories</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li><a href="/comingSoon">IT & Software</a></li>
                            <li><a href="/comingSoon">Marketing & Sales</a></li>
                            <li><a href="/comingSoon">Design & Creatives</a></li>
                            <li><a href="/comingSoon">Business & Management</a></li>
                            <li><a href="/comingSoon">Data Science & AI</a></li>
                            <li><a href="/comingSoon">Internships</a></li>

                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Resources</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li><a href="/comingSoon">Resume Builder</a></li>
                            <li><a href="/comingSoon">Career Guides</a></li>
                            <li><a href="/comingSoon">Interview Tips</a></li>
                            <li><a href="/comingSoon">Success Stories</a></li>
                            <li><a href="/comingSoon">FAQs</a></li>
                            <li><a href="/comingSoon">Support Centre</a></li>

                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Legal</h4>
                        <ul className="text-gray-400 space-y-1">
                            <li><a href="/comingSoon">Terms & Conditions</a></li>
                            <li><a href="/comingSoon">Privacy Policy</a></li>
                            <li><a href="/comingSoon">Cookie Policy</a></li>

                        </ul>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-20">
                    <img src="/LandingPageImages/logoDark.svg" alt="Logo" />
                    {/* Social Icons */}
                    <div className="flex justify-center space-x-4 ">
                        <a target='_blank' href="https://www.instagram.com/jobgenix.unbeatable/"><FaInstagram className="text-gray-400 cursor-pointer hover:text-white" /></a>
                        <a target='_blank' href="https://www.linkedin.com/company/successwithjobgenix/"><FaLinkedinIn className="text-gray-400 cursor-pointer hover:text-white" />   </a>


                    </div>

                </div>



                {/* Bottom Bar */}
                <div className="border-t flex justify-between border-gray-700 mt-6 py-4 text-xs text-gray-500">
                    <p>Made with ❤️ for dreamers</p>
                    <p>© 2025 JobGenix. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
