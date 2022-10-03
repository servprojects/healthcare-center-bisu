const { model, Schema,mongoose } = require('mongoose');

const CompanyDetailSchema = new Schema({
    name: {type: String},
    longDescription: {type: String},
    shortDescription: {type: String},
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('CompanyDetail', CompanyDetailSchema);