import React from 'react';
import LoadingSpinnerBtn from '@/components/UI/LoadingSpinnerBtn/LoadingSpinnerBtn';
import Link from 'next/link';

interface IProps {
  text: string;
  loading?: boolean;
  type?: 'submit' | 'button';
  btn?: string;
  event?: () => void;
  link?: string;
}

const ButtonUi: React.FC<IProps> = ({ link, event, loading, type, text, btn }) => {
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
    <button onClick={event} style={styledBtn} className={btn} type={type} disabled={loading}>
      {loading ? <LoadingSpinnerBtn /> : null} {text}
    </button>
  );
};

export default ButtonUi;
