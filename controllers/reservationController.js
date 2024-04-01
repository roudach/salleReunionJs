const Reservation = require('../models/reservation');

// Fonction pour récupérer toutes les réservations d'un utilisateur
exports.getAllReservations = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur connecté depuis la session ou le JWT
    const userId = req.user.id; // Supposons que vous avez une propriété 'id' dans l'objet 'user' de la requête

    // Recherche des réservations de l'utilisateur dans la base de données
    const reservations = await Reservation.find({ user: userId });

    res.status(200).json({
      status: 'success',
      data: {
        reservations
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Fonction pour réserver une salle
exports.bookReservation = async (req, res) => {
  try {
    // Récupérer les données de la requête (par exemple, roomId, startTime, endTime) depuis le corps de la requête
    const { roomId, startTime, endTime } = req.body;

    // Créer une nouvelle réservation
    const newReservation = await Reservation.create({
      room: roomId,
      user: req.user.id, // Supposons que vous avez une propriété 'id' dans l'objet 'user' de la requête
      startTime,
      endTime
      // Autres champs de réservation
    });

    res.status(201).json({
      status: 'success',
      data: {
        reservation: newReservation
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Fonction pour modifier une réservation existante
exports.updateReservation = async (req, res) => {
  try {
    // Récupérer l'ID de la réservation depuis les paramètres de la requête
    const reservationId = req.params.reservationId;

    // Récupérer les données de mise à jour de la réservation depuis le corps de la requête
    const { startTime, endTime } = req.body;

    // Mettre à jour la réservation dans la base de données
    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, { startTime, endTime }, { new: true });

    res.status(200).json({
      status: 'success',
      data: {
        reservation: updatedReservation
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Fonction pour annuler une réservation existante
exports.cancelReservation = async (req, res) => {
  try {
    // Récupérer l'ID de la réservation depuis les paramètres de la requête
    const reservationId = req.params.reservationId;

    // Supprimer la réservation de la base de données
    await Reservation.findByIdAndDelete(reservationId);

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
