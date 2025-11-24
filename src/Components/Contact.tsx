import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

function Contact() {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            id="contact"
            className="py-20 mt-20"
        >
            <div className="text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.2 }}
                    className="text-3xl lg:text-4xl font-bold text-primary-dark dark:text-primary-light mb-8"
                >
                    Get In Touch
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.3 }}
                    className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
                >
                    Feel free to reach out to me through any of these platforms. I'm always open to discussing new projects, creative ideas, or opportunities.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.4 }}
                    className="flex justify-center gap-8 flex-wrap"
                >
                    <a
                        href="https://github.com/Spitgranger"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        aria-label="GitHub Profile"
                    >
                        <FiGithub className="text-2xl" />
                        <span className="font-medium">GitHub</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/richard-fan-mcmaster/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        aria-label="LinkedIn Profile"
                    >
                        <FiLinkedin className="text-2xl" />
                        <span className="font-medium">LinkedIn</span>
                    </a>
                    <a
                        href="mailto:fanr13@mcmaster.ca"
                        className="flex items-center gap-3 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        aria-label="Email"
                    >
                        <FiMail className="text-2xl" />
                        <span className="font-medium">Email</span>
                    </a>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Contact;
