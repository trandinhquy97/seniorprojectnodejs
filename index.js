const express = require('express')
const bodyParser = require('body-parser')
const busboy = require('connect-busboy')
const busboyBodyParser = require('busboy-body-parser')

const app = express()
app.use(busboy())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(busboyBodyParser())

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

app.post('/api/books', function (req, res) {
    var book_id = req.body.id;
    var bookName = req.body.token;
    //Send the response back
    res.send(book_id + ' ' + bookName);
});

const routes = require("./routes/route")
// const swaggerDoc = require('./swaggerDoc')
routes(app)
// swaggerDoc(app)

