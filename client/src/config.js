const API_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://blog-website-cyan.vercel.app';

export default API_URL;
