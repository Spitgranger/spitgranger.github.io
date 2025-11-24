import {useState} from 'react';
import {FiMenu, FiMoon, FiSun, FiX} from 'react-icons/fi';
import {motion} from 'framer-motion';
import useThemeSwitcher from "../hooks/useDarkMode.ts";

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [activeTheme, setTheme] = useThemeSwitcher();

    function toggleMenu() {
        if (!showMenu) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    }

    function scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setShowMenu(false);
    }

    return (
        <motion.nav
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            id="nav"
            className="container sm:mx-auto"
        >
            <div
                className="z-10 max-w-screen-lg xl:max-w-screen-2xl block sm:flex sm:justify-between sm:items-center py-3">
                {/* Header menu links and small screen hamburger menu */}
                <div className="flex justify-between items-center px-4 sm:px-0">
                    <div>
                        <h1 className="text-6xl font-bold text-primary-dark dark:text-primary-light">
                            Richard
                        </h1>
                    </div>

                    {/* Theme switcher small screen */}
                    <div
                        onClick={() => setTheme(activeTheme)}
                        aria-label="Theme Switcher"
                        className="block sm:hidden ml-0 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
                    >
                        {activeTheme === 'dark' ? (
                            <FiMoon
                                className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl"/>
                        ) : (
                            <FiSun className="text-gray-200 hover:text-gray-50 text-xl"/>
                        )}
                    </div>

                    {/* Small screen hamburger menu */}
                    <div className="sm:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="focus:outline-none"
                            aria-label="Hamburger Menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-7 w-7 fill-current text-secondary-dark dark:text-ternary-light"
                            >
                                {showMenu ? (
                                    <FiX className="text-3xl"/>
                                ) : (
                                    <FiMenu className="text-3xl"/>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Header links small screen */}
                <div
                    className={
                        showMenu
                            ? 'block m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none sm:hidden'
                            : 'hidden'
                    }
                >
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-400 sm:mx-4 mb-2 sm:py-2 cursor-pointer transition-colors"
                        aria-label="Projects"
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-400 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark cursor-pointer transition-colors"
                        aria-label="About Me"
                    >
                        About Me
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-400 sm:mx-4 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark cursor-pointer transition-colors"
                        aria-label="Contact"
                    >
                        Contact
                    </button>
                    <div
                        className="border-t-2 pt-3 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark">
                        <a
                            href="https://github.com/Spitgranger"
                            target="_blank"
                            className="font-general-medium sm:hidden block text-left text-md bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-sm px-4 py-2 mt-2 duration-300"
                            aria-label="Github Button"
                        >
                            My Github!
                        </a>
                    </div>
                </div>

                {/* Header links large screen */}
                <div
                    className="font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-400 sm:mx-4 mb-2 sm:py-2 cursor-pointer transition-colors"
                        aria-label="Projects"
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-400 sm:mx-4 mb-2 sm:py-2 cursor-pointer transition-colors"
                        aria-label="About Me"
                    >
                        About Me
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-indigo-600 dark:hover:text-indigo-400 sm:mx-4 mb-2 sm:py-2 cursor-pointer transition-colors"
                        aria-label="Contact"
                    >
                        Contact
                    </button>
                </div>

                {/* Header right section buttons */}
                <div className="hidden sm:flex justify-between items-center flex-col md:flex-row">
                    <div className="hidden md:flex">
                        <a
                            href="https://github.com/Spitgranger"
                            target="_blank"
                            className="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
                            aria-label="Github Button"
                        >
                            My Github!
                        </a>
                    </div>

                    {/* Theme switcher large screen */}
                    <div
                        onClick={() => setTheme(activeTheme)}
                        aria-label="Theme Switcher"
                        className="ml-8 bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
                    >
                        {activeTheme === 'dark' ? (
                            <FiMoon
                                className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl"/>
                        ) : (
                            <FiSun className="text-gray-200 hover:text-gray-50 text-xl"/>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

export default Header;
