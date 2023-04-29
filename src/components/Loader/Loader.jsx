import { RotatingLines } from 'react-loader-spinner';
import css from './loader.module.css';
export const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <RotatingLines
        className={css.loader}
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="1.7"
        visible={true}
      />
    </div>
  );
};
