import React from 'react';
import styles from './ProgressBar.module.scss';

type TProps = { number: number };

function ProgressBar(props: TProps): JSX.Element {
  return (
    <ul className={styles.wrapper}>
      <li className={`${styles.stepDot} ${props.number === 1 ? styles.current : styles.finished}`}>
        <span className={`${styles.step} ${styles.done}`}>1</span>
      </li>
      <li
        className={`${styles.stepDot} ${props.number === 2 && styles.current} ${
          props.number === 3 && styles.finished
        }`}
      >
        <span className={`${styles.step} ${props.number > 1 && styles.done}`}>2</span>
      </li>
      <li className={`${styles.stepDot} ${props.number === 3 && styles.current}`}>
        <span className={`${styles.step} ${props.number === 3 && styles.done}`}>3</span>
      </li>
    </ul>
  );
}

export default ProgressBar;
