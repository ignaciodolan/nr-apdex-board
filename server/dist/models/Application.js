"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const applicationSchema = new Schema({
    name: {
        type: String,
        required: 'Enter name'
    },
    contributors: [String],
    version: {
        type: String
    },
    hosts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Host'
        }
    ],
    apdex: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
const Application = mongoose.model('Application', applicationSchema);
exports.default = Application;
//# sourceMappingURL=Application.js.map