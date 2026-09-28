import React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeInUpSlower } from 'config/animations'

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const reduce = useReducedMotion()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -8% 0px',
  })

  if (reduce) return <div>{children}</div>

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      variants={fadeInUpSlower}
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible
