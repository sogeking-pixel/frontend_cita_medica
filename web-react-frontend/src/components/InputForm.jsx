function InputForm({ label, type = "text", value, onChange, placeholder, name, id, autoComplete = "off" }) {
  return (
    <>
     <label
        htmlFor={id}
        className="block text-base font-medium text-gray-700 font-['Outfit'] mb-3 text-left"
      >
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-2xl bg-zinc-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholder={placeholder}
      />
      
    </>
  );
}



export default InputForm;