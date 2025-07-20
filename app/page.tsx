'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Menu,
  X,
  Palette,
  ChevronDown,
  ArrowDown,
  Server,
  Database,
} from 'lucide-react';

// Types
type Theme = 'dark' | 'light' | 'cyberpunk' | 'corporate' | 'gradient';

interface Skill {
  name: string;
  category: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  featured: boolean;
}

// Data
const themes = [
  {
    name: 'Dark',
    value: 'dark' as Theme,
    description: 'Professional dark theme',
  },
  {
    name: 'Light Minimal',
    value: 'light' as Theme,
    description: 'Clean minimal light theme',
  },
  {
    name: 'Cyberpunk',
    value: 'cyberpunk' as Theme,
    description: 'Futuristic neon theme',
  },
  {
    name: 'Corporate',
    value: 'corporate' as Theme,
    description: 'Professional business theme',
  },
  {
    name: 'Gradient',
    value: 'gradient' as Theme,
    description: 'Colorful gradient theme',
  },
];

const skills: Skill[] = [
  { name: 'Node.js', category: 'Backend', level: 95 },
  { name: 'Python', category: 'Language', level: 90 },
  { name: 'MySQL', category: 'Database', level: 85 },
  { name: 'MongoDB', category: 'Database', level: 80 },
  { name: 'React', category: 'Frontend', level: 88 },
  { name: 'Next.js', category: 'Frontend', level: 85 },
  { name: 'TypeScript', category: 'Language', level: 92 },
  { name: 'Docker', category: 'DevOps', level: 75 },
  { name: 'Redis', category: 'Database', level: 80 },
  { name: 'REST APIs', category: 'API', level: 95 },
  { name: 'Flask', category: 'Backend', level: 95 },
];

const projects: Project[] = [
  {
    title: 'Hippocrates',
    description: 'A question bank to help medical students prepare for PLAB',
    tech: ['Python', 'Flask', 'React'],
    github: 'https://github.com/xilder/hippocrats',
    live: '#',
    featured: true,
  },
  {
    title: 'Microservices E-commerce API',
    description:
      'Scalable e-commerce backend with microservices architecture, event-driven communication, and comprehensive testing.',
    tech: ['Node.js', 'MongoDB', 'Redis'],
    github: 'https://github.com/xilder/datof',
    live: '#',
    featured: true,
  },
];

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:abel.fagbemi@med.uniben.edu' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/xilder' },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abel-fagbemi/',
  },
];

