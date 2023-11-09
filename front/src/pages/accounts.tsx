import React, {useRef, useState } from 'react';
import Login from "@/components/reg&logForms/Login";
import Register from "@/components/reg&logForms/Register";
import acc from '@/components/reg&logForms/accounts.module.scss';

const Accounts = () => {
    const [isLoginActive, setIsLoginActive] = useState(true);
    let container = useRef<HTMLDivElement | null>(null);
    let currentRef = useRef<HTMLDivElement | null>(null);
    let rightSideRef = useRef<HTMLDivElement | null>(null);

    const changeState = () => {
            if (isLoginActive) {
                rightSideRef.current?.classList.remove("right");
                rightSideRef.current?.classList.add("left");
            } else {
                rightSideRef.current?.classList.remove("left");
                rightSideRef.current?.classList.add("right");
            }
            setIsLoginActive(!isLoginActive);
    };

    const current = isLoginActive ? "Register" : "Login";
    const currentActive = isLoginActive ? "login" : "register";

    return (
        <div className={acc.App}>
            <div className={acc.login}>
                <div className={acc.container} ref={container}>
                    {isLoginActive && <Login containerRef={currentRef} />}
                    {!isLoginActive && <Register containerRef={currentRef} />}
                </div>
                <RightSide
                    current={current}
                    currentActive={currentActive}
                    containerRef={rightSideRef}
                    onClick={changeState}
                />
            </div>
        </div>
    );
};

interface RightSideProps {
    current: string;
    currentActive: string;
    containerRef: React.RefObject<HTMLDivElement>;
    onClick: () => void;
}

const RightSide: React.FC<RightSideProps> = props => {
    return (
        <div
            className={acc.rightSide}
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className={acc.innerContainer}>
                <div className={acc.text}>{props.current}</div>
            </div>
        </div>
    );
};

export default Accounts;