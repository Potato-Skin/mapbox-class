const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/map", (req, res, next) => {
  res.render("map", { mapview: true });
});

module.exports = router;
