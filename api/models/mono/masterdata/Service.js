const { model, Schema,mongoose } = require('mongoose');

const ServiceSchema = new Schema({
    name: {type: String},
    description: {type: String},
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('Service', ServiceSchema);