const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
});

module.exports = mongoose.model('Data', dataSchema);
