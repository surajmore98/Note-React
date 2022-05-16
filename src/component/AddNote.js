import { MdOutlineLabel, MdColorLens, MdOutlineClose } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { useNote } from "../context/NoteContext";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { Colors } from "../utility/Colors";
import { insertNote, updateNote } from "../services/NoteService";
import { useAuth } from "../context/AuthContext";
import { LabelUtility } from "../utility/NoteLables";
import { toast } from "react-toastify";
import { useForm } from "../context/FormContext";
import "../style/add-note.css";

export const AddNote = () => {
    const { setNotes, currentNote } = useNote();
    const { setAddFlag, addFlag } = useForm();
    const  { auth } = useAuth();

    const titleInputRef = useRef("");
    const descInputRef = useRef("");
    
    const [noteLabels, setNoteLabels] = useState([]);
    const [ currentForm, setCurrentForm ] = useState("");
    const [color, setColor] = useState("");
    
    const isEditMode = addFlag.type === "edit";

    useEffect(() => {
        if(isEditMode) {
            if(currentNote) {
                titleInputRef.current.value = currentNote.title;
                descInputRef.current.value = currentNote.description;
                setNoteLabels(currentNote.tags);
                setColor(currentNote.color);
            }
        }
    }, [])    

    const labelSelectHandler = (label) => {
        setNoteLabels([...noteLabels].concat(label));
        setCurrentForm("");
    }

    const colorSelectHandler = (value) => {
        setColor(value);
        setCurrentForm("");
    }

    const labelRemoveHandler = (id) => setNoteLabels(noteLabels.filter(x => x.id !== id));

    const formatDate = () => dayjs().format("DD/MM/YYYY");

    const updateCurrentForm = (val) => currentForm === val ? setCurrentForm("") : setCurrentForm(val);
    
    const closeForm = () => setAddFlag({value: false ,type: ""});

    const addNode = async () => {
        let responseData = [];
        let formValue = {
            title: titleInputRef.current.value,
            description: descInputRef.current.value,
            createdDate: formatDate(),
            updateDate: "",
            color: color,
            tags: noteLabels,
            isPinned: false,
            id: uuid()
        };
        
        if(isEditMode) {
            const response = await updateNote(formValue, currentNote._id, auth.token);
            responseData = response.notes;
            toast.success("Note updated Succesfully!!!");
        } else {
            const response = await insertNote(formValue, auth.token);
            responseData = response.notes;
            toast.success("Note created Succesfully!!!");
        }

        setNotes(responseData);
        closeForm();
    }

    return(
        <div className="pop-up-container">
            <div className={`add-note-wrapper flex flex-col justify-content-center bg-white ${color}`}>
                <div className="input-container">
                    <input
                      type="text" 
                      className="font-xl font-bold charcoal-black" 
                      placeholder="Title" 
                      ref={titleInputRef}/>

                    <textarea
                      type="text" 
                      className="text-area charcoal-black font-lg font-semi-bold" 
                      placeholder="Take a note" 
                      ref={descInputRef}>
                    </textarea>
                    <div className="flex p-md gap-sm">
                        {
                            noteLabels && noteLabels.map((item, index) => {
                                return (
                                <div className="chip chip-black-border charcoal-black" key={index}>
                                    <span>{item.label}</span>
                                    <span className="pointer" onClick={() => labelRemoveHandler(item.id)}>
                                        <MdOutlineClose/>
                                    </span>
                                </div>)
                            })
                        }
                        {/* <div className="chip chip-black-border charcoal-black"><span>Tag123</span> <span className="pointer"><MdOutlineClose/></span></div>
                        <div className="chip chip-black-border charcoal-black"><span>Tag123</span> <span className="pointer"><MdOutlineClose/></span></div> */}
                    </div>
                </div>
                <div className="add-note-action flex justify-content-space-between align-items-center p-md">
                    <div className="flex justify-content-space-between align-items-center gap-md">
                        { (currentForm && currentForm === "label") &&
                            <ul className="label-list bg-white">
                                {
                                    LabelUtility && LabelUtility.map((item, index) =>
                                     <li onClick={() => labelSelectHandler(item)} key={index}>
                                        {item.label}
                                     </li>)
                                }
                            </ul>
                        }
                        <button className={`btn btn-round note-action charcoal-black bg-white ${color}`} onClick={() => updateCurrentForm("label")}><MdOutlineLabel size={30}/></button>
                        <button className={`btn btn-round note-action charcoal-black bg-white ${color}`}onClick={() => updateCurrentForm("color")}><MdColorLens size={30}/></button>
                        {   (currentForm && currentForm === "color") &&
                            <div className="p-sm bg-white color-list">
                                {
                                    Colors &&
                                    Colors.map(({id, value}) => 
                                        <button className={`btn btn-round ${value}`}
                                        onClick={() => colorSelectHandler(value)}
                                        key={id}></button>
                                    )
                                }
                            </div>
                        }
                    </div>
                    <div className="flex justify-content-space-between align-items-center gap-md ml-auto">
                        <button className="btn note-action font-bold font-lg" onClick={addNode}>Save</button>
                        <button className="btn note-action font-bold font-lg" onClick={closeForm}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}