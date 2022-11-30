const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{model: Product }]
    })
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json(err)
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (!singleCategory) {
      res.status(404).json({message: "No category with this id!"})
      return
    }
    res.status(200).json(singleCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Tag.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deleteCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
