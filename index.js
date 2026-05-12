const express = require("express")
const app = express()

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.get("/api/hello", (req, res) => {
    res.json({message: "Hello from Backend!"});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});