const express = require('express');
const tourController = require('../controller/tourController');

const router = express.Router();

// I only want this middleware to run on the id param
router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
