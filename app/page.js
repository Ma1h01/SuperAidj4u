import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      {/* Background GIF with overlay */}
      {/* <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-50/90 z-10" />
        <Image
          src="/background.gif"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div> */}

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100">
          <div className="text-center space-y-8">
            {/* Logo and Title */}
            <div className="flex justify-center">
              {/* <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-lg"> */}
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="object-cover"
                />
              {/* </div> */}
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                SuperAidj4u
              </h1>
              <p className="text-xl md:text-2xl text-gray-600">
                Innovate your e-commerce orders and inventory management
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl">
                    📊
                  </div>
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">Smart Analytics</h3>
                <p className="text-gray-600 text-sm">Real-time insights and data-driven decisions</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl">
                    📦
                  </div>
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">Inventory Control</h3>
                <p className="text-gray-600 text-sm">Efficient stock management and tracking</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-2xl">
                    🚚
                  </div>
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">Order Management</h3>
                <p className="text-gray-600 text-sm">Streamlined order processing and fulfillment</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Link
                href="/home/dashboard"
                className="inline-block px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-900/25 text-lg font-semibold"
              >
                Get Started
              </Link>
              <p className="text-gray-500 text-sm">
                Join thousands of businesses already using SuperAidj4u
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
