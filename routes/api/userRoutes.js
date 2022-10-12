const router = require('express').Router();
const {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');


router.route('/').get(findAllUsers).post(createUser);


router.route('/:userId').get(findUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendIds').post(addFriend).delete(removeFriend);

module.exports = router;