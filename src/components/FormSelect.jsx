export const FormSelect = ({
  label,
  name,
  list = [],
  defaultValue = list?.[0],
  size = 'select-sm',
}) => {
  return (
    <label className='form-control' htmlFor={name}>
      <div className='label'>
        <span className='label-text capitalize'>{label}</span>
      </div>
      <select
        id={name}
        className={`select select-bordered ${size}`}
        name={name}
        defaultValue={defaultValue}
      >
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};