// Utility function
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Components
function Button({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  ...props
}: {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  [key: string]: any;
}) {
  const baseClasses =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';

  const variantClasses = {
    default: 'btn-primary',
    outline: 'btn-outline border',
    ghost: 'btn-ghost hover:bg-accent',
  };

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

function Card({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={cn('card-base rounded-lg border shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function Badge({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
  className?: string;
}) {
  const variantClasses = {
    default: 'badge-default',
    secondary: 'badge-secondary',
    outline: 'badge-outline border',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [typedText, setTypedText] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const fullText = 'Backend-Focused Fullstack Developer';

  // Load theme from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && themes.some((t) => t.value === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('portfolio-theme', theme);
    }
  }, [theme, mounted]);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document
      .getElementById(sectionId.replace('#', ''))
      ?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const currentTheme = themes.find((t) => t.value === theme);
  const skillCategories = [...new Set(skills.map((skill) => skill.category))];

  if (!mounted) {
    return (
      <div className='min-h-screen bg-slate-950 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-emerald-500'></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`theme-${theme} min-h-screen transition-colors duration-300`}
      >
        {/* Navigation */}
        <nav className='fixed top-0 w-full nav-bg backdrop-blur-md border-b nav-border z-50'>
          <div className='max-w-6xl mx-auto px-4 py-4'>
            <div className='flex justify-between items-center'>
              <a href='abelfagbemi.me'>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='text-xl font-bold nav-brand'
                >
                  {'<'}abelfagbemi.me{'/>'}
                </motion.div>
              </a>

              <div className='flex items-center space-x-4'>
                {/* Desktop Navigation */}
                <div className='hidden md:flex space-x-8'>
                  {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                      className='nav-link transition-colors duration-200'
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>

                {/* Theme Selector */}
                <div className='relative'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                    className='flex items-center space-x-2 theme-selector-button px-3 py-2 rounded-lg'
                  >
                    <Palette size={20} />
                    <span className='hidden sm:inline'>
                      {currentTheme?.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        themeMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </motion.button>

                  <AnimatePresence>
                    {themeMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className='absolute top-full right-0 mt-2 w-64 theme-selector-dropdown rounded-lg shadow-xl border'
                      >
                        <div className='p-2'>
                          {themes.map((themeOption) => (
                            <button
                              key={themeOption.value}
                              onClick={() => {
                                setTheme(themeOption.value);
                                setThemeMenuOpen(false);
                              }}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                theme === themeOption.value
                                  ? 'theme-selector-active'
                                  : 'theme-selector-item'
                              }`}
                            >
                              <div className='font-medium'>
                                {themeOption.name}
                              </div>
                              <div className='text-sm opacity-70'>
                                {themeOption.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Menu Button */}
                <button
                  className='md:hidden nav-link'
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className='md:hidden border-t nav-border mt-4 pt-4'
                >
                  {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                      className='block w-full text-left py-2 nav-link transition-colors duration-200'
                    >
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Hero Section */}
        <section className='hero-section relative min-h-screen flex items-center justify-center overflow-hidden'>
          <div className='hero-background absolute inset-0 z-0' />
          <div className='hero-overlay absolute inset-0 z-10' />

          {/* Floating Elements */}
          <div className='floating-elements absolute inset-0 z-20 pointer-events-none'>
            {['{', '}', '<', '>', '[', ']', '(', ')'].map((char, index) => (
              <motion.div
                key={index}
                className='floating-element absolute text-2xl font-bold opacity-30'
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                }}
                style={{
                  left: `${10 + (index % 4) * 20}%`,
                  top: `${20 + Math.floor(index / 4) * 30}%`,
                }}
              >
                {char}
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className='relative z-30 max-w-6xl mx-auto px-4 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className='hero-greeting text-lg'
              >
                Hello, I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className='hero-name text-5xl md:text-8xl font-bold py-10'
              >
                Abel Fagbemi
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className='hero-title text-xl md:text-3xl mb-8 h-12'
              >
                {typedText}
                <span className='animate-pulse hero-cursor'>|</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className='hero-description text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed'
              >
                Crafting robust backend systems and scalable architectures.
                Passionate about clean code, performance optimization, and
                building solutions that power the digital world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className='flex flex-col sm:flex-row gap-4 justify-center'
              >
                <Button size='lg' onClick={() => scrollToSection('#contact')}>
                  <Mail className='mr-2 h-5 w-5' />
                  Get In Touch
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  onClick={() => window.open('https://github.com', '_blank')}
                >
                  <Github className='mr-2 h-5 w-5' />
                  View GitHub
                </Button>
              </motion.div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              onClick={() => scrollToSection('#about')}
              className='absolute bottom-8 left-1/2 transform -translate-x-1/2 hero-scroll-indicator'
            >
              <ArrowDown className='animate-bounce' size={24} />
            </motion.button>
          </div>
        </section>

        {/* About Section */}
        <section id='about' className='py-20 px-4 about-section'>
          <div className='max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='section-title text-4xl font-bold mb-4'>
                <span className='section-title-accent'>About</span> Me
              </h2>
            </motion.div>

            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='space-y-6'
              >
                <p className='about-text text-lg leading-relaxed'>
                  I'm a passionate fullstack developer with a strong focus on
                  backend development. I love architecting scalable systems,
                  optimizing database performance, and building APIs that can
                  handle millions of requests.
                </p>
                <p className='about-text text-lg leading-relaxed'>
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open source projects, or sharing
                  knowledge with the developer community.
                </p>

                <div className='grid grid-cols-3 gap-6'>
                  {[
                    { icon: Code, value: '1+', label: 'Years Experience' },
                    { icon: Server, value: '5+', label: 'Projects Completed' },
                    { icon: Database, value: '10+', label: 'Technologies' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className='text-center'
                    >
                      <div className='stat-icon mx-auto mb-2'>
                        <stat.icon size={24} />
                      </div>
                      <div className='stat-value text-2xl font-bold'>
                        {stat.value}
                      </div>
                      <div className='stat-label text-sm'>{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className='relative'
              >
                <div className='about-visual w-80 h-80 mx-auto rounded-full flex items-center justify-center'>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'linear',
                    }}
                    className='about-visual-inner w-64 h-64 rounded-full flex items-center justify-center'
                  >
                    <Code className='about-visual-icon' size={96} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id='skills' className='py-20 px-4 skills-section'>
          <div className='max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='section-title text-4xl font-bold mb-4'>
                <span className='section-title-accent'>Technical</span> Skills
              </h2>
            </motion.div>

            <div className='space-y-12'>
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h3 className='skills-category-title text-xl font-semibold mb-6'>
                    {category}
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className='skill-card p-4 rounded-lg'
                        >
                          <div className='flex justify-between items-center mb-2'>
                            <span className='skill-name font-medium'>
                              {skill.name}
                            </span>
                            <Badge variant='secondary'>{skill.level}%</Badge>
                          </div>
                          <div className='skill-progress-bg w-full h-2 rounded-full'>
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className='skill-progress-fill h-full rounded-full'
                            />
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id='projects' className='py-20 px-4 projects-section'>
          <div className='max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='section-title text-4xl font-bold mb-4'>
                <span className='section-title-accent'>Featured</span> Projects
              </h2>
            </motion.div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={project.featured ? 'lg:col-span-2' : ''}
                >
                  <Card className='project-card h-full group'>
                    <div className='p-6'>
                      <div className='flex justify-between items-start mb-4'>
                        <h3 className='project-title text-xl font-semibold group-hover:text-accent transition-colors'>
                          {project.title}
                        </h3>
                        {project.featured && <Badge>Featured</Badge>}
                      </div>

                      <p className='project-description mb-4'>
                        {project.description}
                      </p>

                      <div className='flex flex-wrap gap-2 mb-6'>
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant='outline'>
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className='flex space-x-4'>
                        <a href={project.github} target='_blank'>
                          <Button variant='ghost' size='sm'>
                            <Github className='mr-2 h-4 w-4' />
                            Code
                          </Button>
                        </a>
                        {/* <Button variant='ghost' size='sm'>
                          <ExternalLink className='mr-2 h-4 w-4' />
                          Live Demo
                        </Button> */}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-20 px-4 contact-section'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className='section-title text-4xl font-bold mb-8'>
                <span className='section-title-accent'>Let's</span> Connect
              </h2>
              <p className='contact-description text-xl mb-12 max-w-2xl mx-auto'>
                I'm always interested in new opportunities and exciting
                projects. Let's discuss how we can work together to build
                something amazing.
              </p>

              <div className='flex justify-center space-x-8 mb-12'>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    href={link.href}
                    
                    className='contact-social-link flex items-center space-x-3 transition-colors'
                  >
                    <link.icon className='h-6 w-6' />
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </div>

              <Button size='lg'>
                <Mail className='mr-2 h-5 w-5' />
                Start a Conversation
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className='footer py-8 px-4 border-t'>
          <div className='flex max-w-6xl mx-auto text-center justify-center space-x-4 items-center'>
            <div><p className='footer-text'>
              &copy; 2025 Abel Fagbemi.
            </p></div>
            <div className='flex justify-center items-center space-x-8 pb-2'>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    href={link.href}
                    
                    className='contact-social-link flex items-center space-x-3 transition-colors'
                  >
                    <link.icon className='h-6 w-6' />
                  </motion.a>
                ))}
              </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
