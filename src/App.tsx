import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import NewSidebar from './components/NewSidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import SalesOrders from './pages/SalesOrders';
import PurchaseOrders from './pages/PurchaseOrders';
import Reports from './pages/Reports';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'sales':
        return <SalesOrders />;
      case 'purchase':
        return <PurchaseOrders />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-page-bg overflow-hidden">
      <NewSidebar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 shrink-0">
           <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search products, orders, customers..." 
                className="w-full h-10 pl-10 pr-4 bg-page-bg border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
              />
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-2 text-text-secondary hover:bg-page-bg rounded-lg relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand font-bold text-xs ring-2 ring-brand/20 cursor-pointer">
                 JD
              </div>
           </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
           {renderPage()}
        </div>
      </main>
    </div>
  );
}

// Helper components/icons
