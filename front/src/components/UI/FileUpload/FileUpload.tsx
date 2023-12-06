import React, { useRef, useState } from 'react';
import cls from '@/styles/_fileUpload.module.scss';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileUpload: React.FC<Props> = ({ onChange, name, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        name={name}
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={onFileChange}
      />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" value={fileName} placeholder={label} disabled className={cls.input} />

        <button
          type="button"
          style={{ marginLeft: '90px', padding: '10px', cursor: 'pointer' }}
          className={cls.btnFile}
          onClick={activateInput}
        >
          Загрузить
        </button>
      </div>
    </>
  );
};

export default FileUpload;
