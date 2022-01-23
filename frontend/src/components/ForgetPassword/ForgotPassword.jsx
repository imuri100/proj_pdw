import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import styles from "./forgotPassword.module.scss";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export function ForgetPassword({ modalState, closeModal }) {
    const [password, setPassword] = useState("");
    const [password_Confirm, setPassword_Confirm] = useState("");

    function resetPassword(event) {
        const token = localStorage.getItem("myData");
        event.preventDefault();

        axios
            .put(
                "http://localhost:8000/Reset",
                {
                    password,
                    password_Confirm,
                    token,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
        closeModal();
    }

    return (
        <Modal
            isOpen={modalState}
            onRequestClose={closeModal}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <form onSubmit={resetPassword} className={styles.form}>
                <h3>Change Password</h3>
                <input
                    type="text"
                    placeholder="New Password"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Confirm New Password"
                    onChange={(event) =>
                        setPassword_Confirm(event.target.value)
                    }
                />
                <button type="submit">Submit</button>
            </form>
        </Modal>
    );
}
