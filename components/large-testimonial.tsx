import Image from "next/image";
import coinsub from "@/public/images/coinsub.jpg";
import Link from "@/components/tracked-link";

export default function LargeTestimonial() {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="space-y-3 text-center">
            <div className="relative inline-flex">
              <svg
                className="absolute -left-6 -top-2 -z-10"
                width={40}
                height={49}
                viewBox="0 0 40 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.7976 -0.000136375L39.9352 23.4746L33.4178 31.7234L13.7686 11.4275L22.7976 -0.000136375ZM9.34947 17.0206L26.4871 40.4953L19.9697 48.7441L0.320491 28.4482L9.34947 17.0206Z"
                  fill="#D1D5DB"
                />
              </svg>
              <Image
                className="rounded-full"
                src={coinsub}
                width={48}
                height={48}
                alt="Large testimonial"
              />
            </div>
            <p className="text-2xl font-bold text-stone-900">
              &quot;Lucia Protocol&apos;s ad attribution has given us{" "}
              <em className="italic text-stone-500">
                clear insights into our marketing performance
              </em>
              . It&apos;s a powerful tool that helps us optimize our ad spend
              and drive better results.&quot;
            </p>
            <div className="text-sm font-medium text-stone-500">
              <span className="text-stone-700">Jasper</span>{" "}
              <span className="text-stone-400">/</span>{" "}
              <Link
                className="text-orange-500"
                href="#0"
                aria-label="CTO at Coinsub"
              >
                CTO at Coinsub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
