import { TrashNoteAction, ArchiveNoteAction, NoteAction } from "./Components";
import { updateNote } from "../services/NoteService";
import { useNote } from "../context/NoteContext";
import { useAuth } from "../context/AuthContext";
import { MdPushPin } from "react-icons/md";
import "../style/note.css";
import { Modules } from "../utility/Modules";

export const Note = ({ data }) => {
    const { note, type } = data;
    
    const { title, description, createdDate, updateDate, tags, color, isPinned, _id } = note;
    const { setNotes } = useNote();
    const { auth }= useAuth();

    const togglePin = async() => {
        const data = {...note};
        data.isPinned = !data.isPinned;
        const response = await updateNote(data, _id, auth.token);
        if(response) {
            setNotes(response.notes);
        };
    }

    return (
        <div className={`note mt-md bg-white ${color}`}>
            <div className="note-header">
                <div className="font-lg font-bold">{title}</div>
                <button
                 className={`btn btn-round bg-white ${color}`}
                 onClick={togglePin}>
                    <MdPushPin size={20} className={`icon ${isPinned ? 'secondary' : 'charcoal-black'}`} title="pinned"/>
                </button>
            </div>
            <p className="note-info">{description}</p>
            <div className="flex p-md gap-sm">
                {
                    tags && tags.map((item, index) => {
                        return (
                        <div className="chip chip-black-border charcoal-black" key={index}>
                            <span>{item.label}</span>
                        </div>)
                    })
                }
            </div>
            <div className="note-footer">
                <div className="font-md">{!updateDate ? `Created on ${createdDate}` : `Updated on ${updateDate}`}</div>
                { type === Modules.NOTES && <NoteAction data={{color, id: _id}} />}
                { type === Modules.TRASH && <TrashNoteAction data={{color, id: _id}}/>}
                { type === Modules.ARCHIVE && <ArchiveNoteAction data={{color, id: _id}}/>}
            </div>
        </div>
    )
}