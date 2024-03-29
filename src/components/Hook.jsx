import { useState, useCallback } from 'react';

function useFetch() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (url, options = {}, method = 'GET') => {
        setLoading(true);
        setError(null);
        try {
            const config = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    // Permet la personnalisation des headers ici
                },
            };

            // Permettre la personnalisation des headers
            if (options.headers) {
                config.headers = { ...config.headers, ...options.headers };
            }

            if (method === 'POST' && options.body) {
                config.body = JSON.stringify(options.body);
            }

            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error("L'API ne fonctionne pas comme prévu.");
            }

            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { fetchData, data, loading, error };
}

export default useFetch;
