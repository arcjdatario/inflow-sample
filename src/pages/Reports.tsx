import React, { useState } from 'react';
import { 
  ChevronRight, 
  BarChart3, 
  Layers, 
  ShoppingCart, 
  TrendingUp, 
  CreditCard, 
  History, 
  Scan,
  Info,
  Search,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { id: 'sales', name: 'Sales', count: 15, icon: ShoppingCart },
  { id: 'stock', name: 'Stock levels', count: 8, icon: Layers },
  { id: 'purchasing', name: 'Purchasing', count: 6, icon: BarChart3 },
  { id: 'reordering', name: 'Reordering and forecasting', count: 4, icon: TrendingUp },
  { id: 'accounting', name: 'Payment and accounting', count: 7, icon: CreditCard },
  { id: 'audit', name: 'Audit log', count: 8, icon: History },
  { id: 'scans', name: 'Stockroom scans', count: 1, icon: Scan },
];

const reports = [
  {
    title: 'Product sales',
    description: 'Summary or breakdown of products and how well they have been selling.',
  },
  {
    title: 'Abandoned showroom carts',
    description: 'View a list of customers who did not complete their showroom orders',
  },
  {
    title: 'Sales tax',
    description: 'Total sales tax amounts collected from customers',
  },
  {
    title: 'Product price list',
    description: 'List of products, with prices',
  },
  {
    title: 'Operations',
    description: 'List of Sales with their statuses & requested ship dates or Summary of outstanding products a customer has ordered',
  },
  {
    title: 'Sales order summary',
    description: 'Summary of financial information for selected sales orders',
  },
  {
    title: 'Sales order profit',
    description: 'List of sales orders and their gross profit',
  },
  {
    title: 'Sales returns',
    description: 'Breakdown of products returned from sales orders',
  },
  {
    title: 'Sales order by sales representative',
    description: 'List of sales orders with their sales representative',
  },
  {
    title: 'Customer',
    description: "List of customers with their contact information, order history, or products they've ordered",
  },
  {
    title: 'Sales traceability',
    description: 'This report traces downstream sales of a particular lot or serial and anything manufactured from it.',
  },
];

export default function Reports() {
  const [activeCategory, setActiveCategory] = useState('sales');

  return (
    <div className="flex h-full gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar Categories */}
      <div className="w-80 shrink-0 space-y-2">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-4 mb-4">Report Categories</h3>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeCategory === cat.id 
                ? 'bg-white shadow-sm border border-border text-brand' 
                : 'text-text-secondary hover:bg-white/50 hover:text-text-primary'
            }`}
          >
            <div className="flex items-center gap-3">
              <cat.icon size={18} className={activeCategory === cat.id ? 'text-brand' : 'text-slate-400 group-hover:text-text-secondary'} />
              <span className="text-sm font-bold">{cat.name}</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
              activeCategory === cat.id ? 'bg-brand/10 text-brand' : 'bg-slate-100 text-slate-500'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}

        <div className="mt-8 p-6 bg-brand/5 rounded-2xl border border-brand/10 space-y-3">
           <div className="flex items-center gap-2 text-brand">
             <Info size={16} />
             <h4 className="text-xs font-black uppercase tracking-wider">Pro Tip</h4>
           </div>
           <p className="text-xs text-brand/80 font-medium leading-relaxed">
             You can star your favorite reports for quick access in the future.
           </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-text-primary tracking-tight">Which report should I use?</h2>
            <p className="text-text-secondary text-sm font-medium mt-1">Browse the most commonly used reports for your business operations.</p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full h-11 pl-10 pr-4 bg-white border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand/10 focus:border-brand transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, i) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-brand/30 transition-all cursor-pointer flex items-start gap-4"
            >
              <div className="w-10 h-10 bg-page-bg rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-text-primary group-hover:text-brand transition-colors">{report.title}</h4>
                  <button className="text-slate-300 hover:text-amber-400 transition-colors">
                    <Star size={16} />
                  </button>
                </div>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">
                  {report.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
