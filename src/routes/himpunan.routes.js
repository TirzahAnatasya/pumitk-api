const express = require("express");

const {getAllhimpunan, createTambahhimpunan,Updatehimpunan,hapusHimpunan} = require("../controller/himpunana.controller");
const router = express.Router();

router.route("/")
    .post(createTambahhimpunan)
    .get(getAllhimpunan)
    .patch(Updatehimpunan)
    .delete(hapusHimpunan)

module.exports = router;