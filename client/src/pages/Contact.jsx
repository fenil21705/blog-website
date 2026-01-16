import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Thank you! Your message has been sent (simulation).');
        setTimeout(() => setStatus(''), 5000);
    };

    return (
        <div className="container" style={{ paddingTop: '8rem', paddingBottom: '8rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3.5rem' }}>Get in Touch</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Have a story to share? We'd love to hear from you.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '4rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-accent)', padding: '1rem', borderRadius: '12px' }}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.2rem' }}>Email Us</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>hello@modernblog.com</p>
                        </div>
                    </div>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ background: 'var(--bg-accent)', padding: '1rem', borderRadius: '12px' }}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '0.2rem' }}>Our Studio</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Creative District, NY 10012</p>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass"
                    style={{ padding: '3rem', borderRadius: '24px' }}
                >
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                                <input type="text" className="glass" style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'var(--text-primary)' }} placeholder="John Doe" required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                                <input type="email" className="glass" style={{ width: '100%', padding: '1rem', borderRadius: '12px', color: 'var(--text-primary)' }} placeholder="john@example.com" required />
                            </div>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Message</label>
                            <textarea className="glass" style={{ width: '100%', padding: '1rem', borderRadius: '12px', minHeight: '150px', color: 'var(--text-primary)', resize: 'vertical' }} placeholder="Tell us about yourself..." required></textarea>
                        </div>
                        <button type="submit" className="btn" style={{ width: '100%', padding: '1.2rem', background: '#000', color: '#fff', borderRadius: '12px', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                            <Send size={18} /> Send Message
                        </button>
                        {status && <p style={{ marginTop: '1.5rem', color: 'var(--success)', textAlign: 'center' }}>{status}</p>}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
