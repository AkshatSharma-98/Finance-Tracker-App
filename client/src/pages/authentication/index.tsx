import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
    useUser
} from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import './auth.scss';
import bgImage from '../../assets/image-bg.jpg'

const AuthenticationPage = () => {

    const { user, isLoaded } = useUser();
    const navigate = useNavigate();
    if (user && isLoaded) {
        navigate('/');
    }

    return (
        <>
            <div className="sign-in-container">
                <div>

                    <h1>SIGN-IN TO FINANCE TRACKER APP</h1>
                    <div className="sign-in-out-btns">
                        <SignedOut>
                            <SignUpButton mode='modal'>SIGN UP</SignUpButton>
                            <SignInButton mode='modal'>SIGN IN</SignInButton>
                        </SignedOut>
                    </div>
                </div>
            </div>
            <div className="auth-bg"></div>
        </>
    )
};

export default AuthenticationPage;