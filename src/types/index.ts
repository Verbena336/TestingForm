import { Dispatch, SetStateAction } from 'react';

export type TStepProps = { step: number; setStep: Dispatch<SetStateAction<number>> };
export type TStepModalProps = {
  step: number;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<number>>;
};
export type TModalProps = {
  isSuccess: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
