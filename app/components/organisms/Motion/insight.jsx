'use client';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Trail, Float } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils';

export default function Insight() {
	function Point({
		withSphere = false,
		sphereRadius,
		pathColor = '#cf50ba',
		pathRadius,
		sphereColor = 'cf50ba',
		speed,
		flatten = 1,
		delay = 0,
		...props
	}) {
		const ref = useRef();
		const [prevX, setPrevX] = useState(0);

		useFrame(state => {
			const t = (state.clock.getElapsedTime() + delay) * speed * 0.1;

			// let tan = Math.abs(Math.tan(t) * 6);
			// let sin = Math.sin(t) * pathRadius;

			// let y = tan;
			// let x = sin;

			// if (tan < -6) {
			// 	y = -6;
			// 	x = prevX;
			// } else if (tan > 6) {
			// 	y = 6;
			// 	x = prevX;
			// }

			// setPrevX(x);

			let x = Math.sin(t) * (1 / pathRadius) * Math.sqrt(pathRadius);
			let y = pathRadius * Math.pow(x, 2);

			if (y < 2 && y > -2) {
				ref.current.position.set(x, y, 0);
			}

			// ref.current.position.set(Math.sin(t) * pathRadius, calcY(t), 0)
		});

		return (
			<group {...props}>
				<Trail width={0.1} length={5} color={new THREE.Color(pathColor)} attenuation={t => t * t}>
					<mesh ref={ref}>
						{withSphere && (
							<>
								<sphereGeometry args={[sphereRadius]} />
								<meshBasicMaterial color={new THREE.Color(sphereColor)} />
							</>
						)}
					</mesh>
				</Trail>
			</group>
		);
	}

	return (
		// <Canvas camera={{ position: [0, 0, 20] }}>
		<>
			<Point pathRadius={0.6} pathColor="#4b8d2d" speed={-6} delay={3.9} />
			<Point pathRadius={0.8} pathColor="#01732e" speed={-6} delay={0.5} />
			<Point pathRadius={1} pathColor="#66992c" speed={-6} delay={4.4} />
			<Point pathRadius={2} pathColor="#4b8d2d" speed={-6} delay={1.6} />
			<Point pathRadius={4} pathColor="#2f802e" speed={-6} delay={0.1} />
			<Point pathRadius={6} pathColor="#01732e" speed={-6} delay={2.2} />
			<Point pathRadius={10} pathColor="#4b8d2d" speed={-6} delay={5.7} />

			<Point pathRadius={0.6} pathColor="#4b8d2d" speed={6} delay={3.7} />
			<Point pathRadius={0.8} pathColor="#01732e" speed={6} delay={5.2} />
			<Point pathRadius={1} pathColor="#66992c" speed={6} delay={0.6} />
			<Point pathRadius={2} pathColor="#4b8d2d" speed={6} delay={3.4} />
			<Point pathRadius={4} pathColor="#2f802e" speed={6} delay={2.5} />
			<Point pathRadius={6} pathColor="#01732e" speed={6} delay={5.1} />
			<Point pathRadius={10} pathColor="#4b8d2d" speed={6} delay={4.9} />

			<Point pathRadius={0.6} pathColor="#f4d03f" speed={-6} rotation={[0, 0, degToRad(180)]} delay={4.9} />
			<Point pathRadius={0.8} pathColor="#f4d03f" speed={-6} rotation={[0, 0, degToRad(180)]} delay={3.7} />
			<Point pathRadius={1} pathColor="#f4d03f" speed={-6} rotation={[0, 0, degToRad(180)]} delay={4.4} />
			<Point pathRadius={2} pathColor="#d6c637" speed={-6} rotation={[0, 0, degToRad(180)]} delay={2.5} />
			<Point pathRadius={4} pathColor="#b8bc31" speed={-6} rotation={[0, 0, degToRad(180)]} delay={0.6} />
			<Point pathRadius={6} pathColor="#9c812e" speed={-6} rotation={[0, 0, degToRad(180)]} delay={2.2} />
			<Point pathRadius={10} pathColor="#9c812e" speed={-6} rotation={[0, 0, degToRad(180)]} delay={0.5} />

			<Point pathRadius={0.6} pathColor="#f4d03f" speed={6} rotation={[0, 0, degToRad(180)]} delay={0.6} />
			<Point pathRadius={0.8} pathColor="#f4d03f" speed={6} rotation={[0, 0, degToRad(180)]} delay={5.1} />
			<Point pathRadius={1} pathColor="#f4d03f" speed={6} rotation={[0, 0, degToRad(180)]} delay={3.4} />
			<Point pathRadius={2} pathColor="#d6c637" speed={6} rotation={[0, 0, degToRad(180)]} delay={2.2} />
			<Point pathRadius={4} pathColor="#b8bc31" speed={6} rotation={[0, 0, degToRad(180)]} delay={2.5} />
			<Point pathRadius={6} pathColor="#9c812e" speed={6} rotation={[0, 0, degToRad(180)]} delay={3.9} />
			<Point pathRadius={10} pathColor="#9c812e" speed={6} rotation={[0, 0, degToRad(180)]} delay={0.5} />
		</>
		// </Canvas>
	);
}