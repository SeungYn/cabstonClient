import React from 'react';
import styles.from './error.module.css';


const Error = ({error}) => (
	<div className={styles.container}>
		<p className={styles.text}></p>
		<button className={styles.btn}>확인</button>
	</div>
	);

export default Error;