import { LabelUtility } from "../utility/NoteLables";
import { NoteSort } from "../utility/NoteSort";
import { Dropdown } from "./Dropdown";
import "../style/add-note.css";
import { useForm } from "../context/FormContext";
import { useState, useEffect } from "react";

export const FilterForm = () => {
    const { setFilterFlag, resetFilter, setFilter, filter } = useForm();
    const [ filterFormVal, setFilterFormVal ] = useState({ sort: "", label: "" });

    useEffect(() => {
        setFilterFormVal(filter)
    }, []);

    const sortData = {
        data: NoteSort,
        key: "sort",
        setAction: setFilterFormVal,
        selectedValue: filterFormVal["sort"]
    };

    const labelData = {
        data: LabelUtility,
        key: "label",
        setAction: setFilterFormVal,
        selectedValue: filterFormVal["label"]
    };

    const resetHandler = (e) => {
        e.preventDefault();
        resetFilter();
        setFilterFlag(false);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setFilter(filterFormVal);
        setFilterFlag(false);
    }

    return (
        <div className="pop-up-container">
            <div className="add-note-wrapper flex flex-col justify-content-space-between bg-white p-md">
                <div className="flex flex-col">
                    <label className="input-label font-lg font-bold">Sort:</label>
                    <Dropdown dropDownData={sortData} />
                    <label className="input-label font-lg font-bold">Labels:</label>
                    <Dropdown dropDownData={labelData} />
                </div>
                <div className="flex justify-content-space-between gap-md p-md">
                    <button className="btn bg-secondary charcoal-black font-bold" onClick={resetHandler}>Clear</button>
                    <button className="btn bg-primary charcoal-black font-bold" onClick={submitHandler}>Done</button>
                </div>
            </div>
        </div>
    );
}