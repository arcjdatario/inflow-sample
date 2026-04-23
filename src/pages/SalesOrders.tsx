import React, { useState } from 'react';
import { Search, Plus, MoreVertical, FileText, Download } from 'lucide-react';
import CustomerSelectModal from '../components/CustomerSelectModal';
import SalesOrderEditor from '../components/SalesOrderEditor';

const salesOrders = [
  { id: 'SO-9842', customer: 'Acme Corp', date: 'April 23, 2026', total: '$1,250.00', status: 'Shipped' },
  { id: 'SO-9843', customer: 'Global Tech Solutions', date: 'April 22, 2026', total: '$4,800.00', status: 'Delivered' },
  { id: 'SO-9844', customer: 'John Smith', date: 'April 22, 2026', total: '$85.00', status: 'Draft' },
  { id: 'SO-9845', customer: 'LogisTech Inc', date: 'April 21, 2026', total: '$2,140.00', status: 'Delivered' },
  { id: 'SO-9846', customer: 'Creative Design Studio', date: 'April 21, 2026', total: '$650.00', status: 'Shipped' },
  { id: 'SO-9847', customer: 'Valley Supply Co', date: 'April 20, 2026', total: '$12,400.00', status: 'Draft' },
  { id: 'SO-9848', customer: 'Retail Giant', date: 'April 20, 2026', total: '$8,920.00', status: 'Delivered' },
  { id: 'SO-9849', customer: 'Small Office LLC', date: 'April 19, 2026', total: '$340.00', status: 'Shipped' },
];

export default function SalesOrders() {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleNewSale = () => {
    setIsCustomerModalOpen(true);
  };

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setIsCustomerModalOpen(false);
    setView('editor');
  };

  if (view === 'editor' && selectedCustomer) {
    return <SalesOrderEditor customer={selectedCustomer} onBack={() => setView('list')} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Sales Orders</h2>
          <p className="text-text-secondary text-sm">Track customer orders and shipment status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-white rounded-lg text-text-secondary hover:text-text-primary hover:bg-page-bg transition-all font-medium text-sm">
            <FileText size={18} />
            <span>Bulk Invoice</span>
          </button>
          <button onClick={handleNewSale} className="inflow-btn-primary h-10 px-6">
            <Plus size={20} />
            <span>New Sale</span>
          </button>
        </div>
      </div>

      <CustomerSelectModal 
        isOpen={isCustomerModalOpen} 
        onClose={() => setIsCustomerModalOpen(false)} 
        onSelect={handleCustomerSelect} 
      />

      {/* Tabs / Filters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button className="px-4 py-2 bg-brand text-white rounded-full text-sm font-medium whitespace-nowrap">All Orders</button>
        <button className="px-4 py-2 bg-white border border-border text-text-secondary hover:bg-page-bg rounded-full text-sm font-medium whitespace-nowrap">Open (12)</button>
        <button className="px-4 py-2 bg-white border border-border text-text-secondary hover:bg-page-bg rounded-full text-sm font-medium whitespace-nowrap">Draft (4)</button>
        <button className="px-4 py-2 bg-white border border-border text-text-secondary hover:bg-page-bg rounded-full text-sm font-medium whitespace-nowrap">Shipped (8)</button>
        <button className="px-4 py-2 bg-white border border-border text-text-secondary hover:bg-page-bg rounded-full text-sm font-medium whitespace-nowrap">Fulfilled</button>
      </div>

      {/* Search Bar */}
      <div className="inflow-card p-4 flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search by order #, customer..." 
            className="w-full bg-page-bg border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
          />
        </div>
        <button className="p-2 text-text-secondary hover:bg-page-bg rounded-lg border border-border">
          <Download size={18} />
        </button>
      </div>

      {/* Table */}
      <div className="inflow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-page-bg border-b border-border">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded text-brand focus:ring-brand border-border" />
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Order #</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Total Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map((order) => (
                <tr key={order.id} className="inflow-table-row">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded text-brand focus:ring-brand border-border" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-text-primary">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                      order.status === 'Shipped' ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-page-bg rounded-md transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 bg-white border-t border-border text-center">
          <div className="flex items-center justify-center gap-2">
            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium" disabled>Previous</button>
            <button className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium">1</button>
            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium">2</button>
            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
