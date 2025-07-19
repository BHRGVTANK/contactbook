import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

// User Auth Routes
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Contact CRUD Routes
router.post("/addcontact", AuthController.addcontact);              // Create
router.get("/getcontacts", AuthController.getcontacts);            // Read all
router.get("/contact/:id", AuthController.getcontactbyid);        // Read single
router.put("/contact/:id", AuthController.updatecontact);        // Update
router.delete("/contact/:id", AuthController.deletecontact);    // Delete

router.get("/getusers", AuthController.getusers);

router.post("/logout", AuthController.logout);

export default router;
