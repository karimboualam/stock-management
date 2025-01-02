import React, { useEffect, useState } from 'react';
import { getProduct } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('token');
            try {
                const fetchedProduct = await getProduct(id, token);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.name}</h1>
                    <p>Prix: {product.price} €</p>
                    <p>Quantité: {product.quantity}</p>
                    <p>Description: {product.description}</p>
                    <button onClick={() => navigate('/')}>Retour à la liste</button>
                </div>
            ) : (
                <p>Produit introuvable</p>
            )}
        </div>
    );
};

export default ProductDetails;
