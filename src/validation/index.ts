import * as yup from 'yup';

export const schema = yup.object().shape({
  tel: yup
    .string()
    .required('Required')
    .matches(/^[0-9+()-\s]+$/)
    .length(18, 'Invalid phone number'),
  email: yup.string().email().required('Required'),
});

export type TFormData = yup.InferType<typeof schema>;

export const nameSchema = yup.object().shape({
  nickname: yup
    .string()
    .required('Required')
    .max(30, 'Max length 30')
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9]+$/, { message: 'Letters and numbers only' }),
  name: yup
    .string()
    .required('Required')
    .max(50, 'Max length 50')
    .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, { message: 'Letters only' }),
  surname: yup
    .string()
    .required('Required')
    .max(50, 'Max length 50')
    .matches(/^[а-яА-ЯёЁa-zA-Z]+$/, { message: 'Letters only' }),
  sex: yup.string().required('Required'),
});

export type TNameFormData = yup.InferType<typeof nameSchema>;

export const skillsSchema = yup.object().shape({
  advantages: yup.array().of(yup.object().shape({ name: yup.string() })),
  checkbox: yup.array().of(yup.number()).min(1, 'Required'),
  radio: yup.number().required('Required').nullable(),
});

export type TSkillsFormData = yup.InferType<typeof skillsSchema>;

export const aboutSchema = yup.object().shape({
  about: yup.string().max(200, 'Max length 200'),
});

export type TAboutFormData = yup.InferType<typeof aboutSchema>;
