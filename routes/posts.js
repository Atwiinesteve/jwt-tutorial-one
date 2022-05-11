// Importing Modules
// ===================================
const express = require('express');
const verify = require('../routes/verifyToken.js');
// ===================================



// ===================================
// Main Router setup.
const router = express.Router();
// ===================================



// ===================================
// Posts Route.
router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'My First JWT Post.',
            description: 'Random data that you should not access.'
        }
    })
    res.json(req.user)
});
// ===================================



// ===================================
// Export Router
module.exports = router;
// ===================================