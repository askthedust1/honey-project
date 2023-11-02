import {Schema, model, Model, HydratedDocument} from 'mongoose';
import bcrypt from 'bcrypt';
import {randomUUID} from 'crypto';
import {IUserApi} from '../types';

const SALT_WORK_FACTOR = 10;

export interface IUserMethods extends IUserApi {
    checkPassword(password: string): Promise<boolean>;

    generateToken(): void;
}

type UserModel = Model<IUserApi, object, IUserMethods>;

const UserSchema = new Schema<IUserApi, UserModel, IUserMethods>({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (this: HydratedDocument<IUserApi>, valueUserName: string) {
                if (!this.isModified('email')) return true;
                const user = await User.findOne({email: valueUserName});
                if (user) return false;
            },
            message: 'This user is already registered',
        },
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    googleID: String,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

const User = model<IUserApi, UserModel>('User', UserSchema);

export default User;
