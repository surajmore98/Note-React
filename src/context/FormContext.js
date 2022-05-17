import React, {useState } from "react";

const FormContext = React.createContext();

export const useForm = () => React.useContext(FormContext);

export const FormProvider = ({children}) => {
    const [addFlag, setAddFlag] = useState({ value: false, type: ""});
    const [filterFlag, setFilterFlag] = useState(false);
    const [filter, setFilter] = useState({ sort: "", label: "" });
    
    const resetFilter = () => setFilter({ label:"", sort: "" });
    const data = { addFlag, setAddFlag, filterFlag, setFilterFlag,
        filter, setFilter, resetFilter }

    return (
        <FormContext.Provider value={data}>
            {children}
        </FormContext.Provider>
    )
}