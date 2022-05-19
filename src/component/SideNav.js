import { MdHome, MdOutlineLabel, MdOutlineArchive, MdOutlineRestoreFromTrash, MdPersonOutline } from "react-icons/md";
import { useNavigator } from "../utility/UseNavigator";
import { useForm } from "../context/FormContext";
import "../style/notes.css"
import { Modules } from "../utility/Modules";

export const SideNav = ({ current }) => {
    const { setAddFlag } = useForm();
    const openAddNoteForm = () => setAddFlag({value: true, type: "add"});
    const { navigateToHome, navigateToArchive, navigateToLabels, navigateToTrash } = useNavigator();


    return (
        <div className="side-nav">
            <ul className="side-nav-list">
                <li className={`list-item semi-bold charcoal-black ${current === Modules.NOTES ? 'list-item-active' : ''}`} onClick={navigateToHome}>
                    <MdHome size={30}/>
                    <span className="list-item-title">Home</span>
                </li>
                <li className={`list-item semi-bold charcoal-black ${current === Modules.LABEL ? 'list-item-active' : ''}`} onClick={navigateToLabels}>
                    <MdOutlineLabel size={30}/>
                    <span className="list-item-title">Labels</span>
                </li>
                <li className={`list-item semi-bold charcoal-black ${current === Modules.ARCHIVE ? 'list-item-active' : ''}`} onClick={navigateToArchive}>
                    <MdOutlineArchive size={30}/>
                    <span className="list-item-title">Archive</span>
                </li>
                <li className={`list-item semi-bold charcoal-black ${current === Modules.TRASH ? 'list-item-active' : ''}`} onClick={navigateToTrash}>
                    <MdOutlineRestoreFromTrash size={30}/>
                    <span className="list-item-title">Trash</span>
                </li>
                {/* <li className={`list-item semi-bold charcoal-black ${current === Modules.NOTES ? 'list-item-active' : ''}`}">
                    <MdPersonOutline size={30}/>
                    <span className="list-item-title">Profile</span>
                </li> */}
            </ul>
            <button className="side-nav-action" onClick={openAddNoteForm}>Create Note</button>
        </div>
    )
}