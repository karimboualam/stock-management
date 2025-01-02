const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    userId: { type: String, required: true }, // ID de l'utilisateur qui a ajouté le produit
});

module.exports = mongoose.model('Product', productSchema);
