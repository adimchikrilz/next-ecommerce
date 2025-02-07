// app/contact/page.tsx
'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: 'your name...',
    email: 'your email...',
    message: 'what do you want to tell us?...'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have a question or feedback? We'd love to hear from you. Fill out the form
              and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Address</h3>
                <p className="text-gray-600">123 Store Street, City, Country</p>
              </div>
              <div>
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-gray-600">contact@yourstore.com</p>
              </div>
              <div>
                <h3 className="font-bold mb-1">Phone</h3>
                <p className="text-gray-600">+1 234 567 8900</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-2 border rounded-md"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-favmic text-white px-6 py-2 rounded-md hover:bg-opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}