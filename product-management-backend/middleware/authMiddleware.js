const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    //console.log('req.headers== == ', req.headers);
    //console.log('req.body== == ', req.body);
  //  console.log('req.body.userId== == ', req.body.user);
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.headers.authorization?.split(' ')[1] || req.header('Authorization')?.replace('Bearer ', '');
 //   const token = req.headers.authorization?.split(' ')[1];

    console.log('token ==// ', token);
    //  const token = req.cookies.token;  // Get token from cookies
  //  const userId = req.cookies.userId;  // Get userId from cookies
    const userId = req.body.userId;  // Get userId from cookies
    console.log('1) userId == ', userId, '2) req.body.userId == //', req.body.userId);

   console.log('3) userId === ', userId, ' 4) req.cookies.firstName ===', req.cookies.firstName, '5)  req.cookies.lastName === ', req.cookies.lastName);
   

    // Vérifier si le token est manquant
    if (!token) {
        return res.status(401).json({ message: 'Token d\'authentification manquant' });
    }
    else if ( !userId) {
        return res.status(401).json({ message: ' ID utilisateur manquant' });
    }

    console.log('Received Token:', token);  // Log du token reçu pour le débogage

    try {
                            // Vérifier et décoder le token avec JWT_SECRET
                       //     console.log('process.env.JWT_SECRET == ', process.env.JWT_SECRET);  
                         //   console.log(' token == ', token);  

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
                            console.log('Token décodé :', decoded);  // Log du contenu décodé du token
                            console.log('decoded.sub == ', decoded.sub);  // Log de l'ID utilisateur du token

                              // Ensure the user ID in the decoded token matches the one in the cookies
        if (decoded.sub !== userId) {
            console.log('decoded.sub !== userId == ', decoded.sub,'== ??', userId);
            return res.status(401).json({ message: 'ID utilisateur ne correspond pas au token' });
        }

        req.user = decoded; // Contient les informations entières du token
        console.log('req.user ==$$ ', req.user);
        req.userId = userId;
        console.log('req.userId ==$$ ', req.userId);
    //    req.userId = decoded.userId || decoded.sub; // Ajoute spécifiquement l'ID utilisateur

        next(); // Continuer vers le middleware ou la route suivante
    } catch (err) {
        console.error('Erreur lors de la vérification du token :', err.message);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expiré' });
        }

        return res.status(401).json({ message: 'Token invalide ou autre erreur' });
    }
};
