const express = require('express');
const router = express.Router();
const {
  addReview,
  getDoctorReviews,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.post('/reviews', addReview);

router.get('/reviews/doctor/:doctorId', getDoctorReviews);

router.put('/reviews/:reviewId', updateReview);

router.delete('/reviews/:reviewId', deleteReview);

module.exports = router;
