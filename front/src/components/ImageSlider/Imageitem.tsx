import React from 'react';
import Image from 'next/image';
import { apiUrl } from '@/constants';
import Link from 'next/link';
import { IBanner } from '@/types';

interface Props {
  image: IBanner;
}

const Imageitem: React.FC<Props> = ({ image }) => {
  const picture = apiUrl + '/' + image.image;

  return (
    <Link key={image._id} href={image.page}>
      <Image
        width="0"
        height="0"
        sizes="100vw"
        loading="lazy"
        style={{ width: '100%', height: 'auto' }}
        quality={100}
        src={picture}
        alt={image.description}
      />
    </Link>
  );
};

export default Imageitem;
