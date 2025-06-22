import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Rounded from '../../common/RoundedButton';
import { opacity, slideUp } from './animation';
import styles from './style.module.scss';

export default function Index() {
	const phrase =
		'At Flamingo Aero Solutions, our story began with a vision—a vision to redefine excellence in aerospace spare parts. Founded by aviation enthusiasts and industry veterans, we embarked on a mission to bridge the gap between innovation and reliability. Our journey has been fueled by unwavering commitment, technical expertise, and a genuine love for all things aviation.';
	const description = useRef(null);
	const isInView = useInView(description);
	return (
		<div ref={description} className={styles.description}>
			<div className={styles.body}>
				<p>
					{phrase.split(' ').map((word, index) => {
						return (
							<span key={index} className={styles.mask}>
								<motion.span
									variants={slideUp}
									custom={index}
									animate={isInView ? 'open' : 'closed'}
									key={index}
								>
									{word}
								</motion.span>
							</span>
						);
					})}
				</p>
				<motion.p
					variants={opacity}
					animate={isInView ? 'open' : 'closed'}
				>
					At Flamingo Aero Solutions, we soar beyond boundaries,
					supplying top-tier aerospace spare parts to propel your
					aviation endeavors.{' '}
				</motion.p>
				<div data-scroll data-scroll-speed={0.1}>
					<Rounded className={styles.button}>
						<p>Get in touch</p>
					</Rounded>
				</div>
			</div>
		</div>
	);
}
