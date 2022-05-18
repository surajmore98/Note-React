import { FaTrashRestoreAlt, FaTrashAlt } from "react-icons/fa";
import { deleteFromTrash, restoreFromTrash } from "../services/TrashService";
import { useNote } from "../context/NoteContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../style/note.css";

export const TrashNoteAction = ({ data }) => {
    const { color, id} = data;
    const { setNotes, setTrash } = useNote();
    const { auth }= useAuth();

    const moveToUserNotes = async () => {
        const response =  await restoreFromTrash(id, auth.token);
        if(response) {
            setNotes(response.notes);
            setTrash(response.trash);
            toast.success("Note restore from trash successfully!");
        }
    }
    
    const removeFromTrash = async () => {
        const response = await deleteFromTrash(id, auth.token);
        if(response) {
            setTrash(response.trash);
            toast.success("Note deleted from trash successfully!");
        }
    }

    return(
        <div className="note-footer-action">
            <button
                className={`btn btn-round bg-white ${color}`}
                onClick={moveToUserNotes}>
                    <FaTrashRestoreAlt size={20} className="icon charcoal-black" title="restore from trash"/>
            </button>
            <button 
                className={`btn btn-round bg-white ${color}`}
                onClick={removeFromTrash}>
                    <FaTrashAlt size={20} className="icon charcoal-black" title="remove from trash"/>
            </button>
        </div>
    );
}