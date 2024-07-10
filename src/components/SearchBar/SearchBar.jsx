import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  return (
    <header>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          if (!values.topic.trim()) {
            toast.error("This field can not be empty!");
            return;
          }
          onSubmit(values.topic);
          actions.resetForm();
        }}
      >
        <Form className={css.searchForm} action="">
          <Field
            className={css.searchInp}
            type="text"
            name="topic"
            autoComplete="off"
            autoFocus
            placeholder="Search images..."
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
