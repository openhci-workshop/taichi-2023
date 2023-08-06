import React from 'react'
import classnames from 'classnames'
import styles from '@/styles.module.scss'

const index = () => {
  return (
    <div className={classnames(styles.footer, "flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:justify-start lg:px-20")}>
      <div className="text-xs md:text-base z-10 lg:w-1/3">
        COPYRIGHT © 2023 TAICHI
      </div>
      <div className="text-xs md:text-base text-center leading-6 z-10">
        / <span><a href="https://www.facebook.com/taiwanchi">facebook</a></span>{' '}
        / <span><a href="https://taiwanchi.org/">TAICHI</a></span>{' '}
        /
      </div>
    </div>
  )
}

export default index