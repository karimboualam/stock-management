import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import './App.css'; // Importer votre fichier CSS global (assurez-vous que les styles Flexbox sont ici)

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> {/* Flexbox pour la structure */}
        {/* Header en haut de la page */}
        <Header />
        
        {/* Navbar avec les liens de navigation */}
        <Navbar />
        
        <div className="container mt-4 flex-grow-1"> {/* Contenu flexible qui prend l'espace restant */}
          {/* Routes pour différentes pages */}
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
          </Routes>
        </div>

        {/* Footer en bas de la page */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
