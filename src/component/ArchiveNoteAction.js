import { deleteFromArchives, restoreFromArchives } from "../services/ArchiveService";
import { MdOutlineUnarchive } from "react-icons/md";
import { useNote } from "../context/NoteContext";
import { useAuth } from "../context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "../style/note.css";

export const ArchiveNoteAction = ({ data }) => {
    const { color, id} = data;
    const { setNotes, setArchives } = useNote();
    const { auth }= useAuth();

    const moveToUserNotes = async () => {
        const response =  await restoreFromArchives(id, auth.token);
        if(response) {
            setNotes(response.notes);
            setArchives(response.archives);
            toast.success("Note restore from Archive successfully!");
        }
    }
    
    const removeFromArchives = async () => {
        const response = await deleteFromArchives(id, auth.token);
        if(response) {
            setArchives(response.archives);
            toast.success("Note deleted from Archive successfully!");
        }
    }

    return(
        <div className="note-footer-action">
            <button
                className={`btn btn-round bg-white ${color}`}
                onClick={moveToUserNotes}>
                    <MdOutlineUnarchive size={20} className="icon charcoal-black" title="restore from trash"/>
            </button>
            <button 
                className={`btn btn-round bg-white ${color}`}
                onClick={removeFromArchives}>
                    <FaTrashAlt size={20} className="icon charcoal-black" title="remove from trash"/>
            </button>
        </div>
    );
}