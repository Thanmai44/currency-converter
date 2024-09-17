const dotenv = require("dotenv").config();
const axios = require("axios");
const express = require("express");
const rateLimit = require("express-rate-limit");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();

const API_URL = 'https://v6.exchangerate-api.com/v6/';
const API_KEY = process.env.API_KEY; 

app.use(express.json());
app.use(cors());

const applimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
});

app.use(applimiter);

app.post("/api/convert", async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        console.log({ from, to, amount });

        const url = `${API_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
        const response = await axios.get(url);

        console.log(response.data);
        res.status(200).json({
            success: true,
            conversion_result: response.data.conversion_result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while converting the currency.",
        });
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
