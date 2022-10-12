const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => { console.log(err);
            res.status(500).json(err)});
      },
      findThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(dbThoughtData)
          )
          .catch((err) => res.status(500).json(err));
      },

      createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then((dbUserData) =>
            !dbUserData
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the thought 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(dbThoughtData)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate(
                  { thoughts: req.params.userId },
                  { $pull: { thoughts: req.params.thoughtId } },
                  { new: true }
                )
          )
          .then((dbUserData) =>
            !dbUserData
              ? res
                  .status(404)
                  .json({ message: 'Thought successfully deleted!' })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },

      createReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(dbThoughtData)
          )
          .catch((err) => res.status(500).json(err));
      },

      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((dbThoughtData) =>
            !dbThoughtData
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(dbThoughtData)
          )
          .catch((err) => res.status(500).json(err));
      },


      
    }

    module.exports = thoughtController