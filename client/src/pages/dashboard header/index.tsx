import { SignedIn, UserButton } from '@clerk/clerk-react';
import './header.scss';

function Header() {
    return (
        <header className='dashboard-header'>
            <h3>The Finance Tracking App</h3>
            <ul>
                <li>Our Services</li>
                <li>Contact Us</li>
                <li>About</li>
            </ul>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}

export default Header;