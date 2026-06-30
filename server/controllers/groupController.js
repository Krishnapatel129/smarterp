import pool from "../config/db.js";

export const createGroup = async (req, res) => {
  try {
    const { group_name, parent_group, description } = req.body;

    const result = await pool.query(
      `INSERT INTO groups 
      (group_name, parent_group, description)
      VALUES ($1,$2,$3)
      RETURNING *`,
      [group_name, parent_group, description]
    );

    res.status(201).json({
      message: "Group created successfully",
      group: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Group creation failed", error: error.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM groups ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch groups", error: error.message });
  }
};

export const getGroupById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM groups WHERE id=$1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch group", error: error.message });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { group_name, parent_group, description } = req.body;

    const result = await pool.query(
      `UPDATE groups SET
        group_name=$1,
        parent_group=$2,
        description=$3
      WHERE id=$4
      RETURNING *`,
      [group_name, parent_group, description, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({
      message: "Group updated successfully",
      group: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: "Group update failed", error: error.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM groups WHERE id=$1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Group delete failed", error: error.message });
  }
};