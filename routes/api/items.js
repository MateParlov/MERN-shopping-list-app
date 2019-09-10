const router = require('express').Router();

let Item = require('./../../models/item.model');

//@route GET api/items
//@desc Get All Items
//@access Public

router.route('/').get((req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(400).json(err));
});

//@route POST api/items
//@desc Create A Post
//@access Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json(err));
});

//@route DELETE api/items/:id
//@desc DELETE a Item
//@access Public

router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  /*  Item.findByIdAndDelete(userId)
    .then(() => res.json('User Deleted'))
    .catch(err => res.status(400).json(err)); */

  Item.findById(userId)
    .then(item => {
      item
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
