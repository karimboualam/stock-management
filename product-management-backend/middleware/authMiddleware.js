const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
 //   const token = req.headers.authorization?.split(' ')[1]; // Récupérer le token après "Bearer"
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: ' Token d\'authentification manquant' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //  req.user = decoded; // Associe les informations utilisateur à la requête
        req.userId = decoded.userId; // Ajouter l'ID de l'utilisateur dans la requête

        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide ou expiré' });
    }
};
