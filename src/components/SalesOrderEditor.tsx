import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Paperclip, 
  Copy, 
  Printer, 
  Mail, 
  MoreHorizontal, 
  MapPin,
  Calendar,
  User,
  Package,
  Plus,
  Info,
  ChevronDown,
  Search,
  Filter,
  ChevronRight,
  ExternalLink,
  Barcode,
  X,
  TrendingUp
} from 'lucide-react';

interface Discount {
  id: string;
  name: string;
  value: number;
}

interface SalesOrderEditorProps {
  customer: any;
  onBack: () => void;
}

const sampleOrders = [
  { id: 'SO-000019', status: 'Unfulfilled', amount: '$497.47' },
  { id: 'SO-000020', status: 'Unfulfilled', amount: '$135.99' },
  { id: 'SO-000013', status: 'Started', amount: '$519.99' },
  { id: 'SO-000015', status: 'Unfulfilled', amount: '$143.25' },
  { id: 'SO-000016', status: 'Started', amount: '$148.50' },
  { id: 'SO-000021', status: 'Unfulfilled', amount: '$665.99' },
  { id: 'SO-000022', status: 'Unfulfilled', amount: '$124.25' },
  { id: 'SO-000023', status: 'Unfulfilled', amount: '$400.00' },
  { id: 'SO-000024', status: 'Unfulfilled', amount: '$162.22' },
  { id: 'SO-000026', status: 'Unfulfilled', amount: '$0.00' },
  { id: 'SO-000027', status: 'Unfulfilled', amount: '$0.00' },
];

