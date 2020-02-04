const express = require('express');
const fs = require('fs');;
const router = express.Router();

const path = "./messages";

const fileName = fName => {
    return `./messages/${fName}.txt`
};
router.use(express.json());
router.get('/', (req, res) => {
    let messages = [];
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
           const data = fs.readFileSync(path + '/' + file);
           messages.push(JSON.parse(data.toString()));

        });
        res.send(messages.slice(-5).reverse());
    });

});
router.post('/', (req, res) => {
    const date = new Date();
    const data = JSON.stringify({...req.body, dateTime: date.toISOString()});
    res.send(req.body);
    fs.writeFile(fileName(date.toISOString()), data, err => {
        if (err) {
            console.log(err)
        } else {
            console.log('OK')
        }
    })
});


module.exports = router;