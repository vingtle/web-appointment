const express = require("express");
const treatmentActions = require("../../../controllers/treatmentActions");
const authenticate = require("../../../services/authenticate");
const isAdmin = require("../../../services/isAdminMiddleware");

const router = express.Router();

router.use(authenticate); // Protect all admin routes
router.use(isAdmin);

router.get("/", treatmentActions.getAllTreatments);
router.get("/category",authenticate, treatmentActions.getTreatmentsByCategory);
router.post("/", treatmentActions.addTreatment);
router.put("/:id", treatmentActions.updateTreatment);
router.delete("/:id", treatmentActions.deleteTreatment);

module.exports = router;
