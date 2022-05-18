import "../style/notes.css";
import { Note } from "./Note";

export const NoteGroup = ({ noteGroupData }) => {
    const { notes, type } = noteGroupData;
    const { title, data } = notes;

    return (
        <div className="note-group">
            <h2>{title}</h2>
            {
                data.length > 0 && data.map((note, index) => <Note data={{note, type}} key={index} />)
            }
        </div>
    );
}