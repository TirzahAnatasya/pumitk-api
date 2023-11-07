const pool = require("../config/database");

const getAllpemilih = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("CALL tampilkan_pemilih");
        connection.release();
        res.json(rows[0][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createTambahpemilih(req, res){
    try {
      const {p_email,p_id_calon,p_id_pemilu} = req.body;
      const [result] = await pool.query('CALL tambah_pemilih(?,?,?)', [p_email,p_id_calon,p_id_pemilu] 
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  }

  async function hapusPemilih(req, res){
    try {
      const { p_id_pemilih } = req.body;
      const [result] = await pool.query('CALL hapus_pemilih(?)', [ p_id_pemilih]
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
  }

module.exports = {
    getAllpemilih,
    createTambahpemilih,
    hapusPemilih
};