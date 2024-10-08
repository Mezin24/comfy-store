export const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  size,
  placeholder = '',
}) => {
  return (
    <label className='form-control'>
      <div className='label'>
        <span className='label-text capitalize'>{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-bordered ${size}`}
        defaultValue={defaultValue}
        name={name}
      />
    </label>
  );
};
