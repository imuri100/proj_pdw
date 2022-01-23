/* eslint-disable */
import { useState } from "react";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { DropdownButton } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";

export function TableHeadFilter({ expenses, setExpenses, getAllExpenses }) {
    const [years, setYears] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    useEffect(() => {
        let years = [];
        let categories = [];
        let subCategories = [];

        expenses.forEach((expense) => {
            let year = new Date(expense.date).getFullYear();
            years.push(year);

            categories.push(expense.category);
            subCategories.push(expense.subCategory);
        });
        setYears(Array.from(new Set(years)));
        setCategory(Array.from(new Set(categories)));
        setSubCategory(Array.from(new Set(subCategories)));
    }, [expenses]);

    function selectOptions(thead, option) {
        if (option === "all") {
            getAllExpenses();
        }
        if (thead === "date") {
            const newExpenses = expenses.filter((expense) => {
                return new Date(expense.date).getFullYear() === option;
            });

            return setExpenses(newExpenses);
        }

        let filter = thead == "category" ? "category" : "subCategory";
        const newExpenses = expenses.filter((expense) => {
            return expense[filter] === option;
        });

        return setExpenses(newExpenses);
    }

    return (
        <>
            <th>Expense</th>
            <th>
                <DropdownButton title="Category">
                    <DropdownItem
                        onClick={() => selectOptions("category", "all")}
                    >
                        All
                    </DropdownItem>
                    {category.map((cat) => {
                        return (
                            <DropdownItem
                                onClick={() => selectOptions("category", cat)}
                            >
                                {cat}
                            </DropdownItem>
                        );
                    })}
                </DropdownButton>
            </th>

            <th>
                <DropdownButton title="Sub-Category">
                    <DropdownItem
                        onClick={() => selectOptions("subCategory", "all")}
                    >
                        All
                    </DropdownItem>
                    {subCategory.map((subCat) => {
                        return (
                            <DropdownItem
                                onClick={() =>
                                    selectOptions("subCategory", subCat)
                                }
                            >
                                {subCat}
                            </DropdownItem>
                        );
                    })}
                </DropdownButton>{" "}
            </th>

            <th>Value</th>
            <th>
                <DropdownButton title="Date">
                    <DropdownItem onClick={() => selectOptions("date", "all")}>
                        All
                    </DropdownItem>
                    {years.map((year) => {
                        return (
                            <DropdownItem
                                onClick={() => selectOptions("date", year)}
                            >
                                {year}
                            </DropdownItem>
                        );
                    })}
                </DropdownButton>
            </th>
        </>
    );
}
