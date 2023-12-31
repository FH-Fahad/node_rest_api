const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Create a user
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    });

    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// Get a specific user
router.get('/:userId', getUser, (req, res) => {
    res.json(res.user);
});

// Update a user
router.patch('/:userId', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.age != null) {
        res.user.age = req.body.age;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:userId', getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: 'Deleted user' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//middleware
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.userId);
        if (user == null) {
            return res.status(404).json({ message: 'User Not Found' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;