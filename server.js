const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const contentRoute = require('./routes/contentRoute');
const path = require('path')
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/content', contentRoute);

const PORT = 8000;

if (process.env.NODE_ENV == 'production'){
    app.use(express.static('client/public'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
    });
}

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is Running on Port http://localhost:${PORT}`);
})