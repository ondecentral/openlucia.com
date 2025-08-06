import Image from "next/image";
import FingerprintDashboardImage from "@/public/images/fingerprint-dashboard-1.png";

export default function FingerprintDashboardExample() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Lucia Fingerprint Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how our AI-powered attribution system identifies and tracks visitors.
          </p>
        </div>
        <div className="relative">
          <Image 
            src={FingerprintDashboardImage} 
            alt="Fingerprint Dashboard Example" 
            className="w-full h-auto rounded-lg shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
