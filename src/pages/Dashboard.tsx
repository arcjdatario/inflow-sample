import React from 'react';
import { 
  ChevronDown, 
  Package, 
  ShoppingBag, 
  ArrowRight, 
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const reorderProducts = [
    { name: '12" Wok - Non-Stick', sku: '3110005', qty: 12 },
    { name: '1\'\'x1\'\'x3/4\'\' Tee - Copper', sku: '3001679', qty: 12 },
    { name: '3/4\'\' Gates Valve - Brass', sku: '3001738', qty: 12 },
    { name: '3/4\'\' TYPE L Hard Copper Tube - 12\' Lengths', sku: '3001717', qty: 12 },
    { name: 'GFCI Receptacle/Outlet - 15 AMP', sku: '3016412', qty: 12 },
    { name: 'Hospital Spray Disinfectant - 1 Gal Jug', sku: '3001632', qty: 12 },
    { name: 'Nitrile Gloves - 25 Pk - LRG', sku: '3001688', qty: 12 },
    { name: 'Nitrile Gloves - 25 Pk - MD', sku: '3001685', qty: 12 },
    { name: 'Nitrile Gloves - 25 Pk - SM', sku: '3001681', qty: 12 },
    { name: 'Nitrile Gloves - 25 Pk - XS', sku: '3001680', qty: 12 },
    { name: 'Stainless Steel Pan - 10" - Regular', sku: '3110003', qty: 12 },
    { name: 'Stainless Steel Pan - 12" - Regular', sku: '320634', qty: 12 },
  ];

  const purchaseOrders = [
    { id: 'PO-000005', status: 'Started', vendor: 'ChemTrail Inc.' },
    { id: 'PO-000007', status: 'Unfulfilled', vendor: 'ChemTrail Inc.' },
    { id: 'PO-000022', status: 'Unfulfilled', vendor: 'Bild-R Supply' },
    { id: 'PO-000016', status: 'Unfulfilled', vendor: 'Bild-R Supply' },
    { id: 'PO-000014', status: 'Started', vendor: 'Bild-R Supply' },
  ];

  const topProducts = [
    { name: 'SPF #2 Board - 1\'\'x 4\'\'x 8\'', sku: '3001644', cat: 'Wholesale', sales: 16, unit: 'length' },
    { name: 'SPF #2 Board - 4\'\'x4\'\'x10\'', sku: '3001650', cat: 'Wholesale', sales: 6, unit: 'length' },
    { name: 'Stainless Steel Pan - 10" - Regular', sku: '3110003', cat: 'Wholesale', sales: 5, unit: 'ea' },
  ];

  const topCustomers = [
    { name: 'Anom Inc.', contact: 'Simona Morasca', revenue: '$970.00' },
    { name: 'Production Planet', contact: 'Graciela Ruta', revenue: '$552.00' },
    { name: 'Bollinger Machine & Shipyard', contact: 'Blair Malet', revenue: '$280.00' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text-primary">Good morning, Bhakti</h1>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm font-medium hover:bg-white transition-colors">
            <MapPin size={16} className="text-brand" />
            <span>Eastern Warehouse</span>
            <ChevronDown size={14} className="text-text-secondary" />
          </button>
        </div>
        <p className="text-text-secondary text-sm">You can customize message templates in our Email Designer.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Sales Revenue & Products to Reorder */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Revenue Card */}
          <div className="inflow-card p-8 flex items-center justify-between overflow-hidden relative">
            <div className="space-y-1 z-10">
              <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Total sales revenue</p>
              <h2 className="text-5xl font-black text-text-primary">$4,490.00</h2>
              <p className="text-sm text-text-secondary flex items-center gap-1">
                in the <span className="font-bold text-text-primary">last 30 days</span>
              </p>
            </div>
            
            {/* Simple sparkline visualization */}
            <div className="flex items-end gap-1 h-32 ml-auto z-10">
               {[20, 35, 25, 45, 60, 40, 55, 75, 45, 65, 85, 40].map((h, i) => (
                 <div key={i} className="w-4 bg-brand/10 hover:bg-brand/30 transition-all rounded-t-sm relative group">
                    <div className="absolute bottom-0 w-full bg-brand rounded-t-sm" style={{ height: `${h}%` }}></div>
                 </div>
               ))}
            </div>
            {/* Background scale labels */}
            <div className="absolute right-4 bottom-4 flex flex-col justify-between py-8 text-[10px] font-bold text-text-secondary/30 h-full">
               <span>800</span>
               <span>600</span>
               <span>400</span>
               <span>200</span>
               <span>0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Reorder Summary */}
            <div className="inflow-card p-0 flex flex-col h-full bg-white">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text-primary">Products to reorder</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Items below reorder point</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-brand">12</span>
                  <span className="text-sm font-bold text-text-secondary">total</span>
                </div>
              </div>
              
              <div className="p-4 flex gap-4 bg-page-bg/30">
                <div className="flex-1 text-center p-3 rounded-lg border border-border bg-white">
                  <p className="text-xl font-bold text-brand">12</p>
                  <p className="text-[10px] font-bold uppercase text-text-secondary">to purchase</p>
                </div>
                <div className="flex-1 text-center p-3 rounded-lg border border-border bg-white italic opacity-50">
                  <p className="text-xl font-bold text-text-primary">4</p>
                  <p className="text-[10px] font-bold uppercase text-text-secondary">to transfer</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[440px] px-2 py-4 space-y-1">
                {reorderProducts.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-page-bg transition-colors group">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-text-primary group-hover:text-brand transition-colors">{p.name}</p>
                      <p className="text-xs text-text-secondary font-mono flex items-center gap-2">
                        {p.sku} 
                        <span className="w-1 h-1 bg-border rounded-full"></span>
                        <span className="italic">Stock: 12</span>
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <button className="w-full h-11 bg-brand hover:bg-brand-hover text-white rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-brand/20">
                  <Package size={18} />
                  <span>Reorder</span>
                </button>
              </div>
            </div>

            {/* Purchase Orders */}
            <div className="inflow-card p-0 flex flex-col h-full bg-white">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text-primary">Open purchase orders</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Tracking current shipments</p>
                </div>
                <span className="text-4xl font-black text-slate-700">5</span>
              </div>

              <div className="flex-1 divide-y divide-border">
                {purchaseOrders.map((po, i) => (
                  <div key={i} className="p-4 hover:bg-page-bg transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-black text-brand">{po.id}</span>
                      <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                        po.status === 'Started' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {po.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-text-primary">{po.vendor}</span>
                      <span className="text-[10px] text-text-secondary italic">Expected in 3 days</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-page-bg/30">
                <button className="w-full text-sm font-bold text-brand hover:underline flex items-center justify-center gap-1.5">
                  View all open purchase orders
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Top Products & Customers */}
        <div className="space-y-8">
          
          {/* Top Products */}
          <div className="inflow-card bg-white p-6 h-fit">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-text-primary">Top 3 products</h3>
              <p className="text-sm text-text-secondary flex items-center gap-1">
                by <span className="font-bold text-text-primary">quantity sold</span>
              </p>
              <p className="text-[11px] text-text-secondary italic flex items-center gap-1">
                in the <span className="font-bold">last 90 days</span>
              </p>
            </div>

            <div className="space-y-6">
              {topProducts.map((p, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-12 h-12 bg-page-bg rounded-xl flex items-center justify-center text-2xl border border-border group-hover:border-brand transition-colors">
                    📦
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-text-primary leading-tight">{p.name}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-mono text-text-secondary">{p.sku}</span>
                       <span className="w-1 h-1 bg-border rounded-full"></span>
                       <span className="text-[10px] font-bold text-brand uppercase">{p.cat}</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-lg font-black text-text-primary">{p.sales}</span>
                      <span className="text-[11px] font-bold text-text-secondary italic">{p.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 text-xs font-bold text-brand hover:underline flex items-center justify-center gap-1">
              View full products report <ExternalLink size={12} />
            </button>
          </div>

          {/* Top Customers */}
          <div className="inflow-card bg-white p-6 h-fit">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-text-primary">Top 3 customers</h3>
              <p className="text-sm text-text-secondary flex items-center gap-1">
                by <span className="font-bold text-text-primary">revenue</span>
              </p>
              <p className="text-[11px] text-text-secondary italic flex items-center gap-1">
                in the <span className="font-bold">last 90 days</span>
              </p>
            </div>

            <div className="space-y-6">
              {topCustomers.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-border hover:bg-page-bg transition-all cursor-pointer">
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-text-primary">{c.name}</p>
                    <p className="text-xs text-text-secondary font-medium">{c.contact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-emerald-600 leading-none">{c.revenue}</p>
                    <span className="text-[10px] font-bold text-text-secondary uppercase">Paid</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 text-xs font-bold text-brand hover:underline flex items-center justify-center gap-1">
              View customer analytics <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
