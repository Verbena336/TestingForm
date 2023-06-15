import styles from './Info.module.scss';
import { LINKS } from '../../data/constants';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TFormData, schema } from '../../validation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { emailValue, setEmail, setTel, telValue } from '../../store/reducers/formSlice';
import { withHookFormMask } from 'use-mask-input';

function Info(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tel = useAppSelector(telValue);
  const email = useAppSelector(emailValue);

  const { register, handleSubmit } = useForm<TFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tel: tel,
      email: email,
    },
  });

  const rememberValues = (data: TFormData) => {
    const { tel, email } = data;
    dispatch(setTel(tel));
    dispatch(setEmail(email));
  };

  const onSubmitHandler = (data: TFormData) => {
    rememberValues(data);
    navigate('/create');
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div className={styles.image}>
          <img src="assets/images/1.jpeg" rel="preload" alt="photo" />
        </div>
        <div className={styles.content}>
          <h1 className={styles.name}>Бызова Наталья</h1>
          <div className={styles.links}>
            {LINKS.map((link) => (
              <a
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                key={link.id}
                className={styles.link}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </header>
      <form id="form" className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <label className={styles.label}>
          Номер телефона
          <input
            {...withHookFormMask(register('tel'), ['+7 (999) 999-99-99'])}
            type="tel"
            disabled
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Email
          <input {...register('email')} type="email" disabled className={styles.input} />
        </label>
      </form>
      <button form="form" className={styles.button} type="submit">
        Начать
      </button>
    </section>
  );
}

export default Info;
