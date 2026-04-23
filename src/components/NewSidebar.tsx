import React, { useState, useRef } from 'react';
import { 
  Plus, 
  DollarSign, 
  Package, 
  ClipboardList, 
  BarChart3, 
  Search, 
  Bell, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarIconProps {
  id: string;
  icon: React.ElementType;
  hoveredId: string | null;
  setHoveredId: (id: string | null, top?: number) => void;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarIcon = ({ id, icon: Icon, hoveredId, setHoveredId, isActive, onClick }: SidebarIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={ref}
      className="relative flex py-2 justify-center group cursor-pointer"
      onMouseEnter={() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setHoveredId(id, rect.top);
        }
      }}
      onMouseLeave={() => setHoveredId(null)}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand rounded-r-full"></div>
      )}
      <div className={`p-2 rounded-lg transition-all duration-200 ${
        hoveredId === id || isActive ? 'bg-white/10 text-brand' : 'text-slate-400 group-hover:bg-white/5 group-hover:text-slate-200'
      }`}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      </div>
    </div>
  );
};

interface FlyoutProps {
  id: string;
  hoveredId: string | null;
  items: any[];
  setHoveredId: (id: string | null) => void;
  top: number;
  onItemClick: (item: string) => void;
}

const FlyoutMenu = ({ id, hoveredId, items, setHoveredId, top, onItemClick }: FlyoutProps) => {
  if (hoveredId !== id) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed left-[72px] z-[60]"
      style={{ top: Math.min(top, window.innerHeight - 300) }}
      onMouseEnter={() => setHoveredId(id)}
      onMouseLeave={() => setHoveredId(null)}
    >
       <div className="bg-white border border-border shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-xl min-w-[200px] overflow-hidden py-2 h-fit max-h-[70vh] overflow-y-auto">
        {items.map((section, sIndex) => (
          <React.Fragment key={sIndex}>
            {sIndex > 0 && <div className="h-px bg-border my-2 mx-4"></div>}
            {section.map((item: string) => (
              <button 
                key={item}
                onClick={() => onItemClick(item)}
                className="w-full text-left px-5 py-2.5 text-[13px] font-medium text-text-primary hover:bg-page-bg hover:text-brand transition-colors flex items-center justify-between group"
              >
                {item}
                <ChevronRight size={14} className="text-text-secondary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default function NewSidebar({ activePage, setActivePage }: { activePage: string, setActivePage: (p: string) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredTop, setHoveredTop] = useState<number>(0);
  const flyoutTimer = useRef<any>(null);

  const handleSetHovered = (id: string | null, top?: number) => {
    if (flyoutTimer.current) clearTimeout(flyoutTimer.current);
    if (id) {
      setHoveredId(id);
      if (top !== undefined) setHoveredTop(top);
    } else {
      flyoutTimer.current = setTimeout(() => {
        setHoveredId(null);
      }, 100);
    }
  };

  const menuData: Record<string, string[][]> = {
    'plus': [
      ['Sales Order', 'Sales Quote', 'Customer'],
      ['Product', 'Adjust', 'Count'],
      ['Purchase Order', 'Purchase Quote', 'Vendor']
    ],
    'dollar': [['Sales Orders', 'Sales Quote', 'Customers']],
    'package': [['Products', 'Reorder', 'Current Stock', 'Stock Transfer', 'Stock Adjustment', 'Stock Counts']],
    'list': [['Purchase Orders', 'Purchase Quotes', 'Vendors']],
    'reports': [['Recently Generated', 'Sales', 'Stock Levels', 'Purchasing', 'Reordering & Forecasting', 'Audit Log']]
  };

  const handleItemClick = (item: string) => {
    if (item === 'Products' || item === 'Product') setActivePage('products');
    if (item === 'Sales Orders' || item === 'Sales Order') setActivePage('sales');
    if (item === 'Purchase Orders' || item === 'Purchase Order') setActivePage('purchase');
    
    // Reports navigation
    const reportCategories = ['Sales', 'Stock Levels', 'Purchasing', 'Reordering & Forecasting', 'Audit Log'];
    if (reportCategories.includes(item)) setActivePage('reports');
    
    setHoveredId(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Icon Sidebar */}
      <aside className="w-[72px] bg-sidebar flex flex-col pt-4 z-50">
        <div className="flex justify-center mb-8 cursor-pointer" onClick={() => setActivePage('dashboard')}>
           <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand/20">
             i
           </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <SidebarIcon id="plus" icon={Plus} hoveredId={hoveredId} setHoveredId={handleSetHovered} />
          <SidebarIcon id="dollar" icon={DollarSign} hoveredId={hoveredId} setHoveredId={handleSetHovered} isActive={activePage === 'sales'} onClick={() => setActivePage('sales')} />
          <SidebarIcon id="package" icon={Package} hoveredId={hoveredId} setHoveredId={handleSetHovered} isActive={activePage === 'products'} onClick={() => setActivePage('products')} />
          <SidebarIcon id="list" icon={ClipboardList} hoveredId={hoveredId} setHoveredId={handleSetHovered} isActive={activePage === 'purchase'} onClick={() => setActivePage('purchase')} />
          <SidebarIcon id="reports" icon={BarChart3} hoveredId={hoveredId} setHoveredId={handleSetHovered} isActive={activePage === 'reports'} onClick={() => setActivePage('reports')} />
        </div>

        <div className="pb-6 flex justify-center mt-auto">
           <div className="w-8 h-8 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-[10px] text-slate-300 font-bold">
             JD
           </div>
        </div>
      </aside>

      <AnimatePresence>
        {hoveredId && menuData[hoveredId] && (
          <FlyoutMenu 
            id={hoveredId} 
            hoveredId={hoveredId} 
            items={menuData[hoveredId]} 
            setHoveredId={handleSetHovered} 
            top={hoveredTop}
            onItemClick={handleItemClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
