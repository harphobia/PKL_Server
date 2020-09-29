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
      "SELECT * FROM `transaksi` WHERE ID_TRANSAKSI =" +
        id +
        ";DELETE FROM `invoice` WHERE NO_INVOICE =" +
        id +
        ";",
      (err, resl) => {
        if (err) throw res.send(err);

        res.send(resl);
      }
    );
  };
}

module.exports = new TransControllers();
