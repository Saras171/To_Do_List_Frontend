"use client";

// Image component for optimized images 
import Image from "next/image";

// Framer Motion for animations
import { motion } from "framer-motion";

// Router hook from Next.js for client-side navigation
import { useRouter } from "next/navigation";
export default function Home() {
    const router = useRouter();

    /**
   * Handle "Get Started" button click
   * Navigates user to the login page
   */
      const handleClick = () => {
    router.push("/login"); //destination route
  };
  return (
    <main className="min-h-screen bg-[#F6F1EB] flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-10">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="overflow-hidden rounded-[100px] shadow-xl border-4 border-white w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center bg-white"
        >
          <Image
            src="/images/logo.jpeg"
            alt="Schedo Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Stylish horizontal line */}
        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-2/3 border-t-2 border-indigo-500 rounded-full"
        />

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl text-[#FF7043] font-[Kaushan_Script] tracking-wide mt-0.5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Schedo
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-2xl text-lg sm:text-xl text-gray-700 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Plan with purpose. Prioritize with clarity. Schedo is your daily companion to stay organized,
          reduce overwhelm, and feel accomplished — one elegant task at a time.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          
          <button 
         onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg mt-0.75 font-semibold shadow-md transition-all">
  Let’s Begin the Journey
</button>

        </motion.div>
      </div>
    </main>
  );
}

