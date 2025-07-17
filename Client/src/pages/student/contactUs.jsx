import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thanks for reaching out to Edvana!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl max-w-6xl w-full grid md:grid-cols-2 gap-8 p-8">
        
        {/* Left Side */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-4">Contact Edvana</h2>
          <p className="text-gray-600 mb-6">
            Got a question, suggestion, or just want to say hi? We'd love to hear from you. Reach out and our team will get back to you as soon as possible.
          </p>
          <div className="text-gray-700 space-y-2">
            <p><strong>Email:</strong> support@Edvana.com</p>
            <p><strong>Phone:</strong> +91 8780214675</p>
            <p><strong>Location:</strong> Gujarat, Vadodara , India</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Send us a message</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
