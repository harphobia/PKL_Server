const { json } = require("express");
const db = require("../configs/mysql");

class UserControllers {

  create =(req,res)=>{
    const { nama,nickname,no_telp,email, password } = req.body.data

    db.query("INSERT INTO `user` (`NAMA_USER`, `NICKNAME_USER`, `EMAIL_USER`, `PASSWORD_USER`, `TELP_USER`, `AKSES_USER`, `is_online`) VALUES ('"+nama+"', '"+nickname+"', '"+email+"', '"+password+"', '"+no_telp+"', '0', '0');",(err,resl)=>{
        if(err) throw err

        if(resl.affectedRows == 1){
          res.json({
            success:true,
            message:"Berhasil membuat user"
          })
        }else{
          res.json({
            success:false,
            message:"gagal membuat user"
          })
        }
    })
  }


  index = (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
      if (err) res.send(err);

      res.send(result);
    });
  };

  getUser = (req, res) => {
    const {id} = req.params
    db.query("SELECT * FROM `user` WHERE `ID_USER` = "+id+";", (err, result) => {
      if (err) res.send(err);

      res.send(result);
    });
  }

  update = (req, res) => {
    const { nama,nickname,no_telp,email, password } = req.body.data
    const { id } = req.params;

    db.query("UPDATE `user` SET `NAMA_USER` = '"+nama+"', `NICKNAME_USER` = '"+nickname+"', `EMAIL_USER` = '"+email+"', `PASSWORD_USER` = '"+password+"', `TELP_USER` = '"+no_telp+"' WHERE `user`.`ID_USER` = "+id+";",(err,resl)=>{
      if(err) throw err

        if(resl.affectedRows == 1){
          res.json({
            success:true,
            message:"Berhasil Diubah"
          })
        }else{
          res.json({
            success:false,
            message:"gagal Diubah"
          })
        }
    })
  };

  remove = (req,res)=>{
    const {id} = req.params

    db.query("DELETE FROM `user` WHERE `ID_USER` = "+id+";",(err,resl)=>{

        if(err) throw err

        if(resl.affectedRows == 1){
          res.json({
            success:true,
            message:"Berhasil dihapus"
          })
        }else{
          res.json({
            success:false,
            message:"gagal dihapus"
          })
        }

    })

  }

  login = (req, res) => {
    const { email, password} = req.body;

    if (email !== "" && password !== "") {
      db.query(
        "SELECT * FROM user WHERE EMAIL_USER ='" + email + "';",
        (err, resl) => {
          if (err) throw err;

          if (resl.length == 0) {
            res.json({
              success: false,
              message: ["User Tidak ditemukan"],
            });
          } else {
            if (password !== resl[0].PASSWORD_USER) {
              res.json({
                success: false,
                message: ["Password salah, silahkan masukkan password kembali"],
              });
            } else {
              db.query("UPDATE `user` SET `is_online` = '1' WHERE `user`.`ID_USER` = "+resl[0].ID_USER+";",(errs,resls)=>{
                if(err) throw errs
                if(resls.affectedRows == 1){
                  res.json({
                    success: true,
                    user:{
                      id : resl[0].ID_USER,
                      nama : resl[0].NAMA_USER,
                      akses:resl[0].AKSES_USER
                    }
                  });
                }
              })
            }
          }
        }
      );
    }
  };

  logout = (req, res) => {
    const {id} = req.params
    db.query("UPDATE `user` SET `is_online` = '0' WHERE `user`.`ID_USER` = "+id+";",(err,resl)=>{
      if(err) throw err

      if(resl.affectedRows == 1){
          res.json({
            success:true,
            message:"Berhasil Logout"
          })
        }else{
          res.json({
            success:false,
            message:"gagal Logout"
          })
        }
    })}
}

module.exports = new UserControllers();
