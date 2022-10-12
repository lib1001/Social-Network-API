const User = require('../models/User');

module.exports = {
  findAllUsers(req, res) {
    User.find()
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  findUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((dbUserData) =>
        !dbUserData
          ? res
              .status(404)
              .json({ message: 'No user with this id!' })
          : res.json({ message: 'User successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.friendId } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
}