export default function SalesOrderEditor({ customer, onBack }: SalesOrderEditorProps) {
  const [selectedOrderId, setSelectedOrderId] = useState('SO-000019');

  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: '1', name: 'Discount 1', value: 5 },
    { id: '2', name: 'Discount 2', value: 10 }
  ]);

  const addDiscount = () => {
    const newId = (discounts.length + 1).toString();
    setDiscounts([...discounts, { id: newId, name: `Discount ${newId}`, value: 0 }]);
  };

  const updateDiscount = (id: string, field: keyof Discount, value: any) => {
    setDiscounts(discounts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const removeDiscount = (id: string) => {
    setDiscounts(discounts.filter(d => d.id !== id));
  };

  const products = [
    { name: "SPF #2 Board - 1''x 4''x 8'", sku: '3001644', qty: '6 length', price: '$12.00', subtotal: '$72.00' },
    { name: "SPF #2 Board - 2''x4''x8'", sku: '3001646', qty: '1 length', price: '$40.00', subtotal: '$40.00' },
    { name: '12000 BTU Window Air Conditioner', sku: '3200030', qty: '1', price: '$299.00', subtotal: '$299.00' },
  ];

  const subtotalBeforeDiscounts = 411.00;
  const freight = 49.99;
  const totalDiscountPercentage = discounts.reduce((acc, curr) => acc + curr.value, 0);
  const totalDiscountAmount = (subtotalBeforeDiscounts * totalDiscountPercentage) / 100;
  const taxableAmount = subtotalBeforeDiscounts - totalDiscountAmount + freight;
  const taxRate = 0.08875;
  const taxAmount = taxableAmount * taxRate;
  const grandTotal = taxableAmount + taxAmount;

  return (
    <div className="flex bg-page-bg -m-8 h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar List - More Minimalist */}
      <aside className="w-64 flex flex-col border-r border-border bg-white shrink-0">
        <div className="p-3 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-sm text-text-primary uppercase tracking-tight">Sales orders</h2>
            <button onClick={onBack} className="p-1 hover:bg-page-bg rounded text-text-secondary">
              <ArrowLeft size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
             <div className="relative flex-1">
               <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-text-secondary" size={12} />
               <input type="text" placeholder="Search..." className="w-full pl-7 pr-2 py-1 bg-page-bg border border-border rounded text-[11px] focus:ring-1 focus:ring-brand outline-none" />
             </div>
             <button className="p-1 border border-border rounded hover:bg-page-bg text-text-secondary">
               <Filter size={12} />
             </button>
          </div>
          
          <div className="flex items-center gap-3 text-[10px] font-bold text-text-secondary border-b border-border pb-1 px-1">
             <span className="text-brand border-b-2 border-brand pb-1">Open (11)</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sampleOrders.map((order) => (
            <div 
              key={order.id} 
              onClick={() => setSelectedOrderId(order.id)}
              className={`px-3 py-2.5 border-b border-border cursor-pointer transition-all hover:bg-page-bg/50 ${selectedOrderId === order.id ? 'bg-brand/5 border-l-2 border-l-brand' : ''}`}
            >
              <div className="flex justify-between items-center mb-0.5">
                <span className={`font-black text-[12px] ${selectedOrderId === order.id ? 'text-brand' : 'text-text-primary'}`}>{order.id}</span>
                <span className="text-[11px] font-bold text-text-primary">{order.amount}</span>
              </div>
              <span className={`text-[9px] font-black uppercase px-1 py-0.25 rounded ${
                order.status === 'Unfulfilled' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Editor - More Focused */}
      <main className="flex-1 overflow-y-auto bg-page-bg relative">
        <div className="p-6 max-w-[1200px] mx-auto space-y-4 animate-in fade-in duration-300">
          
          {/* Top Action Bar - Compact */}
          <div className="flex items-center justify-between bg-white border border-border px-4 py-2 rounded-lg shadow-sm">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded transition-all group">
                <Trash2 size={12} />
                <span>Cancel order</span>
              </button>
              <div className="w-px h-3 bg-border mx-1"></div>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded transition-all">
                <Paperclip size={12} />
                <span>Attachments</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded transition-all">
                <Copy size={12} />
                <span>Copy</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded transition-all">
                <Printer size={12} />
                <span>Print</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded transition-all">
                <Mail size={12} />
                <span>Email</span>
              </button>
              <button className="p-1 text-text-secondary hover:bg-page-bg rounded transition-all">
                <MoreHorizontal size={16} />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
               <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[9px] font-black uppercase rounded">Unfulfilled</span>
               <h2 className="text-lg font-black text-text-primary tracking-tight">{selectedOrderId}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              
              {/* Context Area */}
              <div className="inflow-card p-5 bg-white grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">Fulfill from</label>
                  <p className="text-xs font-bold text-brand flex items-center gap-1 hover:underline cursor-pointer">
                    <MapPin size={12} /> Eastern Warehouse
                  </p>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">Ordered on</label>
                  <p className="text-xs font-bold text-text-primary flex items-center gap-1">
                    <Calendar size={12} className="text-text-secondary" /> Apr 1, 2026
                  </p>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">Assigned to</label>
                  <p className="text-xs font-bold text-brand italic hover:underline cursor-pointer">Set sales rep</p>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">P.O. #</label>
                  <input type="text" placeholder="Enter P.O." className="w-full text-xs font-bold border-none p-0 focus:ring-0 placeholder:font-normal placeholder:italic placeholder:text-slate-300" />
                </div>
              </div>

              {/* Customer Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="inflow-card p-5 bg-white flex flex-col shadow-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-slate-50 border border-border rounded flex items-center justify-center text-brand">
                      <User size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-black text-sm text-text-primary leading-none">Beth May</h4>
                      <p className="text-[11px] font-bold text-text-secondary">Beth May</p>
                      <p className="text-[10px] text-text-secondary lowercase">111-222-3334</p>
                      <p className="text-[10px] text-brand font-bold hover:underline cursor-pointer">Not-A-Person@email-address.com</p>
                    </div>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border">
                    <label className="text-[9px] font-black text-text-secondary uppercase">Billing address</label>
                    <p className="text-[11px] font-medium text-text-primary leading-tight">
                      2371 Address Blvd<br />Kulpsville, PA<br />12346<br />United States
                    </p>
                  </div>
                </div>

                <div className="inflow-card p-5 bg-white flex flex-col shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-[9px] font-black text-text-secondary uppercase">Shipping address</label>
                    <span className="text-[8px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Same as billing address</span>
                  </div>
                  <p className="text-[11px] font-medium text-text-primary leading-tight">
                    2371 Address Blvd<br />Kulpsville, PA<br />12346<br />United States
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <button className="text-[10px] font-black text-brand uppercase hover:underline">Edit shipping info</button>
                    <div className="flex gap-2">
                      <button className="text-[10px] font-black text-brand uppercase hover:underline">Set ship by date</button>
                      <button className="bg-brand text-white px-3 py-1 rounded text-[10px] font-black hover:bg-brand-hover shadow shadow-brand/20">Ship order</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Lines Area */}
              <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center gap-6 border-b border-border bg-slate-50/50 px-4">
                  <button className="text-[11px] font-black text-brand border-b-2 border-brand py-3 -mb-[1px] flex items-center gap-1.5">
                    Order <span className="px-1.5 py-0.5 bg-brand text-white rounded-full text-[9px]">3 products</span>
                  </button>
                  <button className="text-[11px] font-bold text-text-secondary hover:text-text-primary py-3">Pick</button>
                  <button className="text-[11px] font-bold text-emerald-600 hover:underline py-3 ml-auto">Mark paid</button>
                  <button className="bg-slate-200 text-slate-500 cursor-not-allowed px-3 py-1 rounded text-[10px] font-black uppercase">Fulfill</button>
                </div>

                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white text-[9px] font-black text-text-secondary uppercase border-b border-border">
                      <th className="px-5 py-3 w-3/5">Product</th>
                      <th className="px-5 py-3 text-right">Quantity</th>
                      <th className="px-5 py-3 text-right">Unit price</th>
                      <th className="px-5 py-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((p, i) => (
                      <tr key={i} className="hover:bg-page-bg/50 transition-colors">
                        <td className="px-5 py-3">
                          <p className="text-[12px] font-bold text-text-primary leading-none">{p.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">{p.sku}</p>
                        </td>
                        <td className="px-5 py-3 text-right text-[12px] font-bold text-text-primary">{p.qty}</td>
                        <td className="px-5 py-3 text-right text-[11px] font-medium text-text-secondary">{p.price}</td>
                        <td className="px-5 py-3 text-right text-[12px] font-black text-text-primary">{p.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="p-4 border-t border-border flex items-center gap-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white rounded text-[11px] font-black hover:bg-brand-hover shadow-sm">
                      <Plus size={14} /> Add products
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-text-secondary rounded text-[11px] font-black hover:bg-page-bg">
                      <Barcode size={14} /> Scan to add
                    </button>
                    <div className="ml-auto flex gap-4">
                      <button className="text-[10px] font-bold text-brand hover:underline">+ Add remarks</button>
                      <button className="text-[10px] font-bold text-red-500 hover:underline">Return products</button>
                    </div>
                </div>
              </div>
            </div>

            {/* Financial Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
                <div className="p-5 space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-border border-dashed">
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded leading-none">Uninvoiced</span>
                    <div className="text-right">
                      <p className="text-xs font-bold text-text-secondary leading-none mb-1.5">Subtotal</p>
                      <p className="text-3xl font-black text-text-primary leading-none">${grandTotal.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Multi-level Discounts Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[11px] font-black text-text-primary uppercase tracking-widest flex items-center gap-2">
                         <TrendingUp size={14} className="text-brand" />
                         Discounts
                       </h4>
                       <button 
                         onClick={addDiscount}
                         className="p-1 hover:bg-brand/10 text-brand rounded-full transition-all"
                         title="Add discount level"
                       >
                         <Plus size={16} />
                       </button>
                    </div>
                    
                    <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                      {discounts.map((discount) => (
                        <div key={discount.id} className="flex items-center gap-2 group bg-slate-50 p-2 rounded-lg border border-border/50 hover:border-brand/30 transition-all">
                          <input 
                            type="text" 
                            value={discount.name} 
                            onChange={(e) => updateDiscount(discount.id, 'name', e.target.value)}
                            className="flex-1 bg-transparent border-none p-0 text-[11px] font-bold text-text-primary focus:ring-0"
                            placeholder="Discount label"
                          />
                          <div className="flex items-center gap-1">
                            <input 
                              type="number" 
                              value={discount.value} 
                              onChange={(e) => updateDiscount(discount.id, 'value', parseFloat(e.target.value) || 0)}
                              className="w-12 bg-white border border-border rounded px-1 py-0.5 text-right text-[11px] font-black text-brand focus:ring-1 focus:ring-brand"
                            />
                            <span className="text-[11px] font-black text-slate-400">%</span>
                          </div>
                          <button 
                            onClick={() => removeDiscount(discount.id)}
                            className="p-1 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition-all"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      {discounts.length === 0 && (
                        <p className="text-[10px] text-text-secondary italic text-center py-2">No discounts applied</p>
                      )}
                    </div>
                  </div>

                  <button className="w-full py-2 border border-brand/20 bg-brand/5 text-brand text-xs font-black rounded hover:bg-brand/10 transition-colors uppercase">
                    Payment history
                  </button>

                  <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-black text-text-secondary uppercase">Tax Agency</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-text-primary">New York - New York</p>
                        <p className="text-[11px] font-bold text-text-secondary">8.875% 0%</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-text-secondary uppercase">Project</span>
                      <span className="text-sm font-bold text-brand italic">Employee/Project</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <span className="text-xs font-black text-text-secondary uppercase">Invoice date</span>
                      <span className="text-sm font-bold text-brand italic">Set invoice date</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-text-secondary uppercase">Net terms</span>
                      <span className="text-sm font-black text-text-primary flex items-center gap-1">Due on receipt <ChevronDown size={14} /></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-text-secondary uppercase">Due date</span>
                      <span className="text-sm font-bold text-brand italic">Set due date</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 border-t border-border space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-text-secondary">Subtotal</span>
                    <span className="font-bold text-text-primary">$411.00</span>
                  </div>

                  {discounts.map(d => (
                    <div key={d.id} className="flex justify-between text-sm">
                      <span className="font-medium text-red-500 uppercase tracking-tighter text-[11px]">{d.name} ({d.value}%)</span>
                      <span className="font-bold text-red-500">-${((subtotalBeforeDiscounts * d.value) / 100).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-text-secondary uppercase tracking-tighter">Freight</span>
                    <span className="font-bold text-text-primary">$49.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-text-secondary uppercase text-[11px]">Tax 1 (8.875%)</span>
                    <span className="font-bold text-text-primary">${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between items-baseline">
                    <span className="text-sm font-black text-text-primary uppercase tracking-wider">Total</span>
                    <span className="text-2xl font-black text-text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600 pt-1">
                    <span className="font-bold uppercase tracking-widest leading-none">Paid</span>
                    <span className="font-bold leading-none">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center bg-emerald-50 px-3 py-2 rounded border border-emerald-100 mt-2">
                    <span className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">Balance</span>
                    <span className="text-lg font-black text-emerald-700">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-white p-4 border-t border-border flex items-center justify-between">
                  <button className="text-[10px] font-black text-brand uppercase hover:underline">Add custom fields</button>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-3 bg-white border border-border rounded-lg group hover:border-brand transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-brand/5 border border-brand/10 rounded-full flex items-center justify-center text-brand">
                    <Info size={14} />
                  </div>
                  <span className="text-xs font-black text-text-primary">Cost details</span>
                </div>
                <ChevronRight size={16} className="text-text-secondary group-hover:text-brand transition-all" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
