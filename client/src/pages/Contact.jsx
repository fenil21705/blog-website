import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Thank you! Your message has been sent (simulation).');
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <div className="container" style={{ paddingBottom: '8rem' }}>
            <div className="mobile-center" style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '4rem' }}>
                <h1 className="gradient-text hero-title" style={{ marginBottom: '1rem' }}>Get in Touch</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Have a story to share? We'd love to hear from you.</p>
            </div>

            <div className="grid-2 mobile-stack" style={{ gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-accent)', padding: '0.75rem', borderRadius: '12px' }}>
                            <Mail size={22} />
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.1rem' }}>Email Us</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>hello@modernblog.com</p>
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-accent)', padding: '0.75rem', borderRadius: '12px' }}>
                            <MapPin size={22} />
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.1rem' }}>Our Studio</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Creative District, NY 10012</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass"
                    style={{ padding: '2rem', borderRadius: '28px', width: '100%' }}
                >
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                                <input type="text" className="input-field" style={{ marginBottom: 0 }} placeholder="John Doe" required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
                                <input type="email" className="input-field" style={{ marginBottom: 0 }} placeholder="john@example.com" required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Message</label>
                                <textarea className="input-field" style={{ marginBottom: 0, minHeight: '140px', resize: 'vertical' }} placeholder="Tell us about yourself..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ height: '56px', width: '100%' }}>
                                <Send size={18} /> Send Message
                            </button>
                        </div>
                        {status && <p style={{ marginTop: '1.5rem', color: '#16a34a', textAlign: 'center', fontWeight: 600 }}>{status}</p>}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
