const { model, Schema, mongoose } = require("mongoose");

const PrescMedsSchema = new Schema({
    medicines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine'
    }],
    count: { type: Number },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("PrescriptionMed", PrescMedsSchema);
