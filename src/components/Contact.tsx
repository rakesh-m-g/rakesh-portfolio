import React, { useState } from "react";
import portfolioData from "../portfolioData";

const Contact: React.FC = () => {
  const { contact } = portfolioData;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using a simple email submission approach
      // In production, you'd use a service like EmailJS, Formspree, or your own backend
      const subject = `Portfolio Contact - ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

      // Open email client with pre-filled data
      window.location.href = `mailto:${
        contact.email
      }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`;

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="py-24 px-6 bg-[#ECECEC] relative" id="contact">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            I’d love to hear from you. Whether it’s a project, collaboration, or
            just a friendly hello...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm p-3"
                placeholder="Full Name"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm p-3"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm p-3"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-gray-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus === "success" && (
              <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
                Message prepared! Opening your email client...
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                Failed to send message. Please try again.
              </div>
            )}
          </form>

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Email</h3>
              <p className="text-gray-600">{contact.email}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
              <p className="text-gray-600">{contact.phone}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Connect Online
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
              <p className="text-gray-600">Wayanad, Kerala, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
