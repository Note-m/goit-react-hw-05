import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onSubmit }) => {
  return (
    <div className={css.btnWrapper}>
      <button className={css.btnLoadMore} onClick={onSubmit}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
