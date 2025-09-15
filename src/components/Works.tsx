import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import portfolioData from "../portfolioData";

const Works: React.FC = () => {
  const { works } = portfolioData;
  return (
    <section className="py-20 px-6 bg-white" id="works">
      <div className="container mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Selected Work
        </motion.h2>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
