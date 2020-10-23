const { json } = require('express');
const db = require('../configs/mysql');


class InvoiceControllers {

    view = (req, res) => {
        const { id } = req.params
        db.query("SELECT invoice_penjualan.ID_PENJUALAN, barang.NAMA_BARANG, barang.HARGA_BARANG, invoice_penjualan.JUMLAH_BARANG, invoice_penjualan.TOTAL_HARGA FROM barang INNER JOIN invoice_penjualan ON invoice_penjualan.ID_BARANG = barang.ID_BARANG WHERE invoice_penjualan.ID_TRANSAKSI = "+id+";", (err, resl) => {
            if (err) res.send(err)

            let total = 0;

            resl.forEach(el => {
                total = total + el.TOTAL_HARGA
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
            if (err) throw err

            res.json({
                success: true,
                data : resl
            })
        })
    }

}

module.exports = new InvoiceControllers()