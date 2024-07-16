import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <dir className={styles.nav}>
            <dir className={[styles.container].join(' ')}>
                <div className={styles.brand}>
                    <NavLink to="/">Skonių Mozaika</NavLink>
                </div>
                <ul className={styles.links}>
                    <li><NavLink to="/">Pradžia</NavLink></li>
                    <li><NavLink to="/instruction">Naujienos</NavLink></li>
                    <li><NavLink to="/apie-mus">Apie projektą</NavLink></li>
                </ul>
            </dir>
        </dir>
    )
}

export default Navbar