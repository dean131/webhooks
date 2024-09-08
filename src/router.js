import express from "express";
import controller from "./controller.js";

const router = express.Router();

router.post("/", controller.subdomainly);

export default router;
