const router = require('express').Router();
const {
  getAllThoughts,
  findThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction
} = require('../../controllers/thoughtController.js');


router.route('/').get(getAllThoughts).post(createThought);


router.route('/:thoughtId').get(findThoughtById).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
module.exports = router;