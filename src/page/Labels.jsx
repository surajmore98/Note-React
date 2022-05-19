import { useNote } from "../context/NoteContext";
import { AddNote, NoteGroup, Navbar, Search, SideNav } from "../component/Components";
import "../style/notes.css";
import { sortNotesByTags, filterNotes } from "../utility/NotesUtility";
import { Modules } from "../utility/Modules";
import { useEffect } from "react";
import { useForm } from "../context/FormContext";

export const Labels = () => {
    const { notes, searchText } = useNote();
    const { addFlag, resetFilter, filter } = useForm();

    useEffect(() => {
        resetFilter();
    }, []);

    let labelNoteGroup = [];

    const filteredNotes = filterNotes(notes, searchText, filter);
    labelNoteGroup = sortNotesByTags(filteredNotes);

    return (
        <>
            <Navbar/>
            <div className="note-container bg-charcoal-white">
                <SideNav current={Modules.LABEL}/>
                <div className="note-list">
                    <Search/>
                    {
                        labelNoteGroup && labelNoteGroup.map((item, index) => {
                            return <NoteGroup noteGroupData={{ notes: item, type: Modules.NOTES }} key={index}/>
                        })
                    }
                </div>
            </div>
            { (addFlag  && addFlag.value) && <AddNote/> }
        </>
    )
}