import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Rounded from '../../common/RoundedButton';
import { opacity, slideUp } from './animation';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

export default function Index() {
	const phrase = `At Nalin Tutorials LLP, we believe education is the most powerful tool for personal and societal transformation. Founded in 2024 and headquartered in Mumbai, we are a dedicated team of educators, mentors, and innovators working to empower students with the knowledge, skills, and confidence they need to thrive in academics and beyond.\n\nOur mission is simple: to make high-quality, personalized learning accessible to every student, regardless of background. With a strong foundation in academic coaching and a passion for student success, we offer curated learning programs, expert guidance, and a supportive environment that nurtures curiosity and growth.\n\nWhat sets us apart is our student-first approach. Whether it's exam preparation, concept building, or skill development, we tailor our teaching methods to each learner's pace and needs. Through interactive sessions, real-world problem-solving, and continuous mentorship, we aim to not just teach—but to inspire.`;
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
					Nalin Tutorials LLP is more than just a coaching institute.
					It is a movement towards redefining education, one student
					at a time.
				</motion.p>
				<div data-scroll data-scroll-speed={0.1}>
					<Link to="/contact">
						<Rounded className={styles.button}>
							<p>Get in touch</p>
						</Rounded>
					</Link>
				</div>
			</div>
		</div>
	);
}
