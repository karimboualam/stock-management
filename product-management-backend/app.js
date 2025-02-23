const express = require('express');
const cookieParser = require('cookie-parser');  // Import cookie-parser
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Importer le module CORS
const productRoutes = require('./routes/productRoutes'); // Routes pour les produits


dotenv.config();

const app = express();

// Configurer CORS : Autoriser les requêtes de localhost:3000
const corsOptions = {
 //   origin: ['http://localhost:3000', 'http://localhost:80'],// Frontend React
  //  origin:  'http://localhost:*',// Frontend React

    origin: (origin, callback) => {
        if (!origin || origin === 'http://localhost:80' || origin === 'http://localhost') {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true,  // Allow cookies in CORS requests
    optionsSuccessStatus: 200, // Pour les requêtes OPTIONS
  };

// Utiliser CORS avec les options définies
app.use(cookieParser());  // Add cookie-parser middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Pour analyser les JSON des requêtes

// Connecter à MongoDB
mongoose
   // .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 }) // Supprimez les options obsolètes
    .then(() => console.log('MongoDB connected'))
//    .catch(err => console.log(err));
    .catch(err => {
        console.error('Failed to connect to MongoDB', err.message);
    });

    // Routes
app.use('/api/products', productRoutes); // Montée en charge des routes produits

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});



/*
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Délai d'attente pour MongoDB
    }) 
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('Failed to connect to MongoDB', err.message);
    }); */



// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
