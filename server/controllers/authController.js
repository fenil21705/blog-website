const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const userCount = await User.count();
        const role = userCount === 0 ? 'admin' : 'user';

        const user = await User.create({
            username,
            email,
            password,
            role
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (user && (await user.comparePassword(password))) {
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (user) {
            const { username, email } = req.body;

            // Check if email is already taken by another user
            if (email && email !== user.email) {
                const emailExists = await User.findOne({ where: { email } });
                if (emailExists) {
                    return res.status(400).json({ message: 'Email already in use' });
                }
            }

            user.username = username || user.username;
            user.email = email || user.email;

            await user.save();

            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] },
    });
    res.json(user);
};


exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            order: [['createdAt', 'DESC']],
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Hash new password manually since hook is beforeCreate
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {

    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            if (user.role === 'admin') {
                return res.status(400).json({ message: 'Cannot delete admin user' });
            }
            await user.destroy();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.forceCreateAdmin = async (req, res) => {
    try {
        await User.destroy({ where: { email: 'admin@test.com' } });

        const user = await User.create({
            username: 'SuperAdmin',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin'
        });

        res.json({
            message: 'Admin User Created Successfully',
            email: 'admin@test.com',
            password: 'password123',
            login_url: 'https://fenil21705.github.io/blog-website/admin'
        });
    } catch (error) {
        res.json({ message: 'Error creating admin', error: error.message });
    }
};
