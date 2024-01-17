import React from 'react';
import Link from 'next/link';
import LoadingSpinnerBtn from '@/components/UI/LoadingSpinnerBtn/LoadingSpinnerBtn';

interface IProps {
  text: string;
  loading?: boolean;
  type?: 'submit' | 'button';
  btn?: string;
  event?: () => void;
  link?: string;
  id?: string;
}

const ButtonUi: React.FC<IProps> = ({ id, link, event, loading, type, text, btn }) => {
  const styledBtn = {
    display: 'flex',
    alignItems: 'center',
  };

  if (link) {
    return (
      <Link className={btn} href={link}>
        {text}
      </Link>
    );
  }

  return (
    <button
      id={id}
      onClick={event}
      style={styledBtn}
      className={btn}
      type={type}
      disabled={loading}
    >
      {loading ? <LoadingSpinnerBtn /> : null} {text}
    </button>
  );
};

export default ButtonUi;
