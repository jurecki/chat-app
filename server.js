const express = require('express')
const app = express()
var cors = require('cors')
const path = require('path')

const message = [];
app.use(cors());

app.use(express.static(path.join(__dirname, '/client')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
});




app.listen(8000, () => console.log('Server is running at http://localhost:8000'))



