const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes'); // Import des routes


dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Pour analyser les JSON des requêtes

// Connecter à MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Utilisez les routes pour les produits
app.use('/api/products', productRoutes);


mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Délai d'attente pour MongoDB
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('Failed to connect to MongoDB', err.message);
    });


    
// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
