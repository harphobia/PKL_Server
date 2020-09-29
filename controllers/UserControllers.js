const db = require('../configs/mysql');


class UserControllers {

    index = (req, res) => {
        db.query('SELECT * FROM user', (err, result) => {
            if (err) res.send(err)

            res.send(result)
        })
    }

    update = (req, res) => {
        const { email, password } = req.body
        const { id } = req.params

        console.log(email, password)
        if (email && password) {
            db.query("UPDATE `user` SET `EMAIL_USER` = '" + email + "', `PASSWORD_USER` = '" + password + "' WHERE `user`.`ID_USER` = " + id + ";", (err, resl) => {
                if (err) res.send(err)
                res.send(resl)
            })
        } else {
            res.send('pastikan mengisi semua yang diperlukan')
        }
    }

    login = (req, res) => {
        res.send('sukses login')
    }

    logout = (req, res) => {
        res.send('sukses logout')
    }

}


module.exports = new UserControllers()