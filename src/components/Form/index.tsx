import React, { useState } from 'react';
import styles from './Form.module.scss';
import ProgressBar from '../ProgressBar';
import NameForm from '../NameForm';
import SkillsForm from '../SkillsForm';
import AboutForm from '../AboutForm';
import Modal from '../Modal';

function Form(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  return (
    <>
      {isOpen && <div className={styles.overlay} />}
      <section className={styles.section}>
        <ProgressBar number={step} />
        {step === 1 && <NameForm step={step} setStep={setStep} />}
        {step === 2 && <SkillsForm step={step} setStep={setStep} />}
        {step === 3 && (
          <AboutForm
            step={step}
            setStep={setStep}
            setIsSuccess={setIsSuccess}
            setIsOpen={setIsOpen}
          />
        )}
        {isOpen && <Modal setIsOpen={setIsOpen} isSuccess={isSuccess} />}
      </section>
    </>
  );
}

export default Form;
