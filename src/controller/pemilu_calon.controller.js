const pool = require("../config/database");

const getAllpemiluCalon = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("CALL panggil_semua_pemilu_calon");
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createTambahpemiluCalon(req, res){
    try {
      const {p_id_pemilu,p_id_calon} = req.body;
      const [result] = await pool.query('CALL tambah_pemilu_calon(?,?)', [p_id_pemilu,p_id_calon] 
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  }

  async function UpdatePemiluCalon(req, res) {
    try {
      const { p_id_pemilu_calon,p_id_pemilu,p_id_calon} = req.body;
      const [result] = await pool.query('CALL Update_pemilu_calon(?, ?, ?)', [ p_id_pemilu_calon,p_id_pemilu,p_id_calon]
      );      
      res.json({data : result})
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async function hapusPemiluCalon(req, res){
    try {
      const { p_id_pemilu_calon } = req.body;
      const [result] = await pool.query('CALL hapus_pemilu_calon(?)', [ p_id_pemilu_calon]
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
  }

module.exports = {
    getAllpemiluCalon,
    createTambahpemiluCalon,
    UpdatePemiluCalon,
    hapusPemiluCalon,
};