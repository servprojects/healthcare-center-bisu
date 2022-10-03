const { model, Schema,mongoose } = require('mongoose');

const MedicineSchema = new Schema({
    name: {type: String},
    description: {type: String},
    count: {type: String},
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('Medicine', MedicineSchema);