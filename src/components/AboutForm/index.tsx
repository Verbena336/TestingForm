import React, { useEffect, useState } from 'react';
import styles from './AboutForm.module.scss';
import { TStepModalProps } from '../../types';
import { useForm } from 'react-hook-form';
import { aboutValue, setAbout, storeValues } from '../../store/reducers/formSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { TAboutFormData, aboutSchema } from '../../validation';
import { useFetchDataMutation } from '../../store/services/commonApi';

function AboutForm(props: TStepModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const about = useAppSelector(aboutValue);
  const [length, setlength] = useState(about!.replace(/ /g, '').length);
  const store = useAppSelector(storeValues);
  const [fetchData] = useFetchDataMutation();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TAboutFormData>({ resolver: yupResolver(aboutSchema) });

  const fetchDataHandler = async () => {
    const resp = await fetchData(store).unwrap();
  };

  const onSubmitHandler = (data: TAboutFormData) => {
    rememberValues(data);
    try {
      fetchDataHandler();
      props.setIsSuccess(true);
      props.setIsOpen(true);
    } catch (e) {
      props.setIsSuccess(false);
      props.setIsOpen(true);
    }
  };

  const rememberValues = (data: TAboutFormData) => {
    const { about } = data;
    if (about) {
      dispatch(setAbout(about));
    }
  };

  const handleBack = (data: TAboutFormData) => {
    rememberValues(data);
    props.setStep(props.step - 1);
  };

  useEffect(() => {
    watch((value) => {
      const { about } = value;
      setlength(about!.replace(/ /g, '').length);
    });
  }, [watch]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={styles.formContent}>
        <label className={styles.label}>
          About
          <div style={{ position: 'relative', width: '100%' }}>
            <textarea
              {...register('about')}
              defaultValue={about}
              placeholder="Placeholder"
              className={styles.textarea}
              style={{ minHeight: '84px' }}
            />
            <div className={styles.length}>{length}</div>
          </div>
          <div className={styles.tip}>{errors.about?.message}</div>
        </label>
      </div>
      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.outline}`}
          onClick={() => handleBack(getValues())}
        >
          Назад
        </button>
        <button type="submit" className={styles.button}>
          Отправить
        </button>
      </div>
    </form>
  );
}

export default AboutForm;
