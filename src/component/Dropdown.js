import "../style/dropdown.css";

export const Dropdown = ({ dropDownData }) => {
    const { data, key, setAction, selectedValue } = dropDownData;

    const handleChange = (e) => setAction((data) => ({...data, [key] : e.target.value}));
  
    return (
        <select value={selectedValue} onChange={handleChange} className="bg-charcoal-white">
            <option value="" key="0">Select</option>
            {
                data.map((item) => <option value={item.label} key={item.id}>{item.label}</option>)
            }
        </select>
    )
  }