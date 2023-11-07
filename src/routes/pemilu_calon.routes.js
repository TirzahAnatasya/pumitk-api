const express = require("express");

const {createTambahpemiluCalon,getAllpemiluCalon,UpdatePemiluCalon,hapusPemiluCalon} = require("../controller/pemilu_calon.controller");
const router = express.Router();

router.route("/")
    .post(createTambahpemiluCalon)
    .get(getAllpemiluCalon)
    .patch(UpdatePemiluCalon)
    .delete(hapusPemiluCalon)

module.exports = router;