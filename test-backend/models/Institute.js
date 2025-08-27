const mongoose = require('mongoose')

const InstituteSchema = new mongoose.Schema({
    InstiName: {
        type: String,
        required: True
    },
    InstiType: {
        type: String,
        required: True
    },
    Established: {
        type: Date,
        required: True
    },
    Board: {
        type: String,
        required: True
    },
    Email: {
        type: String,
        required: True
    },
    PhNum: {
        type: String,
        required: True
    }
})