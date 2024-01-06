import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({
        message: 'Server route is working!',
    });
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
       return next(errorHandler(401, 'You can only update your own account!'));
    
    try {
        if( req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    userFirstName: req.body.userFirstName,
                    userLastName: req.body.userLastName,
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    dateOfBirth: req.body.dateOfBirth,
                    password: req.body.password,
                    preferences: req.body.preferences,
                    avatar: req.body.avatar,
                },
            },
            {neq: true}
        );

        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};