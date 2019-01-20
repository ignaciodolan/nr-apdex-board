"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.HostSchema = new Schema({
    url: {
        type: String,
        required: 'Enter url'
    },
    applications: [
        {
            type: Schema.Types.ObjectId, ref: 'Application'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=Host.js.map