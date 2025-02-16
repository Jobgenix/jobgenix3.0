import Link from "next/link"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Instagram, Linkedin, Facebook, Send, DiscIcon as Discord, Twitter, Youtube } from "lucide-react"

export  function Footer() {
  return (
    <footer className="w-full">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left Section */}
        <div className="bg-slate-800 text-white p-8 lg:p-12">
          <div className="max-w-md">
            <Image src="/images/Jobgenix.png" alt="Jobgenix Logo" width={150} height={40} className="mb-4" />
            <p className="text-gray-300 mb-8">Built with ❤️ in India for the world</p>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-4">Stay Connected</h3>
                <div className="space-y-2">
                  <p className="font-medium">Sales Inquiries</p>
                  <Link href="mailto:careers@jobgenix.co.in" className="text-gray-300 flex items-center gap-2">
                    <Mail size={16} />
                    careers@jobgenix.co.in
                  </Link>
                  <Link href="tel:+918420641071" className="text-gray-300 flex items-center gap-2">
                    <Phone size={16} />
                    +91-8420641071
                  </Link>
                </div>

                <div className="mt-4">
                  <p className="font-medium">Support Inquiries</p>
                  <Link href="mailto:support@jobgenix.co.in" className="text-gray-300 flex items-center gap-2">
                    <Mail size={16} />
                    support@jobgenix.co.in
                  </Link>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <Link href="https://instagram.com" className="text-[#E1B067] hover:opacity-80">
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="https://linkedin.com" className="text-[#E1B067] hover:opacity-80">
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="https://facebook.com" className="text-[#E1B067] hover:opacity-80">
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://telegram.org" className="text-[#E1B067] hover:opacity-80">
                  <Send size={24} />
                  <span className="sr-only">Telegram</span>
                </Link>
                <Link href="https://discord.com" className="text-[#E1B067] hover:opacity-80">
                  <Discord size={24} />
                  <span className="sr-only">Discord</span>
                </Link>
                <Link href="https://twitter.com" className="text-[#E1B067] hover:opacity-80">
                  <Twitter size={24} />
                  <span className="sr-only">X (Twitter)</span>
                </Link>
                <Link href="https://youtube.com" className="text-[#E1B067] hover:opacity-80">
                  <Youtube size={24} />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Stay Updated</h3>
                <p className="text-sm text-gray-300 mb-4">
                  We will send you updates on the latest opportunities to showcase your talent and get hired and rewarded
                  regularly.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Sign up for our newsletter"
                    className="flex-1 px-4 py-2 rounded bg-slate-700 text-white"
                  />
                  <button className="bg-amber-500 text-white px-4 py-2 rounded">→</button>
                </div>
              </div>

              <div className="flex gap-2 flex-col lg:flex-row">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded text-sm">Share Your Story Now</button>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded text-sm">Publish Opportunity</button>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Download JobGenix App</h3>
                <p className="text-gray-300">Coming Soon...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-emerald-600 text-white p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Our Solutions</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#">Hiring Made Easy</Link>
                </li>
                <li>
                  <Link href="#">Engagement</Link>
                </li>
                <li>
                  <Link href="#">Assessment</Link>
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-8 mb-4">Our Resource</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#">Pathway for a Data Analyst</Link>
                </li>
                <li>
                  <Link href="#">DSA to Development Journey</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Participate</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#">Competitions & Challenges</Link>
                </li>
                <li>
                  <Link href="#">Assessments</Link>
                </li>
                <li>
                  <Link href="#">Hackathons</Link>
                </li>
                <li>
                  <Link href="#">Workshops & Webinars</Link>
                </li>
                <li>
                  <Link href="#">Conferences</Link>
                </li>
                <li>
                  <Link href="#">College Festivals</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Learn</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#">Courses</Link>
                </li>
                <li>
                  <Link href="#">Articles</Link>
                </li>
                <li>
                  <Link href="#">Workshops</Link>
                </li>
              </ul>

              <h3 className="font-semibold text-lg mt-8 mb-4">Past Year Papers</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#">Capgemini 2024 Papers</Link>
                </li>
                <li>
                  <Link href="#">RRB ALP 2023 Papers</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm justify-center md:justify-start">
              <Link href="#" className="hover:underline">
                About Us
              </Link>
              <Link href="#" className="hover:underline">
                Contact Us
              </Link>
              <Link href="#" className="hover:underline">
                Careers
              </Link>
              <Link
                href="/careers"
                className="px-2 py-1 bg-emerald-500 rounded-full text-xs hover:bg-emerald-400 transition-colors"
              >
                We are hiring
              </Link>
              <Link href="#" className="hover:underline">
                Life at Jobgenix
              </Link>
              <Link href="#" className="hover:underline">
                Partner With Us
              </Link>
              <Link href="#" className="hover:underline">
                Partners
              </Link>
              <Link href="#" className="hover:underline">
                FAQs
              </Link>
              <Link href="#" className="hover:underline">
                Testimonials
              </Link>
              <Link href="#" className="hover:underline">
                Case Studies
              </Link>
              <Link href="#" className="hover:underline">
                Refer & Earn
              </Link>
              <Link href="#" className="hover:underline">
                Jobgenix Campus Ambassador Program
              </Link>
              <Link href="#" className="hover:underline">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:underline">
                Request a Feature
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 text-gray-400 text-sm p-4 text-center">
        Best Viewed in Latest Versions of Edge, Mozilla, Chrome, Opera & Safari. V: 12.5.2024.0.38
      </div>
    </footer>
  )
}