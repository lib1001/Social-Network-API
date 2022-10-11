const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/thoughtController.js');


router.route('/').get(getUsers).post(createUser);


router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendIds').post(addFriend).delete(deleteFriend);

module.exports = router;