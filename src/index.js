import express from "express";
import router from "./router.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hallo Webhook</h1>")
})

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
