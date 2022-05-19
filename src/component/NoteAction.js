import { FaRegEdit, FaArchive, FaTrash } from "react-icons/fa";
import { useNote } from "../context/NoteContext";
import { useAuth } from "../context/AuthContext";
import { moveNotesToArchive, moveNotesToTrash } from "../services/NoteService";
import "../style/note.css";
import { useForm } from "../context/FormContext";

export const NoteAction = ({ data }) => {
    const { color, id} = data;
    const { notes, setNotes, setArchives, setTrash, setCurrentNote } = useNote();
    const { setAddFlag } = useForm();
    const { auth }= useAuth();

    const moveToTrash = async () => {
        const response = await moveNotesToTrash(id, auth.token);
        if(response) {
            setNotes(response.notes);
            setTrash(response.trash);
        };
    }

    const moveToArchive = async () => {
        const response = await moveNotesToArchive(id, auth.token);
        if(response) {
            setNotes(response.notes);
            setArchives(response.archives);
        };
    }
    
    const editNode = () =>{
        setCurrentNote(notes.find(x => x._id === id));
        setAddFlag({value: true, type: "edit"});
    }

    return(
        <div className="note-footer-action">
            <button
                className={`btn btn-round bg-white ${color}`}
                onClick={editNode}>
                    <FaRegEdit size={20} className="icon charcoal-black" title="edit note" />
            </button>
            <button
                className={`btn btn-round bg-white ${color}`}
                onClick={moveToArchive}>
                    <FaArchive size={20} className="icon charcoal-black" title="move to archive"/>
            </button>
            <button 
                className={`btn btn-round bg-white ${color}`}
                onClick={moveToTrash}>
                    <FaTrash size={20} className="icon charcoal-black" title="move to trash"/>
            </button>
        </div>
    );
}