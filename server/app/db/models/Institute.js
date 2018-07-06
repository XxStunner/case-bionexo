const mongoose = require('mongoose');
/**
 * Creates Institutes Model
 */
const instituteSchema  = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    phone: String,
    loc: {
        type: {type:String},
        coordinates: [Number],
    },
    scores: {
        size: Number,
        adaptation_for_seniors: Number,
        medical_equipment: Number,
        medicine: Number
    },
    created_at: Date,
    updated_at: Date,
});
/**
 * Adds a index to use later on the search
 */
instituteSchema.index({ loc: '2dsphere' });

module.exports = mongoose.model('Institute' , instituteSchema);
