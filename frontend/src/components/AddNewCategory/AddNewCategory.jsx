import axios from "axios";
import { useState } from "react";
// import styles from "./addexpense.module.scss";
export function AddNewCategory({
    onRequestClose,
    expensesCategories,
    setExpensesCategories,
}) {
    const [category, setCategory] = useState("");

    function submitExpense(event) {
        const token = localStorage.getItem("myData");
        
        event.preventDefault();
        if (category) {
            axios.post("http://localhost:8000/categorias",{
                headers: {
                    Authorization: `Bearer ${token}`,
                }}, {
                category,
            });
            console.log(category);
            setExpensesCategories([...expensesCategories, { category }]);
            onRequestClose();
        }
    }

    return (
        <form className={""} onSubmit={submitExpense}>
            <h3>Add Category</h3>
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}
