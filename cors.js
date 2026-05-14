const cors = require("cors")

const corsObtions = {
    origin: "http://localhost:5173",
    medthod: ["GET", "POST", "PUT", "DELETE"],
    Credential: true,
}

module.exports = cors(corsObtions);