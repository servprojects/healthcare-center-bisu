const { model, Schema,mongoose } = require('mongoose');

const PrescriptionSchema = new Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    officeInCharge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MUser'
    },
    consultData: {type: String},
    prescription:{
        type: mongoose.Schema.Types.Object,
        ref: 'PrescriptionMed'
    },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('Prescription', PrescriptionSchema);