const express = require("express")
const db = require("./db");
const bcrypt = require("bcryptjs")

const app = express()

app.use(express.json());

// login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username, Password are Required"
        })
    }

    const sql = "SELECT * FROM users WHERE username = ?";
    
    db.query(sql, [username], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        const user = result[0];

        const IsMatch = bcrypt.compareSync(password, user.password);

        if (!IsMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            })
        }

        res.json({
            message: "Login Success",
            user: {
                id: user.id,
                username: user.username,
                address: user.address
            }
        });
    });
});

// register
app.post("/register", (req, res) => {
    const { username, password, address } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (username, password, address) VALUES (?, ?, ?)";

    db.query(sql, [username, hash, address || null], (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json({ 
                message: "Resgister success" 
            })
        }
    })
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});