const API_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000'
        : 'https://blog-website-ashen-ten.vercel.app';

export default API_URL;
