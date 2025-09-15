import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import portfolioData from "../portfolioData";

const Hero: React.FC = () => {
  const { hero } = portfolioData;
  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform mouse position to tilt values with constraints
  const tiltX = useTransform(mouseX, [-500, 500], [10, -10]);
  const tiltY = useTransform(mouseY, [-300, 300], [-10, 10]);

  // Transform mouse position to 3D object movement values
  const objectX = useTransform(mouseX, [-500, 500], [50, -50]);
  const objectY = useTransform(mouseY, [-300, 300], [50, -50]);

  // Add spring physics for smooth movement
  const springObjectX = useSpring(objectX, { stiffness: 50, damping: 30 });
  const springObjectY = useSpring(objectY, { stiffness: 50, damping: 30 });
  const springTiltX = useSpring(tiltX, { stiffness: 400, damping: 40 });
  const springTiltY = useSpring(tiltY, { stiffness: 400, damping: 40 });

  useEffect(() => {
    // Animation effect when component mounts
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Update motion values
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="flex flex-col items-center mt-12 justify-center h-[calc(100vh-5rem)] px-4 overflow-hidden">
      {/* Main Heading with tilt effect */}
      <motion.h1
        id="hero-heading"
        className="text-5xl md:text-7xl font-bold text-center mb-4 opacity-0 translate-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        style={{
          rotateX: springTiltY,
          rotateY: springTiltX,
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {hero.mainHeading}
      </motion.h1>

      {/* Subheading with tilt effect */}
      <motion.p
        id="hero-subheading"
        className="text-xl text-gray-500 text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{
          rotateX: springTiltY,
          rotateY: springTiltX,
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {hero.subHeading}
      </motion.p>

      {/* 3D Object with parallax effect */}
      <motion.div
        id="hero-3d-object"
        className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-200 to-white shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(200, 200, 200, 0.4))",
          boxShadow:
            "0 10px 50px rgba(0, 0, 0, 0.1), inset 0 -10px 50px rgba(0, 0, 0, 0.1)",
          x: springObjectX,
          y: springObjectY,
          rotateX: springTiltY.get() * 0.5,
          rotateY: springTiltX.get() * 0.5,
        }}
      />
    </div>
  );
};

export default Hero;
