const Joi = require('joi');

// Middleware de validation des données pour la réservation d'une salle
exports.validateReservationData = (req, res, next) => {
  // Schéma de validation des données de réservation
  const schema = Joi.object({
    roomId: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required()
    // Ajoutez d'autres champs nécessaires à la réservation
  });

  // Validation des données de la requête
  const { error } = schema.validate(req.body);

  // Si une erreur de validation est détectée, renvoyer une réponse d'erreur
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Si les données sont valides, passer au middleware suivant
  next();
};
