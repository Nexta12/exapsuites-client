
const InputField = ({
  label,
  type = 'text',  
  value,
  onChange,
  placeholder,
  name,
  error,
  ...rest
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        id={name}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...rest}
      />
      {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default InputField;
