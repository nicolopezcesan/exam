
import BootstrapSpinner from 'react-bootstrap/Spinner';

const Spinner = ({ animation = 'border', role = 'status' }) => {
    return (
        <BootstrapSpinner animation={animation} role={role} />
    );
}

export default Spinner;