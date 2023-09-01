require('dotenv').config();
const express = require('express');
const cors = require('cors');
const appRoute = require('./routes');
require('./models');
require('./configs/web3Config');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1', appRoute);
app.get("/test", (req, res) => {
    res.status(200).json({
        message: "Hello World.",
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Sever is listening on port: ${port}`);
});
