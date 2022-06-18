const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(req.body, {
      include: [Product]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (categoryData) {
      res.status(404).json({ message: 'No category with this id' });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
  const category = categoryData.get({ plain: true });
  res.render('category', category);
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Reader.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Id.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedId) => {
      res.json(updatedId);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const idData = await Reader.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!idData) {
      res.status(404).json({ message: 'No reader found with that id!' });
      return;
    }

    res.status(200).json(idData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
