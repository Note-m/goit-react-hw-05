import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={css.WrapperErrorMessage}>
      <p className={css.errorMessage}>
        Sorry we not finded images for your request
      </p>
      <p className={css.errorMessage}>Please try anouther search request</p>
    </div>
  );
};

export default ErrorMessage;
