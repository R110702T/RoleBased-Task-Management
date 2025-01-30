import axios from 'axios';

// Base API URL from environment variables
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Create an Axios instance for consistent API requests
const api = axios.create({
    baseURL: apiUrl, // Use the environment variable here
    headers: {
        'Content-Type': 'application/json',
    },
});

// Export the Axios instance for reuse
export default api;
