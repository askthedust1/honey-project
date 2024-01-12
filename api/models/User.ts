import { Schema, model, Model, HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { IUserApi } from '../types';

const SALT_WORK_FACTOR = 10;

export interface IUserMethods extends IUserApi {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<IUserApi, object, IUserMethods>;

const UserSchema = new Schema<IUserApi, UserModel, IUserMethods>({
  email: {
    type: String,
    required: [true, 'Почта обязательна к заполнению'],
    unique: true,
    lowercase: true,
    validate: {
      validator: async function (this: HydratedDocument<IUserApi>, valueUserName: string) {
        if (!this.isModified('email')) return true;
        const user = await User.findOne({ email: valueUserName });
        if (user) return false;

        if (valueUserName.trim().length === 0) {
          return false;
        }

        return /^\S+@\S+\.\S+$/.test(valueUserName);
      },
      message: (props) => {
        if (props.value.trim().length === 0) {
          return 'Email не может содержать только пробелы';
        }
        if (!/^\S+@\S+\.\S+$/.test(props.value)) {
          return 'Неверный формат email';
        }
        return 'Такой email уже зарегистрирован!';
      },
    },
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен к заполнению'],
    minLength: [4, 'Пароль должен состоять из четерех или более символов'],
    validate: {
      validator: function(value: string) {
        return value.trim().length > 0;
      },
      message: 'Пароль не может состоять только из пробелов',
    },
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
    required: [true, 'Имя обязательно к заполнению'],
    validate: {
      validator: function (this: HydratedDocument<IUserApi>, valueUserName: string) {
        return valueUserName.trim().length > 0;
      },
      message: 'Имя не может содержать только пробелы!',
    },
  },
  phone: {
    type: String,
    required: [true, 'Телефон обязателен к заполнению'],
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<IUserApi>, valueUserName: string) {
        if (!this.isModified('phone')) return true;

        const user = await User.findOne({ phone: valueUserName });
        if (user) return false;

        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(valueUserName.trim());
      },
      message: (props) => {
        if (props.value.trim().length === 0) {
          return 'Телефон не может содержать только пробелы';
        }
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(props.value)) {
          return 'Неверный формат телефона';
        }
        return 'Такой телефон уже зарегистрирован';
      },
    },
  },
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
