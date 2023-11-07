const pool = require("../config/database");

const getAllhimpunan= async (req, res) => {
    try {
      console.log(req.user)
        const connection = await pool.getConnection();
        const rows = await connection.query("CALL panggil_semua_himpunan");
        connection.release();
        res.json(rows[0][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


async function createTambahhimpunan(req, res){
    try {
      const {in_id,in_nama} = req.body;
      const [result] = await pool.query('CALL tambah_himpunan(?,?)', [in_id,in_nama] 
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  }

  async function Updatehimpunan(req, res) {
    try {
      const {p_id_himpunan,p_nama} = req.body;
      const [result] = await pool.query('CALL Update_himpunan (?, ?)', [p_id_himpunan,p_nama]
      );      
      res.json({data : result})
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async function hapusHimpunan(req, res){
    try {
      const { p_id_himpunan } = req.body;
      const [result] = await pool.query('CALL hapus_himpunan(?)', [p_id_himpunan]
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
  }

module.exports = {
    getAllhimpunan,
    createTambahhimpunan,
    Updatehimpunan,
    hapusHimpunan
};