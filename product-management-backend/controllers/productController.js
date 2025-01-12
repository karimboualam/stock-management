//import axios from 'axios';
//import Cookies from 'js-cookie';

const axios = require('axios');
const Product = require('../models/Product');
require('dotenv').config();  // Charger les variables d'environnement depuis .env


// Exemple d'URL du service Utilisateur (Spring Boot)
//const USER_SERVICE_URL = 'http://localhost:8080/api/utilisateurs';  // URL de l'API Spring Boot
// const USER_SERVICE_URL = 'http://localhost:9091/api/utilisateurs';  // URL de l'API Spring Boot
//const USER_SERVICE_URL = 'http://10.247.82.107:9091/api/utilisateurs';  // URL de l'API Spring Boot
const USER_SERVICE_URL = process.env.SERVICE_URL;
   

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
     //   const products = await Product.find().populate('userId', 'name'); // Associe l'ID utilisateur à son nom

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Ajouter un produit
exports.addProduct = async (req, res) => {
    console.log('Controller - :  addProduct :')
    try {
        // Récupérer l'utilisateur actuel via l'ID de l'utilisateur (par exemple via JWT ou session)
       console.log('Controller - NodeJS : req.user == ', req.userId);
       console.log('Processing addProduct request...');
      //  const userId = req.user.id;
    
        const userId = req.userId;


        if (!userId) {
            return res.status(400).json({ message: 'ID utilisateur manquant' });
        }
        console.log('1: User ID:', userId);  // Log de l'ID utilisateur pour le débogage
        // Fetch user data from the Spring Boot service
        try {
            console.log('${USER_SERVICE_URL}/${userId} = ',`${USER_SERVICE_URL}/${userId}`);
            const userResponse = await axios.get(`${USER_SERVICE_URL}/${userId}`);
            console.log('Fetched User Data:', userResponse.data);
        } catch (error) {
            console.error('Error connecting to User Service:', error.message);
            return res.status(500).json({ message: 'Unable to fetch user data from User Service' });
        }
        // Récupérer l'utilisateur depuis le service Utilisateur (Spring Boot)
    //    const response = await axios.get(`${USER_SERVICE_URL}/${userId}`);
    // Fetch user data from the Spring Boot service
   
        const response = await axios.get(`${USER_SERVICE_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`, // Extract token
            },
        });
    
    
        console.log('2: User ID:', userId);  // Log de l'ID utilisateur pour le débogage

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
          //  utilisateur: user // Utilisateur récupéré du service Spring Boot
            userId: userId, // Associer le produit à l'utilisateur

        });

        // Sauvegarder le produit dans la base de données
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Erreur lors de l\'ajout du produit',err });
        res.status(500).json({ message: 'Internal server error' });

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




