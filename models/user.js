// Importing Modules
// ===================================
const express = require('express');
const mongoose = require('mongoose');
// ===================================



// ===================================
// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        max: 255,
        min: 3
    },
    email: {
        type: 'String',
        required: true,
        max: 255,
    },
    password: {
        type: 'String',
        min: 6,
        required: true
    },
    date: {
        type: 'Date',
        default: Date.now
    }
});
// ===================================



// ===================================
// Exporting User Schema
module.exports = mongoose.model('User', userSchema);