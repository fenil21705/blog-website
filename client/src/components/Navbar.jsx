import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Feather, X, LogOut, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo') || '{}'));
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthChange = () => {
            setIsLoggedIn(!!localStorage.getItem('token'));
            setUserInfo(JSON.parse(localStorage.getItem('userInfo') || '{}'));
        };
        window.addEventListener('authChange', handleAuthChange);
        return () => window.removeEventListener('authChange', handleAuthChange);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    const navItems = ['Home', 'Categories', 'About', 'Contact'];

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '0.75rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem' }}>
                    <Feather size={24} />
                    <span className="gradient-text">MODERN BLOG</span>
                </Link>

                {/* Desktop Menu */}
                <div className="mobile-hide" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {!isSearchOpen && (
                        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        opacity: 0.7,
                                        transition: '0.3s'
                                    }}
                                    onMouseOver={(e) => e.target.style.opacity = '1'}
                                    onMouseOut={(e) => e.target.style.opacity = '0.7'}
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                        {isSearchOpen ? (
                            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search stories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        padding: '0.5rem 2.5rem 0.5rem 1rem',
                                        borderRadius: '20px',
                                        border: '1px solid var(--border-color)',
                                        background: 'rgba(255,255,255,0.5)',
                                        width: '200px',
                                        fontSize: '0.85rem',
                                        outline: 'none'
                                    }}
                                />
                                <X
                                    size={16}
                                    onClick={() => setIsSearchOpen(false)}
                                    style={{ position: 'absolute', right: '10px', cursor: 'pointer', opacity: 0.5 }}
                                />
                            </form>
                        ) : (
                            <div
                                className="glass-hover"
                                style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', cursor: 'pointer' }}
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search size={20} style={{ opacity: 0.7 }} />
                            </div>
                        )}

                        <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', opacity: 0.5 }}></div>

                        {isLoggedIn ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                <Link
                                    to="/profile"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', transition: '0.3s' }}
                                >
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
                                        {userInfo.username?.[0]?.toUpperCase()}
                                    </div>
                                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{userInfo.username}</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="glass-hover"
                                    style={{ background: 'none', border: 'none', padding: '0.5rem', borderRadius: '12px', display: 'flex', cursor: 'pointer' }}
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Link
                                    to="/login"
                                    style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn btn-primary"
                                    style={{ padding: '0.5rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem' }}
                                >
                                    Join
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-hide-icons">
                    <div
                        className="glass-hover"
                        style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', cursor: 'pointer' }}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Search size={22} style={{ opacity: 0.8 }} />
                    </div>
                    <div
                        className="glass-hover"
                        style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex', cursor: 'pointer' }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar Expansion */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ borderTop: '1px solid var(--border-color)', background: '#fff', overflow: 'hidden' }}
                    >
                        <div className="container" style={{ padding: '1rem' }}>
                            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search stories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '0.8rem 1.25rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--bg-secondary)',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                                <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>Go</button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Slide-out Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                top: '60px',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.2)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 998
                            }}
                        />
                        {/* Menu Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: '60px',
                                right: 0,
                                bottom: 0,
                                width: '80%',
                                maxWidth: '320px',
                                background: '#fff',
                                zIndex: 999,
                                padding: '2rem',
                                boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {navItems.map((item) => (
                                    <Link
                                        key={item}
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{
                                            fontSize: '1.25rem',
                                            fontWeight: 700,
                                            padding: '1rem 0',
                                            borderBottom: '1px solid var(--border-color)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        {item}
                                        <ChevronRight size={20} opacity={0.3} />
                                    </Link>
                                ))}

                                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {isLoggedIn ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsMenuOpen(false)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    padding: '1rem',
                                                    background: 'var(--bg-secondary)',
                                                    borderRadius: '16px'
                                                }}
                                            >
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                                                    {userInfo.username?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700 }}>{userInfo.username}</div>
                                                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>View Profile</div>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                style={{
                                                    width: '100%',
                                                    padding: '1rem',
                                                    borderRadius: '12px',
                                                    background: 'none',
                                                    border: '1px solid var(--border-color)',
                                                    fontWeight: 600,
                                                    color: '#ff4444',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                <LogOut size={20} /> Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="btn btn-outline"
                                                style={{ justifyContent: 'center' }}
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                to="/signup"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="btn btn-primary"
                                                style={{ justifyContent: 'center' }}
                                            >
                                                Join Now
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <style>
                {`
                    @media (min-width: 901px) {
                        .desktop-hide-icons { display: none !important; }
                    }
                    @media (max-width: 900px) {
                        .mobile-hide { display: none !important; }
                    }
                `}
            </style>
        </nav>
    );
};

export default Navbar;
