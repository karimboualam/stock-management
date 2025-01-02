import React, { useState } from 'react';
import { addProduct } from '../api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const productData = { name, price, quantity, description };

        try {
            await addProduct(productData, token);
            navigate('/');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du produit', error);
        }
    };

    return (
        <div>
            <h1>Ajouter un produit</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom du produit"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Prix"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantité"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddProduct;
