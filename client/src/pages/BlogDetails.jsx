import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, User, Calendar, Share2, Instagram, Twitter, Linkedin, Clock, Heart, MessageSquare, Send, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const calculateReadingTime = (text) => {
    if (!text) return '1 min read';
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    return `${Math.ceil(minutes)} min read`;
};

const BlogDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [longLoading, setLongLoading] = useState(false);
    const [interactions, setInteractions] = useState({ likesCount: 0, userLiked: false, comments: [] });
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isLoggedIn = !!localStorage.getItem('token');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLongLoading(true), 2000);

        const fetchBlog = async () => {
            try {
                const { data: blogData } = await axios.get(`${API_URL}/api/blogs/${slug}`);
                setBlog(blogData);

                // Fetch likes and comments after blog is loaded
                const token = localStorage.getItem('token');
                const interactionRes = await axios.get(`${API_URL}/api/blogs/${blogData.id}/interactions`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setInteractions(interactionRes.data);

                setLoading(false);
                clearTimeout(timer);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setLoading(false);
                clearTimeout(timer);
            }
        };
        fetchBlog();
        return () => clearTimeout(timer);
    }, [slug]);

    const handleLike = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        try {
            const { data } = await axios.post(`${API_URL}/api/blogs/${blog.id}/like`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setInteractions(prev => ({
                ...prev,
                userLiked: data.liked,
                likesCount: data.liked ? prev.likesCount + 1 : prev.likesCount - 1
            }));
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        if (!commentText.trim()) return;

        setIsSubmitting(true);
        try {
            const { data } = await axios.post(`${API_URL}/api/blogs/${blog.id}/comments`, { content: commentText }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setInteractions(prev => ({
                ...prev,
                comments: [data, ...prev.comments]
            }));
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Delete this comment?')) return;
        try {
            await axios.delete(`${API_URL}/api/blogs/comment/${commentId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setInteractions(prev => ({
                ...prev,
                comments: prev.comments.filter(c => c.id !== commentId)
            }));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    if (loading) return (
        <div>
            <div className="skeleton" style={{ height: '80vh', width: '100%' }}></div>
            <div className="container" style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'minmax(0, 100px) 1fr minmax(0, 100px)', gap: '4rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="skeleton" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
                    <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
                </div>
                <div>
                    <div className="skeleton" style={{ width: '60%', height: '50px', marginBottom: '2rem', borderRadius: '8px' }}></div>
                    <div className="skeleton" style={{ width: '100%', height: '20px', marginBottom: '1rem', borderRadius: '4px' }}></div>
                    <div className="skeleton" style={{ width: '100%', height: '20px', marginBottom: '1rem', borderRadius: '4px' }}></div>
                    <div className="skeleton" style={{ width: '90%', height: '20px', marginBottom: '1rem', borderRadius: '4px' }}></div>
                    <div className="skeleton" style={{ width: '95%', height: '20px', marginBottom: '1rem', borderRadius: '4px' }}></div>
                </div>
            </div>
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
    if (!blog) return <div className="container" style={{ padding: '8rem', textAlign: 'center' }}>Blog not found.</div>;

    return (
        <article style={{ paddingBottom: '8rem' }}>
            <motion.div className="progress-bar" style={{ scaleX }} />

            <header style={{ position: 'relative', height: '80vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '6rem' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                    {blog.featuredImage ? (
                        <img
                            src={blog.featuredImage.startsWith('/') ? `${API_URL}${blog.featuredImage}` : blog.featuredImage}
                            alt={blog.title || 'Blog Image'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ width: '100%', height: '100%', background: '#222' }}></div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' }}></div>
                </div>

                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '3rem', color: '#fff', opacity: 0.7, textDecoration: 'none', fontSize: '0.9rem' }}>
                            <ArrowLeft size={18} /> BACK TO STORIES
                        </Link>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#fff', letterSpacing: '3px', opacity: 0.9 }}>
                            {blog.categoryData?.name || blog.category || 'Uncategorized'}
                        </span>
                        <h1 style={{ fontSize: '4.5rem', color: '#fff', margin: '1rem 0 2rem 0', lineHeight: 1, fontWeight: 800, letterSpacing: '-0.03em' }}>
                            {blog.title || 'Untitled'}
                        </h1>
                        <div style={{ display: 'flex', gap: '3rem', color: '#fff', opacity: 0.9, fontSize: '0.95rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <User size={16} />
                                </div>
                                <span>{blog.author?.username || 'Admin'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Calendar size={18} />
                                <span>{blog.createdAt ? format(new Date(blog.createdAt), 'MMMM dd, yyyy') : 'Recently Published'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Clock size={18} />
                                <span>{calculateReadingTime(blog.content)}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            <div className="container" style={{ marginTop: '6rem' }}>
                <div className="details-layout">
                    <aside className="details-sidebar">
                        <div style={{ textAlign: 'center' }}>
                            <button
                                onClick={handleLike}
                                className={`glass-hover ${interactions.userLiked ? 'liked' : ''}`}
                                style={{
                                    border: '1px solid var(--border-color)',
                                    padding: '0.8rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    color: interactions.userLiked ? '#ff4d4d' : 'inherit',
                                    background: interactions.userLiked ? 'rgba(255,77,77,0.1)' : 'transparent',
                                    transition: '0.3s'
                                }}
                            >
                                <Heart size={24} fill={interactions.userLiked ? '#ff4d4d' : 'none'} />
                            </button>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '0.5rem', display: 'block' }}>{interactions.likesCount}</span>
                        </div>

                        <div className="divider-vertical" style={{ width: '1px', height: '40px', background: 'var(--border-color)', opacity: 0.5 }}></div>

                        <div className="share-controls" style={{ display: 'flex', flexDirection: 'inherit', gap: '1rem', alignItems: 'center' }}>
                            {/* Only show label on desktop vertical mode */}
                            <span className="share-label" style={{ fontSize: '0.7rem', fontWeight: 800, orientation: 'vertical', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '2px', opacity: 0.4 }}>SHARE</span>
                            <button className="btn-outline glass-hover" style={{ border: 'none', padding: '0.5rem', borderRadius: '50%' }}><Twitter size={20} /></button>
                            <button className="btn-outline glass-hover" style={{ border: 'none', padding: '0.5rem', borderRadius: '50%' }}><Linkedin size={20} /></button>
                        </div>
                    </aside>

                    <div style={{ maxWidth: '800px' }}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="blog-content"
                        >
                            <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                        </motion.div>

                        {/* Comments Section */}
                        <section style={{ marginTop: '8rem', borderTop: '1px solid var(--border-color)', paddingTop: '6rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
                                <MessageSquare size={32} />
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Comments ({interactions.comments.length})</h2>
                            </div>

                            {/* Add Comment Form */}
                            <div className="glass" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '4rem' }}>
                                {isLoggedIn ? (
                                    <form onSubmit={handleCommentSubmit}>
                                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
                                                {userInfo.username?.[0]?.toUpperCase()}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <textarea
                                                    placeholder="Share your thoughts..."
                                                    value={commentText}
                                                    onChange={(e) => setCommentText(e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        minHeight: '120px',
                                                        padding: '1rem',
                                                        borderRadius: '16px',
                                                        border: '1px solid var(--border-color)',
                                                        background: 'transparent',
                                                        fontFamily: 'inherit',
                                                        fontSize: '1rem',
                                                        resize: 'none',
                                                        outline: 'none',
                                                        marginBottom: '1rem'
                                                    }}
                                                />
                                                <button
                                                    disabled={isSubmitting || !commentText.trim()}
                                                    className="btn btn-primary"
                                                    style={{ padding: '0.8rem 2rem', borderRadius: '12px' }}
                                                >
                                                    {isSubmitting ? 'Posting...' : 'Post Comment'} <Send size={18} style={{ marginLeft: '0.8rem' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '1rem' }}>
                                        <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>Sign in to join the conversation.</p>
                                        <Link to="/login" className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', borderRadius: '12px' }}>Sign In</Link>
                                    </div>
                                )}
                            </div>

                            {/* Comments List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                {interactions.comments.map((comment) => (
                                    <div key={comment.id} style={{ display: 'flex', gap: '1.5rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 700 }}>
                                            {comment.user?.username?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <div>
                                                    <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>{comment.user?.username}</span>
                                                    <span style={{ fontSize: '0.8rem', opacity: 0.4, marginLeft: '1rem' }}>
                                                        {format(new Date(comment.createdAt), 'MMM dd, yyyy')}
                                                    </span>
                                                </div>
                                                {userInfo.id === comment.userId && (
                                                    <button
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        style={{ color: 'var(--danger)', background: 'none', opacity: 0.4, transition: '0.3s' }}
                                                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                                                        onMouseOut={(e) => e.currentTarget.style.opacity = '0.4'}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                                {interactions.comments.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.3 }}>
                                        <p>No comments yet. Be the first to share your thoughts.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <div />
                </div>
            </div>
        </article>
    );
};


export default BlogDetails;
