import React from 'react';
import styles from '@/styles.module.scss';
import classnames from 'classnames';
import { Noto_Sans_TC } from 'next/font/google';
import NavBar from '@/components/organisms/NavBar'
import SectionTitle from '@/components/molecules/SectionTitle';
import BlockTitle from '@/components/molecules/BlockTitle';
import Footer from '@/components/organisms/Footer';
import Button from '@/components/atoms/Button';
import Player from '@/components/organisms/Player';
import Photos from '@/components/organisms/Photos';

export const metadata = {
	title: 'TAICHI 2023 Gallery',
	description: 'TAICHI 2023 Gallery',
	keywords: '',
};

const notoSansTC = Noto_Sans_TC({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
});

const Gallery = () => {
  return (
    <div className={classnames(styles.backgroundAlt)}>
      <NavBar />
      
      <div className="container mx-auto px-6 md:px-8 py-8 md:py-24 lg:py-36 relative z-20" id="sponsors">
        {/* 註冊會議 Registration */}
				<section className="mb-14 md:mb-28" id="sv">
					<SectionTitle titleZh="活動花絮" titleEn="Highlights" />
						<div
							className={classnames(
								styles.blockBackdrop,
								'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-16'
							)}
						>
              <Player />
						</div>
            <div
							className={classnames(
								styles.blockBackdrop,
								'relative w-100 flex flex-col p-8 sm:px-12 sm:py-16 lg:px-20 lg:py-24 mb-8 md:mb-16 gap-4 md:gap-16'
							)}
						>
              <Photos />
						</div>
				</section>

      

        <Footer />
      </div>
    </div>
  )
}

export default Gallery