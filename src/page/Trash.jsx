import { AddNote, NoteGroup, Navbar, Search, SideNav } from "../component/Components";
import { getPinnedNotes, getOtherNotes, filterNotes } from "../utility/NotesUtility";
import { useNote } from "../context/NoteContext";
import { useEffect } from "react";
import "../style/notes.css";
import { Modules } from "../utility/Modules";
import { useForm } from "../context/FormContext";

export const Trash = () => {
    const { trash, searchText } = useNote();
    const { addFlag, resetFilter, filter } = useForm();

    useEffect(() => {
        resetFilter();
    }, []);

    const filteredNotes = filterNotes(trash, searchText, filter);
    const pinnedNotes = getPinnedNotes(filteredNotes);
    const otherNotes = getOtherNotes(filteredNotes);

    return (
        <>
            <Navbar/>
            <div className="note-container bg-charcoal-white">
                <SideNav current={Modules.TRASH}/>
                <div className="note-list">
                    <Search/>
                    { ( pinnedNotes && pinnedNotes.data.length > 0 ) && <NoteGroup noteGroupData={{ notes: pinnedNotes, type: Modules.TRASH }} />}
                    { ( otherNotes && otherNotes.data.length > 0 ) && <NoteGroup noteGroupData={{ notes: otherNotes, type: Modules.TRASH }} />}
                </div>
        </div>
            { (addFlag  && addFlag.value) && <AddNote/> }
        </>
    )
}