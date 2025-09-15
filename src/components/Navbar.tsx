import React, { useState, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  const navControls = useAnimation();

  // Track scroll position and direction
  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      if (!isMounted) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top of the page
        navControls.start("visible").catch(() => {});
      } else {
        // Determine scroll direction
        const direction = currentScrollY > scrollY ? "down" : "up";

        if (direction !== scrollDirection) {
          setScrollDirection(direction);

          // Show/hide navbar based on scroll direction
          if (direction === "up") {
            navControls.start("visible").catch(() => {});
          } else if (direction === "down" && !isMenuOpen) {
            navControls.start("hidden").catch(() => {});
          }
        }
      }

      setScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, scrollDirection, navControls, isMenuOpen]);

  // Animation variants
  const navbarVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 w-full bg-white bg-opacity-95 shadow-sm"
      initial="visible"
      animate={navControls}
      variants={navbarVariants}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo512.png"
            alt="Rakesh M G Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-bold text-xl">Rakesh..</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/works"
            className="text-gray-800 hover:text-gray-600 transition-colors"
          >
            Work
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-gray-600 transition-colors"
          >
            About
          </Link>
          <Link
            to="/resume"
            className="text-gray-800 hover:text-gray-600 transition-colors"
          >
            Resume
          </Link>
        </div>

        {/* Contact Button with hover animation */}
        <div className="hidden md:block">
          <Link
            to="/contact"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.button
              className="bg-black text-white px-5 py-2 rounded-full relative"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-black opacity-100"
                whileHover={{
                  boxShadow: "0 0 15px 2px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
              />
              <span className="relative z-10">Contact</span>
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              to="/works"
              className="text-gray-800 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/resume"
              className="text-gray-800 hover:text-gray-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Resume
            </Link>
            <Link
              to="/contact"
              onClick={() => {
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <motion.button
                className="bg-black text-white px-5 py-2 rounded-full w-full mt-4 relative"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeInOut" },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-black opacity-100"
                  whileHover={{
                    boxShadow: "0 0 15px 2px rgba(0, 0, 0, 0.3)",
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                />
                <span className="relative z-10">Contact</span>
              </motion.button>
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
