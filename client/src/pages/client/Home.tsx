import { motion } from 'framer-motion';
import { COURSE_CATEGORIES } from '../../constants/categories';
import { Button } from '../../components/common';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-client-bg text-white">
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 py-20 grid gap-12 lg:grid-cols-[1.1fr,0.9fr] items-center">
        <div>
          <p className="text-client-secondary text-sm uppercase tracking-[0.5em] mb-6">Premium Learning</p>
          <h1 className="text-5xl md:text-6xl font-heading leading-[1.05] mb-6">
            LearnSphere empowers creators to launch immersive academies.
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-2xl">
            A flagship LMS engineered for high-converting funnels, cinematic content delivery, and enterprise-grade analytics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Explore Courses</Button>
            <Button variant="outline">Watch Demo</Button>
          </div>
        </div>
        <motion.div
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-client-primary/30 to-client-secondary/20 p-8 shadow-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase text-xs tracking-[0.5em] text-white/70 mb-4">Live Metrics</p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Learners', value: '128K' },
              { label: 'Courses', value: '1.2K' },
              { label: 'Instructors', value: '640' },
              { label: 'Avg Rating', value: '4.9/5' },
            ].map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-white/60">{metric.label}</p>
                <p className="text-3xl font-heading">{metric.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading">Trending Categories</h2>
          <p className="text-white/60">Curated clusters with cinematic hover cards.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COURSE_CATEGORIES.map((category) => (
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              key={category.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <p className="text-xl font-heading">{category.label}</p>
              <p className="text-white/50">{category.courses} programs</p>
            </motion.div>
          ))}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4">
        <Footer />
      </div>
    </div>
  );
};
