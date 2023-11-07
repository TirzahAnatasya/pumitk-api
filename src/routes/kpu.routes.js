const express = require("express");

const { getAllKpu, createTambahKpu, PerbaharuiKpu, hapusKpu } = require("../controller/kpu.controller");
const router = express.Router();

router.route("/")
    .get(getAllKpu)
    .post(createTambahKpu)
    .put(PerbaharuiKpu)
    .delete(hapusKpu)

module.exports = router;