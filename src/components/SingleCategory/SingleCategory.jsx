'use client';
import React, { useEffect, useState } from 'react';
import './singleCategory.scss';
import SingleCrate from '../SingleCrate/SingleCrate';

export default function SingleCategory({ data, href }) {

  useEffect(() => {
    console.log(data);
  })

  return (
    <div className='all-crates__wrapper'>

      {
        data.length === 0 && (
          <h2 className='font loading__text'>Loading...</h2>
        )
      }

      <div className="inner-crates__wrapper main-collection__grid">
        {
          data && data.map((crate, i) => (
            <SingleCrate
              key={i}
              name={crate.name}
              image={crate.image}
              id={crate.id}
              href={`${href}/${crate.id}`}
            />
          ))
        }
      </div>
    </div>
  )
}
