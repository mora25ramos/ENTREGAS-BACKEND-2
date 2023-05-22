import UserDAO from '../mongoDB/user.mongo.js';
import UserDTO from '../../dto/UserDTO.js';
import UserRepository from '../../repositories/UserRepository.js';
import bcrypt from 'bcrypt';
import Logger from '../../utils/Logger.js';
import jwt from 'jsonwebtoken';

class UserManager {
    async createUser(userData) {
        try {
            const newUser = await UserRepository.create(userData);
            Logger.info('Successfully created a new user');
            return newUser;
        } catch (error) {
            Logger.error('Error creating user', error);
            throw new Error('Error creating user');
        }
    }

    async getUserById(userId) {
        try {
            const userData = await UserRepository.getById(userId);
            const user = UserDTO.fromData(userData);
            Logger.info(`Successfully retrieved user with ID: ${userId}`);
            return user;
        } catch (error) {
            Logger.error(`Error getting user with ID: ${userId}`, error);
            throw new Error(`Error getting user with ID: ${userId}`);
        }
    }

    async getUserByEmail(email) {
        try {
            const userData = await UserRepository.getByEmail(email);
            const user = UserDTO.fromData(userData);
            Logger.info(`Successfully retrieved user with email: ${email}`);
            return user;
        } catch (error) {
            Logger.error(`Error getting user with email: ${email}`, error);
            throw new Error(`Error getting user with email: ${email}`);
        }
    }

    async updateUser(userId, userData) {
        try {
            const updatedUser = await UserRepository.update(userId, userData);
            Logger.info(`Successfully updated user with ID: ${userId}`);
            return updatedUser;
        } catch (error) {
            Logger.error(`Error updating user with ID: ${userId}`, error);
            throw new Error(`Error updating user with ID: ${userId}`);
        }
    }

    async deleteUser(userId) {
        try {
            const deletedUser = await UserRepository.delete(userId);
            Logger.info(`Successfully deleted user with ID: ${userId}`);
            return deletedUser;
        } catch (error) {
            Logger.error(`Error deleting user with ID: ${userId}`, error);
            throw new Error(`Error deleting user with ID: ${userId}`);
        }
    }

    async comparePasswords(password, hashedPassword) {
        try {
            const match = await bcrypt.compare(password, hashedPassword);
            return match;
        } catch (error) {
            Logger.error('Error comparing passwords', error);
            throw new Error('Error comparing passwords');
        }
    }

    async login(email, password) {
        try {
            const user = await this.getUserByEmail(email);

            if (!user || !await this.comparePasswords(password, user.password)) {
                Logger.error('Invalid email or password');
                throw new Error('Invalid email or password');
            }

            // Generar un token de acceso
            const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

            // Acá se establece una cookie en la respuesta con el token de acceso
            // La biblioteca cookie-parser analiza y establece las cookies
            res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 });

            Logger.info('User logged in successfully');
            return user;
        } catch (error) {
            Logger.error('Error during login', error);
            throw new Error('Error during login');
        }
    }

    async logout(req, res) {
        try {
            // Invalidar el token de acceso
            const token = req.cookies.access_token;

            // Se elimina la cookie de acceso
            res.clearCookie('access_token');

            Logger.info('User logged out successfully');
            return 'Logged out successfully';
        } catch (error) {
            Logger.error('Error during logout', error);
            throw new Error('Error during logout');
        }
    }
}

export default new UserManager();