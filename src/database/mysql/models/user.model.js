import { Schemas } from "../setup";
import { toPlain, formatDate } from "../../../utils";
import bcrypt from 'bcrypt';

export const formatUser = (user) => {
    return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: formatDate(user.createdAt),
        updatedAt: formatDate(user.updatedAt),
    };
};

export const getUserByPhone = async (phone, hasPassword = false) => {
    const _user = await Schemas.User.findOne({ where: { phone } })
    if (!_user) return null
    const user = toPlain(_user)
    return { ...formatUser(user), ...(hasPassword ? { password: user.password } : {}) }
};

export const getUserByEmail = async (email, hasPassword = false) => {
    const _user = await Schemas.User.findOne({ where: { email } })
    if (!_user) return null
    const user = toPlain(_user)
    return { ...formatUser(user), ...(hasPassword ? { password: user.password } : {}) }
};

export const getUserById = async (id) => {
    const user = await Schemas.User.findOne({ where: { id } })
    return user ? formatUser(user) : null
};

export const createUser = async ({ firstName = "", lastName = "", email = "", password = "", phone = "" }) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password.toString(), salt)
    const user = await Schemas.User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hash
    })
    return formatUser(toPlain(user))
}