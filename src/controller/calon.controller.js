const pool = require("../config/database");

const getAllcalon = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query("CALL panggil_semua_calon");
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



async function getAllCalonByHimpunan(req, res){
    try {
      const {p_id_himpunan} = req.body;
      const [result] = await pool.query('CALL panggil_calon_by_himpunan(?)', [p_id_himpunan] 
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  }
  
async function createTambahCalon(req, res){
    try {
      const {p_id_himpunan,p_no_urut,p_nama, p_nim,p_visi,p_misi,p_cv,p_foto} = req.body;
      const [result] = await pool.query('CALL tambah_calon(?,?,?,?,?,?,?,?)', [p_id_himpunan,p_no_urut,p_nama, p_nim,p_visi,p_misi,p_cv,p_foto] 
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  }

  async function UpdateCalon(req, res) {
    try {
      const {p_id_himpunan,p_no_urut,p_nama, p_nim,p_visi,p_misi,p_cv,p_foto} = req.body;
      const [result] = await pool.query('CALL update_calon(?, ?, ?, ?, ?, ?,?,?)', [ p_id_himpunan,p_no_urut,p_nama, p_nim,p_visi,p_misi,p_cv,p_foto]
      );      
      res.json({data : result})
      
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async function hapusCalon(req, res){
    try {
      const { p_id_calon } = req.body;
      const [result] = await pool.query('CALL hapus_calon(?)', [ p_id_calon]
      );
      res.json({data : result})
    
    } catch (err) {
      res.status(500).json({ error: err.message });
    } 
  }

module.exports = {
    getAllcalon,
    getAllCalonByHimpunan,
    createTambahCalon,
    UpdateCalon,
    hapusCalon,

};