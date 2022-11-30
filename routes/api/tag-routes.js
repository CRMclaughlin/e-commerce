const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(allTags)
  } catch (err) {
    res.status(500).json(err)
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    if (!singleTag) {
      res.status(404).json({ message: "No tag with this ID!"})
      return
    }
    res.status(200).json(singleTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
