const Data = require("../models/data.model");

// Create
exports.createData = async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ message: "Error creating data", error: err.message });
  }
};

exports.getData = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  try {
    const data = await Data.find(query)
      .limit(limit * 1) 
      .skip((page - 1) * limit) 
      .sort({ name: 1 }); 

    const count = await Data.countDocuments(query);

    res.json({
      data, 
      totalPages: Math.ceil(count / limit), 
      currentPage: parseInt(page),
      totalRecords: count, 
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving data", error: err.message });
  }
};

// Update
exports.updateData = async (req, res) => {
  try {
    console.log("update data ======", req.body, req.params);
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: "Error updating data", error: err.message });
  }
};

// Delete
exports.deleteData = async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting data", error: err.message });
  }
};
