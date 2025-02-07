// app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        
        {/* Company Story */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, We have been committed to providing the highest quality products
              to our customers. Our journey began with a simple idea: to create a shopping
              experience that combines quality, affordability, and exceptional service.
            </p>
            <p className="text-gray-600">
              Today, we continue to grow and expand our offerings while maintaining our
              commitment to customer satisfaction and product excellence.
            </p>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/about-image.jpg"
              alt="Our Story"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Quality</h3>
            <p className="text-gray-600">We never compromise on the quality of our products.</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-gray-600">Constantly evolving to meet customer needs.</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Integrity</h3>
            <p className="text-gray-600">Honest and transparent in all our dealings.</p>
          </div>
        </div>
      </div>
    </div>
  );
}