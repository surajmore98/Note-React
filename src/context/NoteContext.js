import React, {useState} from "react";

const NoteContext = React.createContext();

export const useNote = () => React.useContext(NoteContext);

export const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);
    const [archives, setArchives]  = useState([]);
    const [trash, setTrash]  = useState([]);
    
    const [currentNote, setCurrentNote] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    
    const data = { notes, setNotes, archives, setArchives,
         trash, setTrash, currentNote, setCurrentNote,
         loading, setLoading, searchText, setSearchText }

    return (
        <NoteContext.Provider value={data}>
            {children}
        </NoteContext.Provider>
    )
}