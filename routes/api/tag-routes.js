const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{model: Product }],
    });

    if (allTags == null) {
      res.json("There was an issue getting the tags");
      return;
    }

    res.json(allTags);

  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const currentTag = Tag.findByPk( req.body.id,{
      include: [{model: Tag, through: "product_tag"}]
    });

    if (currentTag == null ) {
      res.json("There was an issue in getting the specified tag");
      return;
    }

  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {  // not quite certain
  // create a new tag
  try { 
    const newTag = await Tag.create({
      tag_name : req.body.tag_name
    });


    if (!newTag) {
      res.json("There was an issue with creating the tag");
    }

    res.json(newTag);

  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {

    const tagToUpdate = await Tag.findByPk( req.params.id);

    tagToUpdate.update({ tag_name: req.body });
    tagToUpdate.save();

    res.send(tagToUpdate);

  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {

    const toDeleteTag = await Tag.destroy({
      where: {id: req.params.id}
    });

    if (toDeleteTag == "") {
      res.json("There was an issue in trying to find the tag");
      return;
    }

    res.json(toDeleteTag);

  } catch (err) {
    res.json(err)
  }
});

module.exports = router;
