import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Feather, X, LogOut } from 'lucide-react';

const Navbar = () => {
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

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem' }}>
                    <Feather size={28} />
                    <span className="gradient-text">MODERN BLOG</span>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {!isSearchOpen && (
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            {['Home', 'Categories', 'About', 'Contact'].map((item) => (
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
                                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                                >
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
                                        {userInfo.username?.[0]?.toUpperCase()}
                                    </div>
                                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{userInfo.username}</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="glass-hover"
                                    style={{ background: 'none', border: 'none', padding: '0.5rem', borderRadius: '12px', color: 'var(--danger)', display: 'flex', cursor: 'pointer' }}
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                <Link
                                    to="/login"
                                    style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn btn-primary"
                                    style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', fontSize: '0.9rem' }}
                                >
                                    Join
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
