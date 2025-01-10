import React, { useState } from 'react';
import { addProduct } from '../api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import pour lire les cookies

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Récupérer le token à partir des cookies
        const token = Cookies.get('token');
        const userId = Cookies.get('userId'); // Récupérer l'ID utilisateur

        if (!token || !userId) {
            console.error('Token or userId not found!');
            alert('Vous devez être connecté pour ajouter un produit.');
            return;
        }

        const productData = { name, price, quantity, description, userId };

        try {
            await addProduct(productData, token); // Envoyer les données du produit à l'API
            alert('Produit ajouté avec succès !');
            navigate('/'); // Rediriger vers la page d'accueil après ajout
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit', error);
        }
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4">Ajouter un produit</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Nom du produit</label>
                    <input
                        type="text"
                        id="productName"
                        className="form-control"
                        placeholder="Nom du produit"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Prix (€)</label>
                    <input
                        type="number"
                        id="productPrice"
                        className="form-control"
                        placeholder="Prix du produit"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productQuantity" className="form-label">Quantité</label>
                    <input
                        type="number"
                        id="productQuantity"
                        className="form-control"
                        placeholder="Quantité disponible"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="productDescription" className="form-label">Description</label>
                    <textarea
                        id="productDescription"
                        className="form-control"
                        placeholder="Description du produit"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Ajouter le produit</button>
            </form>
        </div>
    );
};

export default AddProduct;
