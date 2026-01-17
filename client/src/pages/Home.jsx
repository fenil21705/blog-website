import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import { Clock, User } from 'lucide-react';
import { format } from 'date-fns';

const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} min read`;
};

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for showing "Waking up server" message
    const [longLoading, setLongLoading] = useState(false);

    useEffect(() => {
        // Timer to show "waking up" message if it takes > 2s
        const timer = setTimeout(() => setLongLoading(true), 2000);

        const fetchContent = async () => {
            try {
                const [blogsRes, catsRes] = await Promise.all([
                    axios.get(`${API_URL}/api/blogs`),
                    axios.get(`${API_URL}/api/categories`)
                ]);
                setBlogs(blogsRes.data);
                setCategories(catsRes.data);
                setLoading(false);
                clearTimeout(timer);
            } catch (error) {
                console.error('Error fetching content:', error);
                setLoading(false);
                clearTimeout(timer);
            }
        };
        fetchContent();
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div style={{ overflow: 'hidden' }}>
                {/* Hero Skeleton */}
                <section style={{ padding: '10rem 0 6rem 0', textAlign: 'center' }}>
                    <div className="container">
                        <div className="skeleton" style={{ width: '60%', height: '80px', margin: '0 auto 2rem auto', borderRadius: '12px' }}></div>
                        <div className="skeleton" style={{ width: '40%', height: '24px', margin: '0 auto 3rem auto', borderRadius: '4px' }}></div>
                    </div>
                </section>

                {/* Grid Skeleton */}
                <section className="container">
                    <div className="blog-grid">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="premium-card" style={{ height: '550px', border: 'none' }}>
                                <div className="skeleton" style={{ height: '280px', width: '100%' }}></div>
                                <div style={{ padding: '2rem' }}>
                                    <div className="skeleton" style={{ width: '30%', height: '16px', marginBottom: '1rem', borderRadius: '4px' }}></div>
                                    <div className="skeleton" style={{ width: '90%', height: '32px', marginBottom: '1rem', borderRadius: '8px' }}></div>
                                    <div className="skeleton" style={{ width: '80%', height: '32px', marginBottom: '1.5rem', borderRadius: '8px' }}></div>
                                    <div className="skeleton" style={{ width: '100%', height: '60px', borderRadius: '8px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Server Wake-up Message */}
                {longLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            background: '#111',
                            color: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            zIndex: 9999,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        <div style={{ width: '20px', height: '20px', border: '2px solid #333', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        <div>
                            <span style={{ fontWeight: 700, display: 'block', fontSize: '0.9rem' }}>Waking up server...</span>
                            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>This takes ~30s once.</span>
                        </div>
                    </motion.div>
                )}
            </div>
        );
    }

    const featuredBlogs = Array.isArray(blogs) ? blogs.slice(0, 3) : [];
    const latestBlogs = Array.isArray(blogs) ? blogs.slice(3, 9) : [];
    const popularBlogs = Array.isArray(blogs) ? blogs.slice(0, 4) : []; // Simulation

    return (
        <div style={{ overflow: 'hidden' }}>
            {/* 2. Hero Section */}
            <section className="hero-spacing" style={{
                background: 'radial-gradient(circle at top right, rgba(0,0,0,0.03) 0%, transparent 40%)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-title gradient-text"
                        style={{ marginBottom: '1.5rem' }}
                    >
                        Insights for the <br />Modern Creator.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="hero-desc"
                    >
                        Exploring the intersection of technology, minimalism, and high-end digital lifestyle.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <a href="#latest" className="btn btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Read Latest Posts</a>
                        <Link to="/about" className="btn btn-outline" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Start Here</Link>
                    </motion.div>
                </div>
            </section>

            {/* 4. Categories Section */}
            <section className="container" style={{ marginBottom: '6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            to="/categories"
                            className="glass"
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '30px',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                textDecoration: 'none',
                                color: 'var(--text-primary)',
                                transition: '0.3s'
                            }}
                            onMouseOver={(e) => e.target.style.background = 'rgba(0,0,0,0.05)'}
                            onMouseOut={(e) => e.target.style.background = 'var(--glass-bg)'}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. Featured / Latest Blog Posts */}
            <section id="latest" className="container" style={{ marginBottom: '8rem' }}>
                <div className="flex-between mobile-stack" style={{ alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '2px' }}>DISCOVER</span>
                        <h2 className="hero-title" style={{ fontSize: '2.5rem', fontWeight: 800 }}>Latest Stories</h2>
                    </div>
                    <Link to="/categories" style={{ color: '#000', fontWeight: 600, fontSize: '0.9rem' }}>View All Posts →</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
                    {featuredBlogs.map((blog, index) => (
                        <motion.div
                            key={blog?.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="premium-card"
                        >
                            <Link to={`/blog/${blog?.slug || ''}`}>
                                <div style={{ height: '280px', overflow: 'hidden', background: '#f5f5f5', borderRadius: '20px' }}>
                                    {blog?.featuredImage ? (
                                        <img
                                            src={blog.featuredImage.startsWith('/') ? `${API_URL}${blog.featuredImage}` : blog.featuredImage}
                                            alt={blog.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '1s' }}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>NO IMAGE</div>
                                    )}
                                </div>
                                <div style={{ padding: '2rem 1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                                        <span>{blog?.category || 'General'}</span>
                                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ccc' }}></span>
                                        <span>{calculateReadingTime(blog?.content || '')}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.75rem', lineHeight: 1.3, marginBottom: '1rem', fontWeight: 700 }}>{blog?.title || 'Untitled'}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {blog?.excerpt || 'Read more about this fascinating topic...'}
                                    </p>
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#000', textDecoration: 'underline' }}>Read Post</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. About the Blogger Context */}
            <section style={{ background: '#fafafa', padding: '6rem 0' }}>
                <div className="container">
                    <div className="grid-2">
                        <div style={{ position: 'relative' }}>
                            <div style={{ width: '100%', height: '400px', background: '#eee', borderRadius: '30px', overflow: 'hidden' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=2070"
                                    alt="The Blogger"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="glass mobile-hide" style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', padding: '2rem', borderRadius: '24px', maxWidth: '300px' }}>
                                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                                    "Writing is the geometry of the soul. I share what I learn along the path."
                                </p>
                            </div>
                        </div>
                        <div className="mobile-center">
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '2px' }}>THE CURATOR</span>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0 2rem 0' }}>Hello, I'm <span className="gradient-text">Julian.</span></h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                I’m a digital product designer and minimalist based in San Francisco. I write about high-end tech, timeless design principles, and how to build a meaningful digital life in a world of noise.
                            </p>
                            <Link to="/about" className="btn btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: '50px' }}>Full Story</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Popular or Recommended Posts */}
            <section className="container" style={{ padding: '8rem 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Popular Reads</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>The most shared and loved stories by our community.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {popularBlogs.map((blog, index) => (
                        <Link key={index} to={`/blog/${blog.slug}`} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1rem', borderRadius: '16px', transition: '0.3s' }} className="glass-hover">
                            <div style={{ minWidth: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', background: '#eee' }}>
                                <img src={blog.featuredImage || 'https://via.placeholder.com/100'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.3rem' }}>{blog.title}</h4>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{blog.category} • 5k views</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 6. Email Signup / Subscribe Section */}
            <section className="container" style={{ marginBottom: '8rem' }}>
                <div className="glass" style={{ padding: '6rem 2rem', borderRadius: '40px', textAlign: 'center', background: '#000', color: '#fff' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', color: '#fff' }}>Join the Newsletter</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        Get the latest stories, design resources, and technology tips delivered directly to your inbox every Sunday.
                    </p>
                    <form className="mobile-stack" style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }} onSubmit={(e) => { e.preventDefault(); alert('Welcome to the inner circle!') }}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '50px',
                                padding: '1rem 2rem',
                                color: '#fff',
                                outline: 'none',
                                minWidth: '200px'
                            }}
                            required
                        />
                        <button type="submit" className="btn" style={{ background: '#fff', color: '#000', borderRadius: '50px', padding: '0 2rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                            Join Now
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
