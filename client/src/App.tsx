import './App.scss';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import AuthenticationPage from './pages/authentication';
import { FinancialRecordsProvider } from './contexts/FinancialRecordContext';
import { useUser } from '@clerk/clerk-react';
import loader from './assets/animation-loading.svg';
import { useEffect } from 'react';


function App() {

  const { user, isLoaded } = useUser();

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/'
            element={
              (user && isLoaded) ?
                <FinancialRecordsProvider>
                  <Dashboard />
                </FinancialRecordsProvider> :
                <LoaderComponent />
            }
          />
          <Route path='/auth' element={<AuthenticationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const LoaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    if (user === null) {
      navigate('/auth');
    }
  }, [user]);

  return (
    <div className='loader-bg'>
      <div>
        <img src={loader} alt="loader" />
      </div>
    </div>
  )
}

export default App;
