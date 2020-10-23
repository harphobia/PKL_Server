const db = require("../configs/mysql");

class BarangControllers {

    index = (req,res) =>{
        db.query("SELECT * FROM `barang`",(err,resl)=>{
            if(err) throw err

            res.json({
                success: true,
                data : resl
            })
        })
    }

    getBarang = (req,res) =>{
        const {id} = req.params

        db.query("SELECT * FROM `barang` WHERE `ID_BARANG` ="+id+";",(err,resl)=>{
            if (err) throw err

            res.json({
                success: true,
                data : resl
            })
        })
    }

    createbarang = (req,res) =>{

        const {nama,jenis,stok,harga,lokasi,nomer} = req.body.data

        db.query("INSERT INTO `barang` (`ID_BARANG`, `NAMA_BARANG`, `JENIS_BARANG`, `STOK_BARANG`, `HARGA_BARANG`, `LOKASI_BARANG`, `NO_BARANG`) VALUES (NULL, '"+nama+"', '"+jenis+"', '"+stok+"', '"+harga+"', '"+lokasi+"', '"+nomer+"');",(err,resl)=>{
            if(err) throw err

            if(resl.affectedRows == 1){
                res.json({
                  success:true,
                  message:"Berhasil membuat barang"
                })
              }else{
                res.json({
                  success:false,
                  message:"gagal membuat barang"
                })
              }
        })
    }

    updateBarang = (req,res) => {

        const {id} = req.params
        const {nama,jenis,stok,harga,lokasi,nomer} = req.body.data

        db.query("UPDATE `barang` SET `NAMA_BARANG` = '"+nama+"', `JENIS_BARANG` = '"+jenis+"', `STOK_BARANG` = '"+stok+"', `HARGA_BARANG` = '"+harga+"', `LOKASI_BARANG` = '"+lokasi+"', `NO_BARANG` = '"+nomer+"' WHERE `barang`.`ID_BARANG` = "+id+";",(err,resl)=>{
            
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

    }

    deleteBarang = (req,res) =>{
        const {id} = req.params

        db.query("DELETE FROM `barang` WHERE `ID_BARANG` ="+id+";",(err,resl)=>{

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



}

module.exports = new BarangControllers()