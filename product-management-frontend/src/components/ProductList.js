import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const fetchedProducts = await getProducts(token);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await deleteProduct(id, token);
        setProducts(products.filter(product => product._id !== id)); // Supprimer le produit de la liste
    };

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const handleViewDetails = (id) => {
        navigate(`/product-details/${id}`);
    };

    return (
        <div>
            <h1>Liste des produits</h1>
            <button onClick={handleAddProduct}>Ajouter un produit</button>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            {product.name} - {product.price} €
                            <button onClick={() => handleViewDetails(product._id)}>Voir</button>
                            <button onClick={() => handleDelete(product._id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
