const express = require("express");

const calon = require("../controller/calon.controller");
const router = express.Router();

router.get("/allcalon",calon.getAllcalon);
router.get("/byhimpunan",calon.getAllCalonByHimpunan);
router.post("/",calon.createTambahCalon);
router.patch("/",calon.UpdateCalon);
router.delete("/",calon.hapusCalon);

module.exports = router;