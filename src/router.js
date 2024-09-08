import express from "express";
import controller  from "./controller.js";

const router = express.Router();

router.post("/subdomainly", controller.subdomainly);

export default router
