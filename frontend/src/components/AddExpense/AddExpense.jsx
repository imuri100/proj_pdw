import axios from "axios";
import { useState } from "react";
import styles from "./addexpense.module.scss";
export function AddExpense({
    onRequestClose,
    setExpenses,
    expenses,
    expensesCategories,
}) {
    const [expense, setExpense] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [value, setValue] = useState(0);
    const [date, setDate] = useState("");

    function submitExpense(event) {
        event.preventDefault();
        if ((expense, category, subCategory, value, date)) {
            axios.post("http://localhost:3004/expenses", {
                expense,
                category,
                subCategory,
                value,
                date,
            });
            setExpenses([
                ...expenses,
                { expense, category, subCategory, value, date },
            ]);
            onRequestClose();
        }
    }

    return (
        <form className={styles.form} onSubmit={submitExpense}>
            <h3>Add Xpense</h3>
            <input
                type="text"
                placeholder="Expense"
                value={expense}
                onChange={(e) => setExpense(e.target.value)}
            />
            <select required onChange={(e) => setCategory(e.target.value)}>
                <option value="" selected disabled hidden>
                    Select Category
                </option>
                {expensesCategories.map((cat) => {
                    return <option value={cat.category}>{cat.category}</option>;
                })}
            </select>

            <input
                type="text"
                placeholder="Sub-Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
            />
            <input
                type="number"
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
