const router = require('express').Router();
const {
  finaAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/thoughtController.js');


router.route('/').get(finaAllUsers).post(createUser);


router.route('/:userId').get(findUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendIds').post(addFriend).delete(deleteFriend);

module.exports = router;