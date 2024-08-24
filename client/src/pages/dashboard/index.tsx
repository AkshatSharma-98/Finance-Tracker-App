import { useUser } from '@clerk/clerk-react';
import { FinancialRecordForm } from './financialRecordForm';
import FinancialRecordList from './financialRecordList';
import { useNavigate } from 'react-router-dom';
import Header from '../dashboard header';
import './styles/dashboard.scss';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();

    if (isLoaded && !user) {
        setTimeout(() => {
            navigate('/auth');
        }, 2000);
    }

    return (
        <div className='dashboard-container'>
            <Header />
            {
                <div className='fadeInUp-animation'>
                    <h1 style={{
                        margin: "40px auto",
                        textAlign: "center"
                    }}>Welcome {user?.firstName}, Here Are Your Finances!</h1>
                    <FinancialRecordForm />
                    <FinancialRecordList />
                </div>
            }
        </div>
    )
};

export default Dashboard;