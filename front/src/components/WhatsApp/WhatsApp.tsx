import React from 'react';
import cls from '../../styles/_wa.module.scss';

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/+996705888001"
      className={cls.whatsapp_float}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className={cls.whatsapp_icon}></i>
    </a>
  );
};

export default WhatsApp;
