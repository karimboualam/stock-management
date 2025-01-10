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
        <div className="container my-5">
            <h1 className="mb-4">Liste des produits</h1>

            {/* Bouton Ajouter un produit */}
            <button 
                onClick={handleAddProduct} 
                className="btn btn-primary mb-4"
            >
                Ajouter un produit
            </button>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Nom</th>
                                <th>Prix (€)</th>
                                <th>Description</th>
                                <th>Ajouté par</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price} €</td>
                                    <td>{product.description}</td> {/* Description du produit */}
                                    <td>{product.addedBy ? product.addedBy : 'Inconnu'}</td> {/* Nom de l'utilisateur ou ID */}
                                    <td>
                                        <button onClick={() => handleViewDetails(product._id)} className="btn btn-info btn-sm me-2">
                                        Voir
                                        </button>
                                        <button onClick={() => handleDelete(product._id)} className="btn btn-danger btn-sm">
                                        Supprimer
                                        </button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>

                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;
