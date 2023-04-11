import BootstrapAlert from 'react-bootstrap/Alert';

const Alert = ({ text = 'Alert text', key = 'danger', variant = 'danger' }) => {
    return (
        <BootstrapAlert key={key} variant={variant}>
            {text}
        </BootstrapAlert>
    );
}

export default Alert;