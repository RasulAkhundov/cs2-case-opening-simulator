"use client";
import React from 'react';
import './singleCrate.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function SingleCrate({
  name,
  image,
  id,
  href
}) {
  return (
    <Link href={href ? href : '/'}>
      <div className='single-crate__wrapper' id={id}>
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          quality={100}
          className='crate__image'
        />

        <div className="crate__name">
          <span className='font'>{name}</span>
        </div>
      </div>
    </Link>
  )
}
