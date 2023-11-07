const express = require("express");

const pemilu = require("../controller/pemilu.controller");
const router = express.Router();

router.get("/",pemilu.getAllpemilu);
router.post("/",pemilu.createTambahpemilu);
router.put("/",pemilu.UpdateInformasiPemilu);
router.delete("/",pemilu.hapusPemilu);

module.exports = router;