"use client";
import Footer from "@/app/components/Footer/Footer";
import Nav from "@/app/components/LandingPage-New/nav";
import { useState } from "react";
import { toast } from "sonner";
import RazorpayCheckout from "../PaymentButton";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    college: "",
    referralName: "NA",
    source: "",
    subject: "",
    paymentMethod: "",
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const saveMetaData = async (screenshotUrl: string) => {
    const paymentid = localStorage.getItem("paymentId");
    const payload = {
      ...formData,
      screenshot: screenshotUrl,
      paymentid,
    };
    try {
      const res = await fetch("/api/gwjenrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        toast.error(data.error || "Failed to submit form");
        throw new Error(data.error || "Failed to submit form");
      }
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        college: "",
        referralName: "NA",
        source: "",
        subject: "",
        paymentMethod: "",
      });
      setScreenshot(null);
      localStorage.removeItem("paymentId");
      // everything is ok til now
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit form");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (screenshot) {
      setLoading(true);
      try {
        const res = await fetch("/api/gwjenrollment/uploadScreenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileType: screenshot.type }),
        });
        const signedData = await res.json();
        if (!res.ok || !signedData.success) {
          throw new Error(
            signedData.error || "Failed to get upload credentials"
          );
        }
        const uploadFormData = new FormData();
        uploadFormData.append("file", screenshot);
        uploadFormData.append("api_key", signedData.api_key);
        uploadFormData.append("timestamp", signedData.timestamp);
        uploadFormData.append("signature", signedData.signature);
        uploadFormData.append("folder", signedData.folder);
        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${signedData.cloud_name}/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error?.message || "Upload failed");
        }
        // Now call handleSubmit
        await saveMetaData(uploadData.secure_url);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error);
          toast.error(error.message || "Failed to upload image");
        } else {
          console.log("Unexpected error:", error);
          toast.error("Failed to upload image");
        }
      } finally {
        setLoading(false);
      }
    } else {
      alert("upload image");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-4 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 mt-5 pt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Registration Form
          </h2>

          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              aria-required="true"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Mail ID</label>
            <input
              type="email"
              name="email"
              aria-required="true"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              aria-required="true"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-gray-700 mb-1">WhatsApp Number</label>
            <input
              type="tel"
              name="whatsapp"
              aria-required="true"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your WhatsApp number"
            />
          </div>

          {/* College / Company */}
          <div>
            <label className="block text-gray-700 mb-1">
              College / University / School Name (or Company if pass-out)
            </label>
            <input
              type="text"
              name="college"
              aria-required="true"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your college or company name"
              required
            />
          </div>

          {/* Where did you find this */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">
              Where did you find this?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Our Website",
                "LinkedIn",
                "Instagram",
                "YouTube",
                "Referral",
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="source"
                    value={option}
                    aria-required="true"
                    checked={formData.source === option}
                    onChange={handleChange}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            {formData.source === "Referral" && (
              <div className="mt-3">
                <label className="block text-gray-700 mb-1">
                  Name of the referred person
                </label>
                <input
                  aria-required="true"
                  type="text"
                  name="referralName"
                  value={formData.referralName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter referral name (or NA)"
                />
              </div>
            )}
          </div>

          {/* Choose Subject */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">
              Choose your subject:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  sub: "Trending Course (TCS NQT, Infosys, Cognizant, Capgemini, DSA for service based companies)",
                  name: "Trending Course",
                },
                {
                  sub: "Aptitude (Quantitative Aptitude, Logical Reasoning, Verbal, DI, Visual Reasoning)",
                  name: "Aptitude",
                },
                {
                  sub: "Crack on Campus Placement (Deloitte NLA, Accenture, Wipro WILP, Mindtree & many more)",
                  name: "Crack on campus placement",
                },
                {
                  sub: "Interview Preparation (TCS Interview Preparation, Wipro, HCL, PayPal)",
                  name: "Interview Preparation",
                },
                {
                  sub: "Core Subjects (SQL, Operating System, Data Analysis, Computer Network)",
                  name: "Core Subjects",
                },
                {
                  sub: "Management Subjects (Build your personal brand, Brand Management, HR, Marketing)",
                  name: "Management Subjects",
                },
                {
                  sub: "Crack Product - Based Companies (Crack MAANG, FMCG & MBB Companies)",
                  name: "Crack Product - Based Companies",
                },
              ].map((subject, i) => (
                <label
                  key={i}
                  className="flex items-start space-x-2 border p-2 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    aria-required="true"
                    name="subject"
                    value={subject.name}
                    checked={formData.subject === subject.name}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <span>
                    <span className="font-semibold">{subject.name}</span>:{" "}
                    {subject.sub}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {localStorage.getItem("paymentId") === null && (
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <div>
                <RazorpayCheckout
                  amount={1999}
                  description="Jobgenix Premium"
                  loading={loading}
                  setLoading={setLoading}
                  onSuccess={(d) => {
                    console.log(d);
                    localStorage.setItem("paymentId", d.paymentdetails);
                    alert(
                      "Payment successful, please upload the payment screenshot"
                    );
                  }}
                  onFailure={(e) => {
                    alert("Payment failed");
                  }}
                />
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="relative border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  aria-required="true"
                  className="absolute top-3 left-3"
                  checked={formData.paymentMethod === "bank"}
                  onChange={handleChange}
                />
                <img src="/gwj/bank_details.png" alt="img" />
                <p className="mt-2 text-xs text-gray-600 text-center">
                  Bank transfer (Contact: 9830981268 for any emergency)
                </p>
              </label>

              <label className="relative border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  aria-required="true"
                  value="qr"
                  className="absolute top-3 left-3"
                  checked={formData.paymentMethod === "qr"}
                  onChange={handleChange}
                />
                <img src="/gwj/scanner.jpg" alt="img" />

                <p className="mt-2 text-xs text-gray-600 text-center">
                  UPI: hrithsaha841@oksbi (Contact: 9830981268 for emergency)
                </p>
              </label>

              <label className="relative border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  className="absolute top-3 left-3"
                  aria-required="true"
                  checked={formData.paymentMethod === "upi"}
                  onChange={handleChange}
                />
                <div className="text-center">
                  <p className="font-bold text-green-700">UPI PAYMENT</p>
                  <p className="mt-2 text-gray-700">
                    Use the following UPI ID to pay:
                  </p>
                  <p className="mt-2 px-3 py-2 bg-gray-100 rounded-md font-mono text-sm">
                    hrithsaha841@oksbi
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-600 text-center">
                  UPI ID (Contact: 9830981268 for emergency)
                </p>
              </label>
            </div> */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload your payment screenshot:{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  aria-required="true"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Preview */}
                {screenshot && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={URL.createObjectURL(screenshot)}
                      alt="Payment Screenshot Preview"
                      className="w-64 rounded-lg border shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
