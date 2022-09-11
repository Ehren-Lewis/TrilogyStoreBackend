const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    //works if include isn't included
    const allCategoryData = await Category.findAll( { 
      // include: {model: Product}
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

    // works except for include product
    const singleCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // console.log(singleCategoryData);
    // console.log(typeof singleCategoryData);
  console.log(singleCategoryData);

    if (singleCategoryData == "") {
      console.log('in here')
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

  // works
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

  // works
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

  // works 

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
