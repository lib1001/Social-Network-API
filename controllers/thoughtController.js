const User = require('../models/Thought');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.status(500).json(err));
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



      
    }