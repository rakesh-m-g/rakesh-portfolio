import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import portfolioData from "../portfolioData";

const About: React.FC = () => {
  const { about } = portfolioData;
  return (
    <section className="py-20 px-6 bg-white" id="about">
      <div className="container mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
          {/* Left column - Image */}
          <motion.div
            className="w-full md:w-2/5 mx-auto md:mx-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              className="w-full max-w-md mx-auto aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-lg"
              style={{
                backgroundImage: "url('/about.img.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                y: [0, -12, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Right column - Text content */}
          <motion.div
            className="w-full md:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h3 className="text-3xl font-bold mb-4">Who I Am</h3>
            <p className="text-gray-600 mb-6">{about.summary}</p>

            {/* Highlight points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-600">{about.experience}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-600">{about.workExperience}</div>
              </div>
            </div>

            {/* Call-to-action button */}
            <Link to="/resume" className="mt-8 inline-block">
              <motion.button
                className="bg-black text-white px-6 py-3 rounded-full"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="View my resume"
              >
                Resume
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* === Skills Section placed below About === */}
      {/* Skills Section */}
      <div className="container mx-auto mt-20" id="skills">
        {/* <motion.h3
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h3> */}

        {/* Floating Wave Animation */}
        <div className="flex flex-wrap justify-center gap-4 items-center">
          {/* Frontend Skills */}
          {about.skills.frontend.map((skill, index) => (
            <motion.div
              key={`frontend-${index}`}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2 + index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#e5e7eb",
                transition: { duration: 0.2 },
              }}
            >
              <span className="text-xl">{skill.icon}</span>
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}

          {/* Backend Skills */}
          {about.skills.backend.map((skill, index) => (
            <motion.div
              key={`backend-${index}`}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2.5 + index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index + 3) * 0.1,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#e5e7eb",
                transition: { duration: 0.2 },
              }}
            >
              <span className="text-xl">{skill.icon}</span>
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}

          {/* Database Skills */}
          {about.skills.database.map((skill, index) => (
            <motion.div
              key={`database-${index}`}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 2.2 + index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index + 6) * 0.1,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#e5e7eb",
                transition: { duration: 0.2 },
              }}
            >
              <span className="text-xl">{skill.icon}</span>
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}

          {/* Tools */}
          {about.skills.tools.map((skill, index) => (
            <motion.div
              key={`tools-${index}`}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, -9, 0] }}
              transition={{
                duration: 2.8 + index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index + 9) * 0.1,
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#e5e7eb",
                transition: { duration: 0.2 },
              }}
            >
              <span className="text-xl">{skill.icon}</span>
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
