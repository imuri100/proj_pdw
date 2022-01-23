/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { AddExpense } from "../components/AddExpense/AddExpense";
import { Table, Button, DropdownButton } from "react-bootstrap";
import Modal from "react-modal";
import styles from "./dashboard.module.scss";
import { TableHeadFilter } from "../components/TableHeadFilter/TableHeadFilter";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { AddNewCategory } from "../components/AddNewCategory/AddNewCategory";

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [expensesCategories, setExpensesCategories] = useState([]);
    const navigate = useNavigate();
    const [modalState, setmodalState] = useState(false);
    const [modalToOpen, setModalToOpen] = useState("");

    function openModal(modalToOpen) {
        setModalToOpen(modalToOpen);
        setmodalState(true);
    }

    function closeModal() {
        setmodalState(false);
    }

    function getAllExpenses() {
        const token = localStorage.getItem("myData");

         axios.get(`http://localhost:8000/expenses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res)=>{
            console.log(res.data)
            console.log(res.data.expenses)
        })
        .catch((error) => {
            console.log(error);
            navigate("/");
        });
    }

    useEffect(() => {
        const token = localStorage.getItem("myData");
        getAllExpenses();
        axios.get("http://localhost:8000/categorias", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            setExpensesCategories(res.data);
            console.log(res.data);
        });

    }, []);

    function sort() {
        let sortedExpenses = [];
        let datesSorted = expenses.map((e) => e.date).sort();

        expenses.forEach((expense) => {
            let index = datesSorted.indexOf(expense.date);
            while (sortedExpenses[index]) {
                index++;
            }
            sortedExpenses[index] = expense;
        });
        setExpenses(sortedExpenses);
    }

    return (
        <>
            <Header />
            <div className={styles.div}>
                <h2>Dashboard</h2>
                <Button onClick={() => openModal("expense")}>Add Xpense</Button>
                <Button onClick={() => openModal("category")}>
                    New Category
                </Button>
                <Modal isOpen={modalState} onRequestClose={closeModal}>
                    {modalToOpen === "expense" ? (
                        <AddExpense
                            onRequestClose={closeModal}
                            setExpenses={setExpenses}
                            expenses={expenses}
                            expensesCategories={expensesCategories}
                        />
                    ) : (
                        <AddNewCategory
                            onRequestClose={closeModal}
                            expensesCategories={expensesCategories}
                            setExpensesCategories={setExpensesCategories}
                        />
                    )}
                </Modal>
                <DropdownButton title="Sort by">
                    <DropdownItem onClick={sort}>Date</DropdownItem>
                </DropdownButton>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <TableHeadFilter
                                expenses={expenses}
                                setExpenses={setExpenses}
                                getAllExpenses={getAllExpenses}
                            />
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => {
                            return (
                                <tr key={expense.id}>
                                    <td>{expense.expense}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.Subcategory}</td>
                                    <td>{expense.__v}</td>
                                    <td>{expense.createdAt}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Dashboard;

