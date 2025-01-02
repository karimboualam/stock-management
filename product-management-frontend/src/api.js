import axios from 'axios';

// Définir l'URL de l'API Node.js
const API_URL = 'http://localhost:5000/api/products';

// Récupérer tous les produits
export const getProducts = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Ajouter un produit
export const addProduct = async (productData, token) => {
    const response = await axios.post(API_URL, productData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Modifier un produit
export const updateProduct = async (id, productData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Supprimer un produit
export const deleteProduct = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Récupérer un produit spécifique
export const getProduct = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
