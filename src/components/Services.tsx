'use client';

import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: "Manual Testing",
      description: "Our expert QA engineers perform thorough manual testing to ensure your application meets the highest quality standards. We cover functional testing, usability testing, and exploratory testing.",
      features: [
        "Functional Testing",
        "UI/UX Testing",
        "Cross-browser Testing",
        "Mobile App Testing",
        "Regression Testing",
        "User Acceptance Testing"
      ],
      icon: "🎯"
    },
    {
      title: "Test Automation",
      description: "We implement efficient test automation solutions to speed up your testing process while maintaining high accuracy. Our automation frameworks are scalable and maintainable.",
      features: [
        "Selenium WebDriver",
        "Cypress",
        "Playwright",
        "API Testing",
        "CI/CD Integration",
        "Custom Framework Development"
      ],
      icon: "⚡"
    },
    {
      title: "Workflow Automation",
      description: "Streamline your business processes with n8n, the leading low-code automation platform. Connect your applications and automate repetitive tasks to boost productivity.",
      features: [
        "400+ App Integrations",
        "Custom Workflows",
        "Real-time Triggers",
        "Data Processing",
        "AI-powered Automation",
        "Technical Support"
      ],
      icon: "🔄"
    },
    {
      title: "QA Consulting",
      description: "Get strategic guidance to optimize your testing processes and methodologies. Our experts help you implement best practices and improve your QA strategy.",
      features: [
        "Process Optimization",
        "QA Strategy",
        "Team Training",
        "Tool Selection",
        "Best Practices",
        "Quality Metrics"
      ],
      icon: "💡"
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[10%] top-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute right-[10%] bottom-0 -z-10 h-[1000px] w-[1000px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            <span className="text-white">Our</span>{' '}
            <span className="gradient-text">Services</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            We offer comprehensive QA solutions tailored to your needs. Our services ensure your software meets the highest quality standards while optimizing your testing processes.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid gap-8 md:grid-cols-2"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="card group"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl">
                    {service.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-zinc-400 mb-8">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <h4 className="text-sm font-semibold text-white mb-4">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-zinc-400"
                      >
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 