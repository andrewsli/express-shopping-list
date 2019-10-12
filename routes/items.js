const express = require("express");
const router = new express.Router();
let items = require("../fakeDb")

router.get("/", function(req, res,next){
  return res.json(items);
});

router.post("/", function(req,res,next){
  items.push(req.body)
  return res.json({"added": req.body})
});

router.get("/:name",function(req, res, next) {
  for (let item of items) {
    if (item.name === req.params["name"]) {
      return res.json(item);
    }
  }
  return res.json("Item could not be found");
});

router.patch("/:name", function(req, res, next){
  for (let i in items){
    if (items[i].name === req.params["name"]){
      
      items[i] = req.body

      return res.json({"updated": req.body})
    }
  }
  return res.json("Item could not be found.")
});


router.delete("/:name", function(req, res, next){
  for (let i in items) {
    if (items[i].name === req.params["name"]) {
      items.splice(i,1);
      console.log(items)
      return res.json({"message": "deleted"})
    }
  }
  return res.json("Item could not be found.")
});


module.exports = router;