"use client"

import React from 'react'
import Gallery from 'react-photo-gallery';

const photos = Array.from({ length: 52 }, (_, i) => ({
  src: `/gallery/pic${i + 1}.jpg`,
}));

const index = () => {
  return (
    <Gallery photos={photos} />
  )
}

export default index