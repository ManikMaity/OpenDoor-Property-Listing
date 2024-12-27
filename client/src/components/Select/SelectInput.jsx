
const optionData = [
    {label : "Apartment", value : "apt"},
    {label : "Villa", value : "villa"},
]

function SelectInput({value, setValue, label = "Select", options = optionData, styleObj = {}}) {
  return (
    <div>
      <label className="block text-sm font-medium mx-1 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        style={styleObj}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
      >
        {options?.map(option =>  <option key={option?.value} value={option?.value}>{option?.label}</option>)}
      </select>
    </div>
  );
}

export default SelectInput;
