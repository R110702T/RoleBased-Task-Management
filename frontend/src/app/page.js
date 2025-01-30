



"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaFacebook, FaWhatsapp, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Home() {
  const images = [
    "/dash1.jpg", // Zoom
    "/dash2.jpg", // Rotate
    "/dash4.jpg", // Slide
    "/dash5.jpg", // Blur & Slide
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // **Define Unique Animations for Each Image**
  const animations = [
    { // Image 1: Zoom In & Out
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1.1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    { // Image 2: Rotate
      initial: { opacity: 0, rotate: -90 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: 90 },
    },
    { // Image 3: Slide In
      initial: { opacity: 0, x: -200 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 200 },
    },
    { // Image 4: Blur & Slide
      initial: { opacity: 0, filter: "blur(10px)", x: -100 },
      animate: { opacity: 1, filter: "blur(0px)", x: 0 },
      exit: { opacity: 0, filter: "blur(10px)", x: 100 },
    },
  ];

  return (
    <div className="relative w-full h-screen bg-purple-900 text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Parent Div with Left and Right Sections */}
      <div className="w-11/12 max-w-6xl flex flex-col md:flex-row items-center justify-between">

        {/* Left Side - Animated Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-[80%] h-[400px] flex justify-center items-center">
            <AnimatePresence>
              <motion.div
                key={index}
                initial={animations[index].initial}
                animate={animations[index].animate}
                exit={animations[index].exit}
                transition={{ duration: 1 }}
                className="absolute w-full"
              >
                <Image
                  src={images[index]}
                  alt="Task Dashboard"
                  width={500}
                  height={350}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Static Content */}
        <div className="w-full md:w-1/2 text-center md:text-left px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Manage Tasks Efficiently 🚀
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg mb-6 text-white"
          >
            Track progress, set deadlines, and collaborate in real-time with our smart task management platform.
          </motion.p>

          <motion.div whileHover={{ scale: 1.1 }}>
            <a href="/signup" className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-sky-200 transition">
              Get Started
            </a>
          </motion.div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="w-full bg-white py-6 mt-6 flex justify-center">
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="w-10 h-10 text-blue-600 hover:text-blue-800 transition" />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="w-10 h-10 text-green-500 hover:text-green-700 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-10 h-10 text-blue-700 hover:text-blue-900 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-10 h-10 text-pink-600 hover:text-pink-800 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="w-10 h-10 text-blue-400 hover:text-blue-600 transition" />
          </a>
        </div>
      </div>

    </div>
  );
}

