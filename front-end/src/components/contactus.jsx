import { useForm, ValidationError } from "@formspree/react";

const Contactus = () => {
  const [state, handleSubmit] = useForm("xyyrknjn");
  if (state.succeeded) {
    return <p>We will answer as soon is possible 😊</p>;
  }
  
 
  return (
    <form className="container d-flex flex-column align-items-center" onSubmit={handleSubmit}>
      <div className="my-2 d-flex flex-column align-items-center w-100">
          <label className="form-label " htmlFor="email">Email</label>
          <input className="form-control w-50 input-contactus" id="email" type="email" name="email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          {state?.errors && <div className="text-danger "> {state.errors.formErrors[0].message}</div>}
      </div>
      <div className="my-2 d-flex flex-column align-items-center w-50">
          <label className="form-label" htmlFor="message">Tell us something good: </label>
          <textarea className="form-control input-contactus" rows={6} id="message" name="message" required />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
          {state?.errors && <div className="text-danger "> {state.errors.formErrors[0].message}</div>}
      </div>
      <button className="btn btn-outline-success my-3" type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
};

export default Contactus; 
