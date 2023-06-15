import styles from './SkillsForm.module.scss';
import { TStepProps } from '../../types';
import { useFieldArray, useForm } from 'react-hook-form';
import { TSkillsFormData, skillsSchema } from '../../validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  advantagesValues,
  checkboxValue,
  radioValue,
  setAdvantages,
  setRadio,
  setElemCheckbox,
} from '../../store/reducers/formSlice';
import { CHECKBOX, RADIO } from '../../data/constants';

function SkillsForm(props: TStepProps): JSX.Element {
  const dispatch = useAppDispatch();
  const advantages = useAppSelector(advantagesValues);
  const checkbox = useAppSelector(checkboxValue);
  const radio = useAppSelector(radioValue);
  const formatAdv = advantages.map((item) => {
    return { name: item };
  });

  const { register, handleSubmit, getValues, control } = useForm<TSkillsFormData>({
    resolver: yupResolver(skillsSchema),
    defaultValues: {
      advantages: formatAdv,
      checkbox: checkbox,
      radio: radio,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'advantages',
    control,
  });

  const onSubmitHandler = (data: TSkillsFormData) => {
    rememberValues(data);
    props.setStep(props.step + 1);
  };

  const rememberValues = (data: TSkillsFormData) => {
    const { advantages } = data;
    if (advantages) {
      const formatAdv = advantages
        .map((item) => {
          return item.name!;
        })
        .flat();
      dispatch(setAdvantages(formatAdv));
    }
  };

  const handleBack = (data: TSkillsFormData) => {
    rememberValues(data);
    props.setStep(props.step - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={styles.formContent}>
        <div className={styles.inputs}>
          <legend className={styles.legend}>Advantages</legend>

          {fields.map((elem, i) => {
            return (
              <div key={elem.id} className={styles.field}>
                <input
                  {...register(`advantages.${i}.name`)}
                  type="text"
                  placeholder="Placeholder"
                  className={styles.input}
                />
                <button className={styles.buttonRemove} onClick={() => remove(i)} />
              </div>
            );
          })}

          <button
            type="button"
            className={styles.buttonPlus}
            onClick={() => {
              append({ name: '' });
            }}
          />
        </div>

        <div className={styles.checkboxGroup}>
          <legend className={styles.legend}>Checkbox group</legend>

          {CHECKBOX.map((item) => {
            return (
              <label key={item.id} className={styles.label}>
                <input
                  {...register('checkbox')}
                  value={item.elem}
                  type="checkbox"
                  checked={checkbox.includes(item.elem)}
                  onClick={() => dispatch(setElemCheckbox(item.elem))}
                  className={styles.checkbox}
                />
                {item.elem}
              </label>
            );
          })}
        </div>

        <div className={styles.radioGroup}>
          <legend className={styles.legend}>Radio group</legend>
          {RADIO.map((item) => {
            return (
              <label key={item.id} className={styles.label}>
                <input
                  type="radio"
                  {...register('radio')}
                  value={item.elem}
                  checked={radio === item.elem}
                  onClick={() => dispatch(setRadio(item.elem))}
                  className={styles.radio}
                />
                {item.elem}
              </label>
            );
          })}
        </div>
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
          Далее
        </button>
      </div>
    </form>
  );
}

export default SkillsForm;
