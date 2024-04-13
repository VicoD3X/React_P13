import { useState, useCallback } from 'react';

// Définition du hook personnalisé `useFetch` pour effectuer des requêtes HTTP.
function useFetch() {
    // Utilisation de l'état pour stocker les données, l'état de chargement, et les erreurs.
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Définition de la fonction `fetchData` avec `useCallback` pour éviter des re-créations inutiles.
    const fetchData = useCallback(async (url, options = {}, method = 'GET') => {
        setLoading(true);  // Début du chargement
        setError(null);    // Réinitialisation de l'erreur précédente

        try {
            // Configuration initiale de la requête HTTP.
            const config = {
                method: method, // Méthode HTTP, par défaut 'GET'
                headers: {
                    'Content-Type': 'application/json', // En-tête pour le format JSON
                },
            };

            // Fusion des headers personnalisés avec ceux par défaut si spécifiés dans `options`.
            if (options.headers) {
                config.headers = { ...config.headers, ...options.headers };
            }

            // Si la méthode est POST ou PUT et qu'un corps est spécifié, l'ajouter à la config.
            if ((method === 'POST' || method === 'PUT') && options.body) {
                config.body = JSON.stringify(options.body);
            }

            // Exécution de la requête HTTP vers l'URL fournie avec la configuration définie.
            const response = await fetch(url, config);

            // Gestion des réponses non réussies.
            if (!response.ok) {
                throw new Error("L'API ne fonctionne pas comme prévu.");
            }

            // Extraction et stockage des données JSON de la réponse.
            const responseData = await response.json();
            setData(responseData);
        } catch (error) {
            setError(error.message);  // Stockage de l'erreur en cas d'exception.
        } finally {
            setLoading(false);  // Fin du chargement, que l'appel soit réussi ou non.
        }
    }, []);

    // Retourne les fonctions et états à utiliser dans le composant consommateur.
    return { fetchData, data, loading, error };
}

export default useFetch;
