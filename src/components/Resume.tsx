// src/pages/Resume.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, ZoomIn, ZoomOut, ArrowLeft } from "lucide-react";
import ProfessionalBackground from "../components/ProfessionalBackground";
import { Phone, Mail, Linkedin } from "lucide-react";
import portfolioData from "../portfolioData";

const Resume: React.FC = () => {
  const { resume } = portfolioData;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const resumeWidth = 794;
      const resumeHeight = 1123;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const scaleX = (viewportWidth * 0.8) / resumeWidth;
      const scaleY = (viewportHeight * 0.9) / resumeHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resume.pdf;
    link.download = resume.pdf.split("/").pop() || "resume.pdf";
    link.click();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="h-screen flex relative overflow-hidden bg-slate-100">
      {/* 🔹 Background (with blur applied directly) */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          // style={{ filter: "blur(3px) brightness(1.1)" }}
        >
          <ProfessionalBackground />
        </div>
      </div>

      {/* Resume Container (no blur) */}
      <div className="flex-1 flex items-center justify-center relative z-10 p-4 ">
        <motion.div
          className="relative bg-white shadow-2xl"
          style={{
            width: "794px",
            // height: "1123px",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            padding: "40px",
            borderRadius: "8px",
          }}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: scale, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Resume Content */}
          <header className="flex justify-between border-b-2 border-gray-300 pb-2 mb-5">
            <div>
              <h1 className="text-2xl font-bold">{resume.name}</h1>
              <p className="text-lg text-gray-700">{resume.title}</p>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-black" />
                {resume.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-black" />
                <a href={`mailto:${resume.email}`} className="hover:underline">
                  {resume.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Linkedin size={16} className="text-black" />
                <a
                  href={resume.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {resume.linkedin.replace("https://", "")}
                </a>
              </p>
            </div>
          </header>
          {/* Summary */}
          <section className="text-center mb-5">
            <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
              SUMMARY
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Full Stack Developer (1.5+ years) specializing in the MERN and
              Laravel stacks. Skilled in building scalable REST APIs and dynamic
              React UIs, with full project lifecycle experience from Figma
              design to AWS deployment.
            </p>
          </section>

          {/* Two Column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              {/* Skills */}
              <section className="mb-5">
                <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
                  SKILLS
                </h2>
                <ul className="text-sm text-gray-700 leading-relaxed">
                  <li>
                    <b>Languages and Frameworks:</b> React.js, JavaScript (ES6),
                    PHP, Node.js, Express.js, Laravel, Vue.js
                  </li>
                  <li>
                    <b>Front-End Tools:</b> HTML5, CSS3, Bootstrap, Figma
                  </li>
                  <li>
                    <b>Back-End Technologies:</b> REST API, Laravel, Node.js,
                    Express.js
                  </li>
                  <li>
                    <b>Databases:</b> MySQL, MongoDB
                  </li>
                  <li>
                    <b>Tools and Platforms:</b> Git, GitHub, Bitbucket, Postman,
                    Hoppscotch, Jira, Confluence
                  </li>
                </ul>
              </section>

              {/* Professional Experience */}
              <section className="mb-5">
                <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <h3 className="font-semibold text-sm">
                  Full Stack Developer – Betasquirrel Innovation Labs Pvt. Ltd.
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  Jan 2023 – Jul 2024
                </p>
                <ul className="text-sm text-gray-700 leading-relaxed">
                  <li>REST API Development with PHP/Laravel</li>
                  <li>API Development using Node.js</li>
                  <li>Implement Different API to React JS</li>
                  <li>UX Designing and Prototyping with Figma</li>
                  <li>UI Design and Development</li>
                  <li>Responsive Designing</li>
                  <li>Git Branching and Pull Request Review</li>
                  <li>Workflow</li>
                  <li>Relational Database Design</li>
                  <li>API Documentation using Postman</li>
                  <li>Code Formatting and Standardization using Prettier</li>
                </ul>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
                  EDUCATION
                </h2>
                <p className="font-semibold">Diploma in Computer Engineering</p>
                <p className="text-xs text-gray-500">
                  State Board Of Technical Education Kerala · 2021 – 2023
                </p>
                <p className="mt-2 font-semibold">Higher Secondary</p>
                <p className="text-xs text-gray-500">
                  AMMRGHSS Nalloornad, Wayanad · 2016 – 2018
                </p>
              </section>
            </div>

            {/* Right Column */}
            <div>
              {/* Freelance Experience */}
              <section className="mb-5">
                <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
                  FREELANCE EXPERIENCE
                </h2>

                <div className="mb-3">
                  <p className="font-semibold">Full Stack Developer</p>
                  <p className="text-xs text-gray-500">
                    BETASQUIRREL CRM Project — 2023
                  </p>
                  <ul className="text-sm text-gray-700 leading-relaxed">
                    <li>
                      Designed and developed CRM features with React.js for
                      frontend and Node.js backend.
                    </li>
                    <li>
                      Built reusable React components with state management.
                    </li>
                    <li>
                      Developed secure login, lead management, and dashboard
                      views.
                    </li>
                    <li>Integrated APIs and managed database with MySQL.</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <p className="font-semibold">
                    SOCIAL CONNECT – Social Media Platform
                  </p>
                  <ul className="text-sm text-gray-700 leading-relaxed">
                    <li>
                      Developed a social media platform to help users find
                      project teammates based on skill and mindset alignment.
                    </li>
                    <li>
                      Enabled users to post challenges or join others in team or
                      individual competitions based on their talents.
                    </li>
                    <li>
                      Built scalable API architecture and real-time features
                      like team invites, challenge feed, and profile matching.
                    </li>
                    <li>
                      Deployed the full application on AWS for high availability
                      and scalability.
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">
                    TECSHIFT – Event Management System
                  </p>
                  <p className="text-xs text-gray-500">
                    Technologies: Laravel, JavaScript, MySQL, Livewire, Postman,
                    Bitbucket
                  </p>
                  <ul className="text-sm text-gray-700 leading-relaxed">
                    <li>
                      Developed admin tools for registration approval, QR
                      check-ins, and attendance tracking.
                    </li>
                    <li>
                      Integrated automated email and printable QR code
                      generation.
                    </li>
                    <li>
                      Created a dynamic event dashboard and participant reports.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">
                  LANGUAGES
                </h2>
                <ul className="text-sm text-gray-700 leading-relaxed">
                  <li>Malayalam: Native/Fluent</li>
                  <li>English: Proficient</li>
                  <li>Tamil: Basic Communication</li>
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <button
          onClick={handleBack}
          className="bg-slate-700 text-white p-3 rounded-full shadow"
        >
          <ArrowLeft size={22} />
        </button>
        <button
          onClick={() => setScale(scale + 0.1)}
          className="bg-white shadow p-3 rounded-full"
        >
          <ZoomIn size={22} />
        </button>
        <button
          onClick={() => setScale(scale - 0.1)}
          className="bg-white shadow p-3 rounded-full"
        >
          <ZoomOut size={22} />
        </button>
        <button
          onClick={handleDownload}
          className="bg-slate-700 text-white p-3 rounded-full shadow"
        >
          <Download size={22} />
        </button>
      </div>
    </div>
  );
};

export default Resume;
