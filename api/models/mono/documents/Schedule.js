const { model, Schema, mongoose } = require("mongoose");

const ScheduleSchema = new Schema({
    day:  { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    time: [{ type: String }],
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = model("Schedule", ScheduleSchema);
