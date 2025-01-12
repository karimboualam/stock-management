import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'; // Bootstrap pour le Dropdown

const Header = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si les cookies sont présents
    const firstName = Cookies.get('firstName');
    const lastName = Cookies.get('lastName');
    const token = Cookies.get('token');
    const userId = Cookies.get('userId');

    if (token && firstName && lastName && userId) {
      setUser({ firstName, lastName, token });
    } else {
      // Si l'utilisateur n'est pas connecté, redirigez vers la page de login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Supprimer les cookies
    Cookies.remove('token');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('userId');
    navigate('/login');
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Logo de l'application */}
        <a className="navbar-brand" href="/menu">
          <img src="assets/photos/logo.png" alt="Logo" style={{ height: '40px' }} />
        </a>

        {/* Nom de l'application au centre */}
        <span className="navbar-text mx-auto">
          Gestion de Produit
        </span>

        {/* Dropdown avec Bonjour et les options utilisateur */}
        {user.firstName && user.lastName && (
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="dropdown-custom-components">
              Bonjour, {user.firstName} {user.lastName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profil">Profil</Dropdown.Item>
              <Dropdown.Item href="/parametres">Paramètres</Dropdown.Item>
              <Dropdown.Item href="/historique">Historique</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </header>
  );
};

export default Header;
