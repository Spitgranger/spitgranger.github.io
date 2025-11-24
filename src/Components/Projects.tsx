import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

function Projects() {
    const projects: Project[] = [
        {
            title: "DroneStrobe",
            description: "Built ESP32-based drone communication system with custom two-way LoRa protocol achieving sub-75ms latency. Implemented FreeRTOS task scheduling, interrupt-driven serial handlers, and BLE GATT services for wireless control. Features include OTA firmware updates and persistent configuration storage using NVS flash.",
            technologies: ["C", "ESP32", "ESP-IDF", "FreeRTOS", "LoRa", "BLE"],
            githubUrl: "https://github.com/Spitgranger/DroneStrobe",
        },
        {
            title: "SyncMaster",
            description: "Rapidly prototyped serverless document management platform from concept to demo-ready build. Built REST API with AWS Lambda and API Gateway, integrating DynamoDB and S3 with JWT authentication via Cognito. Developed Next.js + React frontend with file browsing and real-time status tracking.",
            technologies: ["TypeScript", "Next.js", "React", "AWS Lambda", "API Gateway", "DynamoDB", "S3"],
            githubUrl: "https://github.com/Spitgranger/SyncMaster",
        },
        {
            title: "Bunkmate",
            description: "Full-stack roommate finder web app built with MERN stack. Implemented real-time chat using Redis Pub/Sub architecture and WebSockets, optimized to handle 100+ concurrent connections. Created JWT invalidation system using Redis TTL for secure authentication flows.",
            technologies: ["TypeScript", "React", "Redux", "Express", "MongoDB", "Redis", "GCP"],
            githubUrl: "https://github.com/Spitgranger/bunkmate",
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            id="projects"
            className="py-20 mt-20"
        >
            <div className="text-center mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.2 }}
                    className="text-3xl lg:text-4xl font-bold text-primary-dark dark:text-primary-light mb-4"
                >
                    My Projects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.3 }}
                    className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                >
                    Here are some of the projects I've worked on. Feel free to check them out!
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.2 + index * 0.1 }}
                        className="bg-secondary-light dark:bg-ternary-dark rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <h3 className="text-2xl font-bold text-primary-dark dark:text-primary-light mb-3">
                            {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                                <span
                                    key={techIndex}
                                    className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    aria-label="View on GitHub"
                                >
                                    <FiGithub className="text-xl" />
                                    <span className="text-sm font-medium">Code</span>
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    aria-label="View Live Demo"
                                >
                                    <FiExternalLink className="text-xl" />
                                    <span className="text-sm font-medium">Live</span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export default Projects;
