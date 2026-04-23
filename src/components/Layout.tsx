import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown 
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, isActive, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-brand-light text-brand font-medium' 
          : 'text-text-secondary hover:bg-page-bg hover:text-text-primary'
      }`}
    >
      <Icon size={20} className={isActive ? 'text-brand' : 'text-text-secondary'} strokeWidth={2} />
      <span>{label}</span>
    </button>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Layout({ children, activePage, setActivePage }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-page-bg text-text-primary">
      {/* Sidebar */}
      <aside className="w-[260px] fixed h-full bg-white border-r border-border flex flex-col z-20">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <Package className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">inFlow</h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            isActive={activePage === 'dashboard'} 
            onClick={() => setActivePage('dashboard')} 
          />
          <SidebarItem 
            icon={Package} 
            label="Products" 
            isActive={activePage === 'products'} 
            onClick={() => setActivePage('products')} 
          />
          <SidebarItem 
            icon={ShoppingCart} 
            label="Sales Orders" 
            isActive={activePage === 'sales'} 
            onClick={() => setActivePage('sales')} 
          />
          <SidebarItem 
            icon={Truck} 
            label="Purchase Orders" 
            isActive={activePage === 'purchase'} 
            onClick={() => setActivePage('purchase')} 
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Reports" 
            isActive={activePage === 'reports'} 
            onClick={() => setActivePage('reports')} 
          />
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            isActive={activePage === 'settings'} 
            onClick={() => setActivePage('settings')} 
          />
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand font-bold text-xs ring-2 ring-brand/10">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">John Doe</span>
              <span className="text-xs text-text-secondary">Administrator</span>
            </div>
            <ChevronDown size={16} className="ml-auto text-text-secondary" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-border fixed top-0 right-0 left-[260px] z-10 flex items-center justify-between px-8">
          <div className="relative w-96">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Search products, orders, customers..." 
              className="w-full bg-page-bg border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-text-secondary hover:bg-page-bg rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-border mx-2"></div>
            <span className="text-sm font-medium text-text-secondary">April 23, 2026</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="mt-16 p-8 min-h-[calc(100vh-64px)]">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
