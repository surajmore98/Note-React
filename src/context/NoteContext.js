import React, {useState} from "react";

const NoteContext = React.createContext();

export const useNote = () => React.useContext(NoteContext);

export const NoteProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    
    const data = {loading, setLoading }

    return (
        <NoteContext.Provider value={data}>
            {children}
        </NoteContext.Provider>
    )
}