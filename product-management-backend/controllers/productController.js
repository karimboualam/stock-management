const axios = require('axios');
const Product = require('../models/Product');

// Exemple d'URL du service Utilisateur (Spring Boot)
const USER_SERVICE_URL = 'http://localhost:8080/api/utilisateurs';  // URL de l'API Spring Boot

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ajouter un produit
exports.addProduct = async (req, res) => {
    try {
        // Récupérer l'utilisateur actuel via l'ID de l'utilisateur (par exemple via JWT ou session)
        const userId = req.user.id;

        // Récupérer l'utilisateur depuis le service Utilisateur (Spring Boot)
        const response = await axios.get(`${USER_SERVICE_URL}/${userId}`);
        const user = response.data;

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Créer un nouveau produit et l'associer à l'utilisateur récupéré
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            utilisateur: user // Utilisateur récupéré du service Spring Boot
        });

        // Sauvegarder le produit dans la base de données
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Erreur lors de l\'ajout du produit' });
    }
};

// Obtenir un produit par ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
