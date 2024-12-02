import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Documents from './components/documents';
import Security from './components/Security';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import { AppProvider, useApp } from './context/AppContext';
import { WalletContextProvider } from './context/WalletContext';

const AppContent = () => {
  const { activeView } = useApp();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'documents':
        return <Documents />;
      case 'security':
        return <Security />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      {renderView()}
    </div>
  );
};

function App() {
  return (
    <WalletContextProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </WalletContextProvider>
  );
}

export default App;