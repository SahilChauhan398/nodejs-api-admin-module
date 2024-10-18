import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// Get User Profile
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ id: newUser._id, email: newUser.email });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Update User Profile
export const updateUserProfile = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const userId = (req as any).user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Update fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10); // Hash new password
        if (role) user.role = role;

        await user.save();
        res.json({ message: 'User profile updated successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// List All Users with Search and Pagination
export const listUsers = async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const query = search ? { name: { $regex: search, $options: 'i' } } : {};
        const users = await User.find(query)
            .select('-password')
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        const totalUsers = await User.countDocuments(query);
        res.json({
            total: totalUsers,
            page: Number(page),
            limit: Number(limit),
            users,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

