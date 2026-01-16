import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Award, Users, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Our Vision</span>
                    <h1 className="gradient-text" style={{ fontSize: '4rem', lineHeight: 1.1, margin: '1.5rem 0' }}>
                        Crafting Digital Narratives for the Modern Age.
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>
                        Welcome to Modern Blog, a curated space where technology meets design and lifestyle. We believe that stories should not only be read but experienced through a premium digital lens.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                            <Zap size={24} style={{ marginBottom: '1rem' }} />
                            <h4 style={{ marginBottom: '0.5rem' }}>Innovative</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Always chasing the next frontier in digital experiences.</p>
                        </div>
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                            <Award size={24} style={{ marginBottom: '1rem' }} />
                            <h4 style={{ marginBottom: '0.5rem' }}>Premium</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Focusing on high-quality content and aesthetics.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative' }}
                >
                    <div className="premium-card" style={{ height: '600px', width: '100%', overflow: 'hidden' }}>
                        <img
                            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80"
                            alt="Premium Office"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div className="glass" style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', padding: '2rem', borderRadius: '16px', maxWidth: '250px' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>50k+</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Monthly readers who value premium digital storytelling.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
