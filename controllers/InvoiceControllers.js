const { json } = require('express');
const db = require('../configs/mysql');


class InvoiceControllers {

    view = (req, res) => {
        const { id } = req.params
        db.query("SELECT barang.NAMA_BARANG, barang.HARGA_BARANG, invoice.JUMLAH FROM barang INNER JOIN invoice ON invoice.ID_BARANG = barang.ID_BARANG WHERE invoice.NO_INVOICE =" + id + ";", (err, resl) => {
            if (err) res.send(err)

            let total = 0;

            resl.forEach(el => {
                total = total + (el.HARGA_BARANG * el.JUMLAH)
            })

            res.json({
                items: resl,
                total
            })
        })

    }

    remove = (req, res) => {
        const { id } = req.params

        db.query("DELETE FROM `invoice` WHERE NO_INVOICE =" + id + ";", (err, resl) => {
            if (err) res.send(err)

            res.send(resl)
        })
    }

}

module.exports = new InvoiceControllers()