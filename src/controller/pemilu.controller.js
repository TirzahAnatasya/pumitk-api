const pool = require("../config/database");

const getAllpemilu = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("CALL menampilkan_semua_data_pemilu");
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createTambahpemilu(req, res){
    try {
      const {p_is_himpunan,p_id_himpunan, p_start_date, p_end_date, p_is_done} = req.body;
      const [result] = await pool.query('CALL tambah_pemilu(?,?,?,?,?)', [p_is_himpunan,p_id_himpunan, p_start_date, p_end_date, p_is_done] 
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  }

  async function UpdateInformasiPemilu(req, res) {
    try {
      const { p_id_pemilu,p_is_himpunan,p_id_himpunan,p_start_date,p_end_date,p_is_done} = req.body;
      const [result] = await pool.query('CALL Update_pemilu(?, ?, ?, ?, ?, ?)', [ p_id_pemilu,p_is_himpunan,p_id_himpunan,p_start_date,p_end_date,p_is_done]
      );      
      res.json({data : result})
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async function hapusPemilu(req, res){
    try {
      const { p_id_pemilu } = req.body;
      const [result] = await pool.query('CALL hapus_pemilu(?)', [ p_id_pemilu]
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
  }

module.exports = {
    getAllpemilu,
    createTambahpemilu,
    UpdateInformasiPemilu,
    hapusPemilu,

};