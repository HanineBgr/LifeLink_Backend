const Review = require('../models/review');
const Doctor = require('../models/Doctor');
const Patient = require('../models/patient');

// Add a new review
const addReview = async (req, res) => {
  try {
    const { doctorId, patientId, rating, comment } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const newReview = new Review({
      doctorId,
      patientId,
      rating,
      comment,
    });

    await newReview.save();

    doctor.reviews.push(newReview._id);
    await doctor.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding review', details: err.message });
  }
};

// Get reviews of a doctor
const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.find({ doctorId }).populate('patientId', 'firstName lastName');

    if (reviews.length === 0) {
      return res.status(404).json({ error: 'No reviews found for this doctor' });
    }

    res.status(200).json({ reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching reviews', details: err.message });
  }
};

// Update an existing review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating review', details: err.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    await review.remove();

    const doctor = await Doctor.findById(review.doctorId);
    if (doctor) {
      doctor.reviews.pull(review._id);
      await doctor.save();
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting review', details: err.message });
  }
};

module.exports = {
  addReview,
  getDoctorReviews,
  updateReview,
  deleteReview,
};
