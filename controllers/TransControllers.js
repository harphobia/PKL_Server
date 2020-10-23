const db = require("../configs/mysql");

class TransControllers {
  index = (req, res) => {
    db.query("SELECT * FROM `transaksi`", (err, resl) => {
      if (err) throw res.send(err);

      res.send(resl);
    });
  };

  view = (req, res) => {
    const { id } = req.params;
    db.query(
      "SELECT * FROM `transaksi` WHERE ID_TRANSAKSI =" + id + ";",
      (err, resl) => {
        if (err) throw res.send(err);

        res.send(resl);
      }
    );
  };

  remove = (req, res) => {
    const { id } = req.params;
    db.query(
      "DELETE FROM `transaksi` WHERE ID_TRANSAKSI =" +
        id +
        ";DELETE FROM `invoice_penjualan` WHERE ID_TRANSAKSI =" +
        id +
        ";",
      (err, resl) => {
        if(err) throw err

        console.log(resl)
        if(resl[0].affectedRows > 0){
            res.json({
              success:true,
              message:"Berhasil menghapus transaksi"
            })
          }else{
            res.json({
              success:false,
              message:"gagal menghapus transakasi"
            })
          }
      }
    );
  };
}

module.exports = new TransControllers();
