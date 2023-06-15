import React, { useState } from 'react';
import styles from './NameForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { nameSchema, TNameFormData } from '../../validation';
import { TStepProps } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  nameValue,
  nicknameValue,
  setName,
  setNickname,
  setSex,
  setSurname,
  Sex,
  sexValue,
  surnameValue,
} from '../../store/reducers/formSlice';

function NameForm(props: TStepProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nickname = useAppSelector(nicknameValue);
  const name = useAppSelector(nameValue);
  const surname = useAppSelector(surnameValue);
  const sex = useAppSelector(sexValue);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TNameFormData>({ resolver: yupResolver(nameSchema) });

  const onSubmitHandler = (data: TNameFormData) => {
    rememberValues(data);
    props.setStep(props.step + 1);
  };

  const rememberValues = (data: TNameFormData) => {
    const { nickname, name, surname } = data;
    dispatch(setNickname(nickname));
    dispatch(setName(name));
    dispatch(setSurname(surname));
  };

  const handleBack = (data: TNameFormData) => {
    rememberValues(data);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={styles.formContent}>
        <label className={styles.label}>
          Nickname
          <input
            {...register('nickname')}
            type="text"
            defaultValue={nickname}
            placeholder="Placeholder"
            className={styles.input}
          />
          <div className={styles.tip}>{errors.nickname?.message}</div>
        </label>
        <label className={styles.label}>
          Name
          <input
            {...register('name')}
            type="text"
            defaultValue={name}
            placeholder="Placeholder"
            className={styles.input}
          />
          <div className={styles.tip}>{errors.name?.message}</div>
        </label>
        <label className={styles.label}>
          Sername
          <input
            {...register('surname')}
            type="text"
            defaultValue={surname}
            placeholder="Placeholder"
            className={styles.input}
          />
          <div className={styles.tip}>{errors.surname?.message}</div>
        </label>

        <div className={styles.label} onClick={() => setIsOpen(!isOpen)}>
          Sex
          <div className={`${styles.input} ${styles.select}`}>
            {sex ? sex : 'Не выбрано'}
            <div className={`${styles.dropdown} ${isOpen && styles.open}`}>
              <label className={styles.radioLabel}>
                man
                <input
                  {...register('sex')}
                  type="radio"
                  value="man"
                  checked={sex === Sex.man}
                  className={styles.radio}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setSex(Sex.man));
                  }}
                />
              </label>
              <label className={styles.radioLabel}>
                woman
                <input
                  {...register('sex')}
                  type="radio"
                  value="woman"
                  checked={sex === Sex.woman}
                  className={styles.radio}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setSex(Sex.woman));
                  }}
                />
              </label>
            </div>
          </div>
          <div className={styles.tip}>{errors.sex?.message}</div>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          type="button"
          className={`${styles.button} ${styles.outline}`}
          onClick={() => {
            handleBack(getValues());
          }}
        >
          Назад
        </button>
        <button type="submit" className={styles.button} style={{}}>
          Далее
        </button>
      </div>
    </form>
  );
}

export default NameForm;
