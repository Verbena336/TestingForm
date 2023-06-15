import { createAction, createReducer } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum Sex {
  man = 'man',
  woman = 'woman',
}

export type TAdvantage = {
  name: string;
};

export interface IInitialState {
  tel: string;
  email: string;
  nickname: string;
  name: string;
  surname: string;
  sex: Sex | null;
  advantages: string[];
  checkbox: number[];
  radio: null | number;
  about: string;
}

const initialState: IInitialState = {
  tel: '+7 (905) 204-23-35',
  email: 'nata22011997@gmail.com',
  nickname: '',
  name: '',
  surname: '',
  sex: null,
  advantages: ['', '', ''],
  checkbox: [],
  radio: null,
  about: '',
};

export const setTel = createAction<string>('setTel');
export const setEmail = createAction<string>('setEmail');
export const setNickname = createAction<string>('setNickname');
export const setName = createAction<string>('setName');
export const setSurname = createAction<string>('setSurname');
export const setSex = createAction<Sex>('setSex');
export const setAdvantages = createAction<string[]>('setAdvantages');
export const setElemCheckbox = createAction<number>('setElemCheckbox');
export const setRadio = createAction<number | null>('setRadio');
export const setAbout = createAction<string>('setAbout');

const formReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTel, (state, action) => {
      state.tel = action.payload;
    })
    .addCase(setEmail, (state, action) => {
      state.email = action.payload;
    })
    .addCase(setNickname, (state, action) => {
      state.nickname = action.payload;
    })
    .addCase(setName, (state, action) => {
      state.name = action.payload;
    })
    .addCase(setSurname, (state, action) => {
      state.surname = action.payload;
    })
    .addCase(setSex, (state, action) => {
      state.sex = action.payload;
    })
    .addCase(setAdvantages, (state, action) => {
      state.advantages = action.payload;
    })
    .addCase(setElemCheckbox, (state, action) => {
      if (state.checkbox.includes(action.payload)) {
        state.checkbox = state.checkbox.filter((item) => item !== action.payload);
      } else {
        state.checkbox.push(action.payload);
      }
    })
    .addCase(setRadio, (state, action) => {
      state.radio = action.payload;
    })
    .addCase(setAbout, (state, action) => {
      state.about = action.payload;
    });
});

export const telValue = (state: RootState): string => state.form.tel;
export const emailValue = (state: RootState): string => state.form.email;
export const nicknameValue = (state: RootState): string => state.form.nickname;
export const nameValue = (state: RootState): string => state.form.name;
export const surnameValue = (state: RootState): string => state.form.surname;
export const sexValue = (state: RootState): string | null => state.form.sex;
export const advantagesValues = (state: RootState): string[] => state.form.advantages;
export const checkboxValue = (state: RootState): number[] => state.form.checkbox;
export const radioValue = (state: RootState): number | null => state.form.radio;
export const aboutValue = (state: RootState): string => state.form.about;
export const storeValues = (state: RootState): IInitialState => state.form;

export default formReducer;
