import { motion } from "framer-motion";
//import { FiArrowDownCircle } from "react-icons/fi";
import useThemeSwitcher from "../hooks/useDarkMode.ts";
import developerLight from "../images/programming.svg";
import developerDark from "../images/developer-dark.svg";

function About() {
    const [activeTheme] = useThemeSwitcher();
    return (
        <motion.section className="flex flex-col sm:justify-between items-center sm:flex-row mt-12 md:mt-16 py-12">
            <div className="w-full md:w-1/3 text-left">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 1,
                        delay: 0.2,
                    }}
                    className="font-bold text-2xl lg:text-3xl xl:test-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
                >
                    Hey Its Richard!
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 1,
                        delay: 0.2,
                    }}
                    className="font-general-medium mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-left leading-normal text-gray-500 dark:text-gray-200"

                >
                    I'm a 4th year student at McMaster University studying software engineering.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        ease: 'easeInOut',
                        duration: 0.9,
                        delay: 0.3,
                    }}
                    className="flex justify-center sm:block"
                >
                    {/* <a
                        download="richard_fan_resume.pdf"
                        href="/files/richard_fan_resume.pdf"
                        className="font-general-medium flex justify-center items-center w-36 sm:w-48 mt-12 mb-6 sm:mb-0 text-lg border border-indigo-200 dark:border-ternary-dark py-2.5 sm:py-3 shadow-lg rounded-full bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:bg-indigo-500 text-gray-500 hover:text-white duration-500"
                        aria-label="Download Resume"
                    >
                        <FiArrowDownCircle
                            className="mr-2 sm:mr-3 h-5 w-5 sn:w-6 sm:h-6 duration-100"></FiArrowDownCircle>
                        <span className="text-sm sm:text-lg font-general-medium duration-100">
							My Resume
						</span>
                    </a> */}
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: -180 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
                className="sm:w-2/3 text-right float-right mt-8 sm:mt-0"
            >
                <img
                    src={
                        activeTheme === 'dark' ? developerLight : developerDark
                    }
                    alt="Developer Pic"
                    className="float-right"
                />
            </motion.div>
        </motion.section>
    )
}
export default About;