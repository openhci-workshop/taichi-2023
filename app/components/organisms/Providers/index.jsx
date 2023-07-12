'use client';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const Providers = ({ children }) => {
	ScrollTrigger.config({ ignoreMobileResize: true });
	gsap.registerPlugin(ScrollTrigger);

	return <>{children}</>;
};

export default Providers;
