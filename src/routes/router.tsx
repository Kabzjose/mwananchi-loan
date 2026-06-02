import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { AboutPrototypePage } from '../pages/AboutPrototypePage';
import { ArchitecturePage } from '../pages/ArchitecturePage';
import { FinancialLiteracyCoachPage } from '../pages/FinancialLiteracyCoachPage';
import { LandingPage } from '../pages/LandingPage';
import { LoanApplicationPage } from '../pages/LoanApplicationPage';
import { LoanResultsPage } from '../pages/LoanResultsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'apply', element: <LoanApplicationPage /> },
      { path: 'results', element: <LoanResultsPage /> },
      { path: 'coach', element: <FinancialLiteracyCoachPage /> },
      { path: 'about-prototype', element: <AboutPrototypePage /> },
      { path: 'architecture', element: <ArchitecturePage /> },
    ],
  },
]);
