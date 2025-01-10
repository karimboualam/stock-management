import axios from 'axios';

// Définir l'URL de l'API Node.js
const API_URL = 'http://localhost:5000/api/products';

// Récupérer tous les produits
export const getProducts = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

// Ajouter un produit
export const addProduct = async (productData, token) => {
    console.log('ADD : Sending token:', token);  // Log the token being sent in the API call
    console.log('ADD : Sending productData:', productData);  // Log the token being sent in the API call
    try {
    const response = await axios.post(API_URL, productData, {
        headers: {
          //  Authorization: `Bearer ${token}`
          Authorization: `Bearer ${token}`, // Attach the token here
          'Content-Type': 'application/json',
        },
       // withCredentials: true, // This ensures cookies are sent along with the request

    });
    return response.data;
} catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
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
    console.log('Delete Sending token:', token);  // Log the token being sent in the API call
    console.log('delete sending id ',id);  // Log the token being sent in the API call
    try {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        // withCredentials: true, // This ensures cookies are sent along with the request

    });
    return response.data;
} catch (error) {
    console.error('Error delete product:', error);
    throw error;
  }
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
