import React, { useState } from 'react';
import { Truck, Plus, AlertCircle, Calendar, Package } from 'lucide-react';
import PurchaseOrderEditor from '../components/PurchaseOrderEditor';

const purchaseOrders = [
  { id: 'PO-000005', vendor: 'ChemTrail Inc.', date: 'April 23, 2026', delivery: 'April 30, 2026', total: '$425.00', status: 'Unfulfilled' },
  { id: 'PO-1120', vendor: 'LogisTech', date: 'April 15, 2026', delivery: 'April 25, 2026', total: '$14,200.00', status: 'In Transit' },
  { id: 'PO-1121', vendor: 'Acme Displays', date: 'April 18, 2026', delivery: 'April 24, 2026', total: '$8,500.00', status: 'Pending' },
  { id: 'PO-1122', vendor: 'LogisTech', date: 'April 19, 2026', delivery: 'April 28, 2026', total: '$3,400.00', status: 'Confirmed' },
];

export default function PurchaseOrders() {
  const [selectedPoId, setSelectedPoId] = useState<string | null>(null);

  if (selectedPoId) {
    return <PurchaseOrderEditor onBack={() => setSelectedPoId(null)} orderId={selectedPoId} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Purchase Orders</h2>
          <p className="text-text-secondary">Keep your inventory levels healthy with timely restocks.</p>
        </div>
        <button onClick={() => setSelectedPoId('PO-000005')} className="inflow-btn-primary">
          <Plus size={20} />
          <span>Create Purchase Order</span>
        </button>
      </div>

      {/* Suggested Reorder Section */}
      <div className="inflow-card p-6 bg-brand-light border-brand/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-text-primary">Suggested Reorders</h3>
            <p className="text-text-secondary text-sm">We've identified 12 items that are currently below their reorder points.</p>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: 'Mechanical Keyboard RGB', current: 24, reorder: 30 },
                { name: 'LaserJet Pro Printer', current: 8, reorder: 10 },
                { name: '1080p Business Webcam', current: 0, reorder: 15 }
              ].map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-lg border border-brand/10 shadow-sm flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold truncate max-w-[150px]">{item.name}</h4>
                    <p className="text-xs text-text-secondary">Current: {item.current} / Reorder: {item.reorder}</p>
                  </div>
                  <button className="text-brand p-2 hover:bg-brand-light rounded-md transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className="text-sm font-bold text-brand h-10 px-4 rounded-lg bg-white border border-brand/20 hover:bg-white/50 transition-colors">
            View All (12)
          </button>
        </div>
      </div>

      {/* Active POs Grid/List */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Current Shipments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {purchaseOrders.map((po) => (
            <div 
              key={po.id} 
              onClick={() => setSelectedPoId(po.id)}
              className="inflow-card p-5 space-y-4 relative overflow-hidden group cursor-pointer hover:border-brand transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{po.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  po.status === 'Received' ? 'bg-emerald-100 text-emerald-800' :
                  po.status === 'In Transit' ? 'bg-brand/10 text-brand' : 
                  po.status === 'Unfulfilled' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {po.status}
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-text-primary text-lg leading-tight">{po.vendor}</h4>
                <p className="text-sm text-text-secondary flex items-center gap-2">
                  <Calendar size={14} /> Expected: {po.delivery}
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-text-secondary uppercase font-bold">Total Cost</p>
                  <p className="font-bold text-text-primary">{po.total}</p>
                </div>
                <div className="w-10 h-10 bg-page-bg rounded-lg flex items-center justify-center text-text-secondary group-hover:text-brand group-hover:bg-brand-light transition-all">
                  <Truck size={18} />
                </div>
              </div>
              <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Package size={80} className="text-brand/5 rotate-12 -mr-10 -mt-10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full List Table */}
      <div className="space-y-4 pb-20">
        <h3 className="font-bold text-lg">Purchase History</h3>
        <div className="inflow-card overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-page-bg border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">PO #</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Expected Delivery</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {purchaseOrders.map((po, i) => (
                <tr 
                  key={`${po.id}-${i}`} 
                  onClick={() => setSelectedPoId(po.id)}
                  className="inflow-table-row cursor-pointer"
                >
                  <td className="px-6 py-4 font-bold text-text-primary">{po.id}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{po.vendor}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{po.date}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{po.delivery}</td>
                  <td className="px-6 py-4 text-right font-medium">{po.total}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      po.status === 'Received' ? 'bg-emerald-100 text-emerald-800' :
                      po.status === 'In Transit' ? 'bg-brand/10 text-brand' : 
                      po.status === 'Unfulfilled' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {po.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
