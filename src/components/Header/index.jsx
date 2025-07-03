'use client';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Magnetic from '../../common/Magnetic';
import Rounded from '../../common/RoundedButton';
import Nav from './nav';
import styles from './style.module.scss';

export default function Index() {
	const header = useRef(null);
	const [isActive, setIsActive] = useState(false);
	const location = useLocation();
	const currentPath = location.pathname;
	const button = useRef(null);

	useEffect(() => {
		if (isActive) setIsActive(false);
	}, [currentPath]);

	useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(button.current, {
			scrollTrigger: {
				trigger: document.documentElement,
				start: 0,
				end: window.innerHeight,
				onLeave: () => {
					gsap.to(button.current, {
						scale: 1,
						duration: 0.25,
						ease: 'power1.out',
					});
				},
				onEnterBack: () => {
					gsap.to(
						button.current,
						{ scale: 0, duration: 0.25, ease: 'power1.out' },
						setIsActive(false)
					);
				},
			},
		});
	}, []);

	return (
		<>
			<div ref={header} className={styles.header}>
				<div className={styles.logo}>
					<p className={styles.copyright}>©</p>
					<div className={styles.name}>
						<p className={styles.codeBy}>Code by</p>
						<p className={styles.dennis}>Sameeran</p>
						<p className={styles.snellenberg}>Buwa</p>
					</div>
				</div>
				<div className={styles.nav}>
					<Magnetic>
						<div className={styles.el}>
							<Link to="/work">Work</Link>
							<div className={styles.indicator}></div>
						</div>
					</Magnetic>
					<Magnetic>
						<div className={styles.el}>
							<Link to="/about">About</Link>
							<div className={styles.indicator}></div>
						</div>
					</Magnetic>
					<Magnetic>
						<div className={styles.el}>
							<Link to="/contact">Contact</Link>
							<div className={styles.indicator}></div>
						</div>
					</Magnetic>
				</div>
			</div>
			<div ref={button} className={styles.headerButtonContainer}>
				<Rounded
					onClick={() => {
						setIsActive(!isActive);
					}}
					className={`${styles.button}`}
				>
					<div
						className={`${styles.burger} ${
							isActive ? styles.burgerActive : ''
						}`}
					></div>
				</Rounded>
			</div>
			<AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
		</>
	);
}
