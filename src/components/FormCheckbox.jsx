export const FormCheckbox = ({ label, name, defaulrValue, size }) => {
  return (
    <div className='form-control items-center'>
      <label htmlFor={name} className='label cursor-pointer'>
        <span className='label-text capitalize'>{label}</span>
      </label>
      <input
        type='checkbox'
        name={name}
        id={name}
        className={`checkbox checkbox-primary ${size}`}
        defaultChecked={defaulrValue}
      />
    </div>
  );
};
