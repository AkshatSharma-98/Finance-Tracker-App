import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const PUBLISHABLE_KEY: string | undefined = process.env.REACT_APP_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable key!');
}

const key = (process.env.NODE_ENV === 'production') ?
  PUBLISHABLE_KEY.replace('_test', '_live') :
  PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ClerkProvider
    publishableKey={key}
    afterSignOutUrl='/auth'
  >
    <App />
  </ClerkProvider>
);
