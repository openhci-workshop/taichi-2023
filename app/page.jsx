import Head from 'next/head';

const HomePage = () => {
	return (
		<div> 
		    <Head>
        		<title>TAICHI 2023</title>
        		<meta name="description" content="TAICHI 2023（第九屆臺灣人機互動研討會）為臺灣人機互動學會主辦的年度研討會，旨在集結在臺灣進行科技、設計、人因等多元文化、背景、個人特質的研究人員與從業者交流互動。" key="desc" />
        		<meta property="og:title" content="TAICHI 2023" />
        		<meta
          			property="og:description"
          			content="TAICHI 2023（第九屆臺灣人機互動研討會）為臺灣人機互動學會主辦的年度研討會，旨在集結在臺灣進行科技、設計、人因等多元文化、背景、個人特質的研究人員與從業者交流互動。"
        		/>
        		<meta
          			property="og:image"
          			content="https://taichi2023.taiwanchi.org/og.png"
        		/>
      		</Head>
		</div>
	);
};

export default HomePage;
