import { Router } from 'express';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
