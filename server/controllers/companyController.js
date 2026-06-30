import pool from "../config/db.js";

export const createCompany = async (req, res) => {
  try {
    const {
      company_name,
      owner_name,
      email,
      phone,
      gst_number,
      pan_number,
      address,
      state,
      pincode,
      financial_year,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO companies 
      (company_name, owner_name, email, phone, gst_number, pan_number, address, state, pincode, financial_year)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`,
      [company_name, owner_name, email, phone, gst_number, pan_number, address, state, pincode, financial_year]
    );

    res.status(201).json({
      message: "Company created successfully",
      company: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Company creation failed", error: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companies ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies", error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companies WHERE id=$1", [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch company", error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const {
      company_name,
      owner_name,
      email,
      phone,
      gst_number,
      pan_number,
      address,
      state,
      pincode,
      financial_year,
    } = req.body;

    const result = await pool.query(
      `UPDATE companies SET
        company_name=$1,
        owner_name=$2,
        email=$3,
        phone=$4,
        gst_number=$5,
        pan_number=$6,
        address=$7,
        state=$8,
        pincode=$9,
        financial_year=$10
      WHERE id=$11
      RETURNING *`,
      [company_name, owner_name, email, phone, gst_number, pan_number, address, state, pincode, financial_year, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      message: "Company updated successfully",
      company: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Company update failed", error: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM companies WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Company delete failed", error: error.message });
  }
};