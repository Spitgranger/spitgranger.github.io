import {motion} from "framer-motion";

function About() {
  return (
      <motion.section className="flex flex-col sm:justify-between items-center sm:flex-row mt-12 md-mt-2">
        <div className="w-full md:w-1/3 text-left">
          <motion.h1
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.2,
              }}
              className="font-general-semibold text-2xl lg:text-3xl xl:test-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase"
          >
            Hey Its Richard!
          </motion.h1>
          <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.2,
              }}
              className="font-general-medium mt-4 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-left leading-normal text-gray-500 dark:text-gray-200"

          >
            I'm a 4th year student at McMaster University studying software engineering.
          </motion.p>
        </div>
      </motion.section>
  )
}

export default About;