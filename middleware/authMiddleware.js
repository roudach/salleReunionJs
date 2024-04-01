const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  // Récupérer le token d'authentification depuis les en-têtes de la requête
  const token = req.headers.authorization;

  // Vérifier si le token est présent
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter l'utilisateur décodé à la requête
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};
