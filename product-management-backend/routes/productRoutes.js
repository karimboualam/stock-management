const express = require('express');
const { authenticate } = require('../middleware/authMiddleware'); // Import du middleware

const { getAllProducts, 
        addProduct, 
        getProductById, 
        updateProduct, 
        deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Routes publiques ou protégées
router.get('/', getAllProducts); // Accès public
router.post('/', authenticate, addProduct); // Authentification requise pour ajouter un produit
router.get('/:id', authenticate, getProductById); // Authentification requise pour un produit spécifique
router.put('/:id', authenticate, updateProduct); // Authentification requise pour mise à jour
router.delete('/:id', authenticate, deleteProduct); // Authentification requise pour suppression


module.exports = router;
