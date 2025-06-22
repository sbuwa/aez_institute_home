'use client';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import Project from './components/project';
import styles from './style.module.scss';

const projects = [
	{
		title: 'Hardware',
		src: 'c2montreal.png',
		color: '#d4e09b',
		contents:
			'Bearings, Bolts, Bushings, Clamps, Collars, Fasteners, Fittings, Grommets, Inserts, Nuts, O-Rings Pins, Rivets, Screws, Spacers, Studs, Washers.',
	},
	{
		title: 'Interconnect',
		src: 'officestudio.png',
		color: '#f6f4d2',
		contents:
			'Back shells, Connectors, Contacts, Lamps, Passive Electronics, Relays, Switches, Termination Devices, Tools, Tubing, Wire and Cable.',
	},
	{
		title: 'OEM Spares',
		src: 'locomotive.png',
		color: '#cbdfbd',
		contents: 'Batteries, Filters, Fittings, Metals, OEM Spares.',
	},
	{
		title: 'Consumables',
		src: 'silencio.png',
		color: '#f19c79',
		contents:
			'Adhesives, Cleaners, Coatings, Consumables, Greases, Lubricants, Paints, Rubber, Sealants, Solvents, Tapes, Tires.',
	},
];

const scaleAnimation = {
	initial: { scale: 0, x: '-50%', y: '-50%' },
	enter: {
		scale: 1,
		x: '-50%',
		y: '-50%',
		transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
	},
	closed: {
		scale: 0,
		x: '-50%',
		y: '-50%',
		transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
	},
};

export default function Home() {
	const [modal, setModal] = useState({ active: false, index: 0 });
	const { active, index } = modal;
	const modalContainer = useRef(null);
	const cursor = useRef(null);
	const cursorLabel = useRef(null);

	let xMoveContainer = useRef(null);
	let yMoveContainer = useRef(null);
	let xMoveCursor = useRef(null);
	let yMoveCursor = useRef(null);
	let xMoveCursorLabel = useRef(null);
	let yMoveCursorLabel = useRef(null);

	useEffect(() => {
		//Move Container
		xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
			duration: 0.8,
			ease: 'power3',
		});
		yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
			duration: 0.8,
			ease: 'power3',
		});
		//Move cursor
		xMoveCursor.current = gsap.quickTo(cursor.current, 'left', {
			duration: 0.5,
			ease: 'power3',
		});
		yMoveCursor.current = gsap.quickTo(cursor.current, 'top', {
			duration: 0.5,
			ease: 'power3',
		});
		//Move cursor label
		xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
			duration: 0.45,
			ease: 'power3',
		});
		yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
			duration: 0.45,
			ease: 'power3',
		});
	}, []);

	const moveItems = (x, y) => {
		xMoveContainer.current(x);
		yMoveContainer.current(y);
		xMoveCursor.current(x);
		yMoveCursor.current(y);
		xMoveCursorLabel.current(x);
		yMoveCursorLabel.current(y);
	};
	const manageModal = (active, index, x, y) => {
		moveItems(x, y);
		setModal({ active, index });
	};

	return (
		<main
			onMouseMove={(e) => {
				moveItems(e.clientX, e.clientY);
			}}
			className={styles.projects}
		>
			<div className={styles.body}>
				{projects.map((project, index) => {
					return (
						<Project
							index={index}
							title={project.title}
							manageModal={manageModal}
							key={index}
						/>
					);
				})}
			</div>
			{/* <Rounded>
				<p>More work</p>
			</Rounded> */}
			<>
				<motion.div
					ref={modalContainer}
					variants={scaleAnimation}
					initial="initial"
					animate={active ? 'enter' : 'closed'}
					className={styles.modalContainer}
				>
					<div
						style={{ top: index * -100 + '%' }}
						className={styles.modalSlider}
					>
						{projects.map((project, index) => {
							const { src, color, contents } = project;
							return (
								<div
									className={styles.modal}
									style={{ backgroundColor: color }}
									key={`modal_${index}`}
								>
									{/* <Image
										src={`/images/${src}`}
										width={300}
										height={0}
										alt="image"
									/> */}
									<p>{contents}</p>
								</div>
							);
						})}
					</div>
				</motion.div>
				{/* <motion.div
					ref={cursor}
					className={styles.cursor}
					variants={scaleAnimation}
					initial="initial"
					animate={active ? 'enter' : 'closed'}
				></motion.div>
				<motion.div
					ref={cursorLabel}
					className={styles.cursorLabel}
					variants={scaleAnimation}
					initial="initial"
					animate={active ? 'enter' : 'closed'}
				>
					View
				</motion.div> */}
			</>
		</main>
	);
}
