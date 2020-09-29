const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dummy_pkl',
    multipleStatements: true
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Sukses connect DB')
})

module.exports = connection