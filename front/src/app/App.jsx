import { useEffect, useState } from 'react';
import './App.css';
import FileService from '../services/fileService';
import Container from 'react-bootstrap/Container';
import Alert from '../components/UI/Alert/Alert';
import Spinner from '../components/UI/Spinner/Spinner';
import Table from '../components/custom/Table/Table';
import FormFilter from '../components/custom/FormFilter/FormFilter';
import { STATUS_RESPONSE_OK } from '../constants';

const App = () => {
  const [files, setFiles] = useState(null);
  const [filters, setFilters] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      
      const { status, data } = await FileService.getFileList(filters);
      
      if (status === STATUS_RESPONSE_OK) {
        let allLines = [];
        
        data.forEach(({ lines }) => {
          allLines = [...allLines, ...lines];
        });
        
        setFiles(allLines);
        if (isError) setIsError(false);
      } else {
        setIsError(true);
        setErrorMessage(data.message);
      }
    };

    fetchData();
  }, [filters]);

  const getColumns = () => {
    return [
      { name: 'file', label: 'File Name' },
      { name: 'text', label: 'Text' },
      { name: 'number', label: 'Number' },
      { name: 'hex', label: 'Hex' },
    ]
  };

  const setFormFilters = (filters) => {
    setFilters(filters);
  };

  const removeFilters = () => {
    setFilters({});
  };

  return (
    <Container fluid='md'>

      <Alert text='React Test App' />

      <FormFilter sendDataFields={setFormFilters} removeFilters={removeFilters} />

      {!isError && !files && <Spinner />}

      {!isError && files && files.length > 0
        && <Table columns={getColumns()} data={files} />}

      {isError && <h2>{errorMessage}</h2>}

    </Container>
  );
}

export default App;
