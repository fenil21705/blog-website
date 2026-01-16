import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';
import { Trash2, Plus, AlertCircle } from 'lucide-react';

const CategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/api/categories`);
            setCategories(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories');
            setLoading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory) return;
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(`${API_URL}/api/categories`,
                { name: newCategory },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCategories([...categories, data]);
            setNewCategory('');
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Error adding category');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure? This will not delete posts but they will lose this category reference.')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/api/categories/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCategories(categories.filter(cat => cat.id !== id));
        } catch (error) {
            setError('Failed to delete category');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container">
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Manage Categories</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Add or remove categories for your blog posts.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '24px', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Add New Category</h3>
                    <form onSubmit={handleAddCategory}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category Name</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Photography"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        {error && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                <AlertCircle size={14} /> {error}
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            <Plus size={18} /> Add Category
                        </button>
                    </form>
                </div>

                <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', background: 'var(--bg-accent)' }}>
                                <th style={{ padding: '1.2rem', fontSize: '0.85rem' }}>NAME</th>
                                <th style={{ padding: '1.2rem', fontSize: '0.85rem' }}>SLUG</th>
                                <th style={{ padding: '1.2rem', textAlign: 'right', fontSize: '0.85rem' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(categories) && categories.map((cat) => (
                                <tr key={cat?.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1.2rem', fontWeight: 500 }}>{cat?.name || 'Unknown'}</td>
                                    <td style={{ padding: '1.2rem', color: 'var(--text-secondary)' }}>{cat?.slug || '-'}</td>
                                    <td style={{ padding: '1.2rem', textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDeleteCategory(cat?.id)}
                                            style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.5rem' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(!Array.isArray(categories) || categories.length === 0) && (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No categories found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoriesManager;
