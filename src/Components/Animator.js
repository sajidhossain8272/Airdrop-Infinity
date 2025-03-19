import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
export const FadeUp = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    {children}
  </motion.div>
);