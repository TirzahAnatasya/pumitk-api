const pool = require("../config/database");

const getAllKpu= async (req, res) => {
  try {
      const connection = await pool.getConnection();
      const rows = await connection.query("CALL tampilkan_nama_kpu");
      connection.release();
      console.log(rows[0][0])
      res.json(rows[0][0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createTambahKpu(req, res){
    try {
      const {p_email,p_password} = req.body;
      const [result] = await pool.query('CALL tambah_kpu(?,?)', [p_email,p_password] 
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  }

  async function PerbaharuiKpu(req, res) {
    try {
      const { p_id_kpu,p_email,p_password} = req.body;
      const [result] = await pool.query('CALL perbaarui_kpu(?, ?, ?)', [ p_id_kpu,p_email,p_password]
      );      
      res.json({data : result})
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async function hapusKpu(req, res){
    try {
      const { p_id_kpu } = req.body;
      const [result] = await pool.query('CALL hapus_kpu(?)', [ p_id_kpu]
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
  }

module.exports = {
    getAllKpu,
    createTambahKpu,
    PerbaharuiKpu,
    hapusKpu,
};