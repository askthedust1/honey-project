import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiUrl } from '@/constants';
import { IBanner } from '@/types';

interface Props {
  image: IBanner;
}

const ImageItem: React.FC<Props> = ({ image }) => {
  const picture = apiUrl + '/' + image.image;

  return (
    <Link key={image._id} href={image.page}>
      <Image
        width="0"
        height="0"
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        placeholder="blur"
        blurDataURL={picture}
        quality={50}
        src={picture}
        alt={image.description}
      />
    </Link>
  );
};

export default ImageItem;
