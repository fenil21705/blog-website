import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="container" style={{ paddingBottom: '6rem' }}>
            <div className="grid-2 mobile-stack" style={{ alignItems: 'center', paddingTop: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Our Vision</span>
                    <h1 className="gradient-text hero-title" style={{ margin: '1.5rem 0' }}>
                        Crafting Digital Narratives for the Modern Age.
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                        Welcome to Modern Blog, a curated space where technology meets design and lifestyle. We believe that stories should not only be read but experienced through a premium digital lens.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                            <Zap size={24} style={{ marginBottom: '1rem' }} />
                            <h4 style={{ marginBottom: '0.5rem' }}>Innovative</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Always chasing the next frontier in digital experiences.</p>
                        </div>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                            <Award size={24} style={{ marginBottom: '1rem' }} />
                            <h4 style={{ marginBottom: '0.5rem' }}>Premium</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Focusing on high-quality content and aesthetics.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ position: 'relative', width: '100%' }}
                >
                    <div className="premium-card" style={{ height: '450px', width: '100%', overflow: 'hidden', borderRadius: '32px' }}>
                        <img
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                            alt="Premium Office"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="glass mobile-hide" style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', padding: '1.5rem 2rem', borderRadius: '20px', maxWidth: '220px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>50k+</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Monthly readers who value premium digital storytelling.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
