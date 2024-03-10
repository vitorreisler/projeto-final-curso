const Input = ({ title, type, name, error, ...rest }) => {
  return (
    <>
      <label {...rest} className="form-label" htmlFor={name}>
        {title} {rest.required && <span className="text-danger">*</span>}{" "}
      </label>
      <input {...rest} className="form-control w-50" type={type} id={name} />
      <span className="text-danger">{error}</span>
    </>
  );
};

export default Input;
