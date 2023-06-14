import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';

import styles from './styles.module.scss';

import Logo from '../../../../public/logo.png';

const Hero = () => {


  return (
    <div
      className={classnames(styles.backdrop)}
    >
      <Image src={Logo} alt="taichi-logo" className="h-12 md:h-16 w-auto" />
      hero
    </div>
  )
}

export default Hero;