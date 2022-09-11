const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {

    // works seeded
    const allCategoryData = await Category.findAll( { 
      include: [{ model: Product }],
    })


    if (!allCategoryData) {
    res.json("Sorry, there was an issue getting the categories");
    return;
    }

    res.json(allCategoryData);

  } catch (err) {
    res.json(err);
  }
});

router.get('/:id', async (req, res) => { // works
  // find one category by its `id` value
  // be sure to include its associated Products

  try {

    // works seeded
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });


    if (singleCategoryData == null) {
    res.json("Sorry, there was an issue getting the category and products");
    return;
    }

    res.json(singleCategoryData);

  } catch (err) {
    res.json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category

  // works seeded
  try {
  const newCategory = await Category.create({
    category_name: req.body.category_name
  });

  if(!newCategory) {
    res.status(400).json("There was an error in creating the category");
    return;
  }

  res.json("Category created successfully");

  } catch (err) {
    res.json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value

  // works seeded
  try {
  const currentCategory = await Category.findOne({
    where: {
        id: req.params.id
    }
  })
  if (currentCategory == "") {
    res.json("Sorry, there was an issue getting the category and products");
    return;
  }

  currentCategory.update({category_name: req.body.category_name});
  currentCategory.save()

  res.sendStatus(200);


} catch (err){
  res.json(err)
}

});

router.delete('/:id', async (req, res) => { 
  // delete a category by its `id` value

  // works seeded

  try {


  const deleteCategory = await Category.destroy({
    where: {id: req.params.id}
  });

  if (!deleteCategory) {
    res.sjson({message: "No category found with that ID"});
    return;
  }

  res.json(deleteCategory);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
