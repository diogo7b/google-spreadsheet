const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer')
const upload = multer()
const app = express()

require('dotenv').config()
const port = process.env.PORT

const {addData} = require('./functions/access-spreadsheet.js')

// Pagina Estática
app.use(express.static('public'));

// Midlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

app.post('/api/savedata', upload.any(), addData);

app.listen(port, () => {
    console.log(`Server running. http://localhos:${port}`)
})