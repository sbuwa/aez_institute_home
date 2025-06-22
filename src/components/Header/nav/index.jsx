import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { menuSlide } from '../animation';
import Curve from './Curve';
import Link from './Link';
import styles from './style.module.scss';

const navItems = [
	{
		title: 'Home',
		href: '/',
	},
	{
		title: 'Work',
		href: '/work',
	},
	{
		title: 'About',
		href: '/about',
	},
	{
		title: 'Contact',
		href: '/contact',
	},
];

export default function Index() {
	const location = useLocation();
	const currentPath = location.currentPath;
	const [selectedIndicator, setSelectedIndicator] = useState(currentPath);

	return (
		<motion.div
			variants={menuSlide}
			initial="initial"
			animate="enter"
			exit="exit"
			className={styles.menu}
		>
			<div className={styles.body}>
				<div
					onMouseLeave={() => {
						setSelectedIndicator(currentPath);
					}}
					className={styles.nav}
				>
					<div className={styles.header}>
						<p>Navigation</p>
					</div>
					{navItems.map((data, index) => {
						return (
							<Link
								key={index}
								data={{ ...data, index }}
								isActive={selectedIndicator === data.href}
								setSelectedIndicator={setSelectedIndicator}
							></Link>
						);
					})}
				</div>
				{/* <Footer /> */}
			</div>
			<Curve />
		</motion.div>
	);
}
