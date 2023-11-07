"use client";

import {useAppDispatch, useAppSelector} from "@/redux/app/hook";
import {selectRegisterError} from "@/app/users/tools/usersSlice";
import {useRouter} from "next/navigation";
import {register} from "@/app/users/tools/usersThunk";
import React, {useState} from "react";
import {RegisterMutation} from "@/types";

const Registration = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const router = useRouter();

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: '',
        displayName: '',
        phone: ''
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await dispatch(register(state)).unwrap();
            router.push('/')
        } catch (e) {
            // nothing
        }
    };

    const getFieldError = (name: string) => {
        try {
            return error?.errors[name].message;
        } catch {
            return undefined;
        }
    };
    return (
        <div className="form_wrapper">
            <div className="title_container">
                <h2>Регистрация</h2>
            </div>
            <form onSubmit={submitFormHandler}>
                <input onChange={inputChangeHandler} type="email" name="email" placeholder="Email" required />
                <input onChange={inputChangeHandler} type="password" name="password" placeholder="Пароль" required />
                <input onChange={inputChangeHandler} type="text" name="displayName" placeholder="Имя" />
                <input onChange={inputChangeHandler} type="text" name="phone" placeholder="Номер телефона" required />

                <input className="button" type="submit" value="Register" />
            </form>
        </div>
    )
};

export default Registration;