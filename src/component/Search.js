import { MdSearch, MdFilterList, MdClose } from "react-icons/md";
import { useNote } from "../context/NoteContext";
import { useForm } from "../context/FormContext";
import "../style/notes.css";

export const Search = () => {
    const { searchText, setSearchText } = useNote();
    const { setFilterFlag } = useForm();

    const searchHandler = (e) => setSearchText(e.target.value);

    const clearSearch = () => setSearchText("");

    const filterClickHandler = () => setFilterFlag((flag) => !flag);

    return (
        <div className="search-bar">
            <span className="icon left"><MdSearch/></span>
            <input type="text"
            placeholder="Search By Title"
            className="input search-input"
            value={searchText}
            onChange={searchHandler}
            />
            { searchText && <span className="icon right pointer" onClick={clearSearch}><MdClose /></span>}
            { !searchText && <span className="icon right pointer" onClick={filterClickHandler}><MdFilterList /></span>}
        </div>
    )
}