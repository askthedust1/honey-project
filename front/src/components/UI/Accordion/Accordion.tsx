import React, { useState } from 'react';
import cls from '@/styles/_accordion.module.scss';

interface Props {
  item: { title: string; content: string };
}

const Accordion: React.FC<Props> = ({ item }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={cls.accordion_item}>
      <div className={cls.accordion_title} onClick={() => setIsActive(!isActive)}>
        <div>{item.title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div className={cls.accordion_content}>{item.content}</div>}
    </div>
  );
};

export default Accordion;
