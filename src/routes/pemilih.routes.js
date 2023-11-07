const express = require("express");

const { getAllpemilih, createTambahpemilih, hapusPemilih } = require("../controller/pemilih.controller");
const router = express.Router();

router.route("/")
    .get(getAllpemilih)
    .post(createTambahpemilih)
    .delete(hapusPemilih)

module.exports = router;