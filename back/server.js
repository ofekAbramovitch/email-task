const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
require('dotenv').config()

const app = express();
const http = require("http").createServer(app);

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "public")));
} else {
    const corsOptions = {
        origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
        credentials: true,
    };
    app.use(cors(corsOptions));
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require("./api/user/user.routes");
const emailRoutes = require("./api/email/email.routes");

const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use("/api/user", userRoutes);
app.use("/api/email", emailRoutes);

app.get("/**", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info("Server is running on port: " + port);
});
