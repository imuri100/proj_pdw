import { FaUserAlt } from "react-icons/fa";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";
import styles from "./header.module.scss";
import { ForgetPassword } from "../ForgetPassword/ForgotPassword";

export function Header() {
    function logOut() {
        localStorage.setItem("myData", "");
    }

    const [modalState, setmodalState] = useState(false);

    function openModal() {
        setmodalState(true);
    }

    function closeModal() {
        setmodalState(false);
    }

    return (
        <div className={styles.header}>
            <h3>Xpense App</h3>

            <DropdownButton
                id="dropdown-basic-button"
                title={<FaUserAlt size={30} />}
            >
                <Dropdown.Item onClick={openModal}>
                    Change Password
                </Dropdown.Item>
                <Dropdown.Item href="/" onClick={logOut}>
                    Logout
                </Dropdown.Item>
            </DropdownButton>
            <ForgetPassword modalState={modalState} closeModal={closeModal} />
        </div>
    );
}
