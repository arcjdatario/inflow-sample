import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Paperclip, 
  Copy, 
  Printer, 
  Mail, 
  MoreHorizontal, 
  Truck, 
  Calendar, 
  User, 
  Package, 
  Plus, 
  Info, 
  ChevronRight,
  ChevronDown,
  Barcode,
  Search,
  Settings2,
  X,
  MapPin,
  TrendingUp
} from 'lucide-react';

interface Discount {
  id: string;
  name: string;
  value: number;
}

interface PurchaseOrderEditorProps {
  onBack: () => void;
  orderId?: string;
}

export default function PurchaseOrderEditor({ onBack, orderId = 'PO-000005' }: PurchaseOrderEditorProps) {
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: '1', name: 'Discount 1', value: 5 },
    { id: '2', name: 'Discount 2', value: 10 }
  ]);

  const [products] = useState([
    { name: '12" Wok - Non-Stick', sku: '3110005', qty: '10 ea', price: '$30.00', subtotal: '$300.00' },
    { name: 'Stainless Steel Pan - 10"', sku: '3110003', qty: '5 ea', price: '$25.00', subtotal: '$125.00' },
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

  const subtotal = 425.00;
  const totalDiscountPercentage = discounts.reduce((acc, curr) => acc + curr.value, 0);
  const totalDiscountAmount = (subtotal * totalDiscountPercentage) / 100;
  const total = subtotal - totalDiscountAmount;

  return (
    <div className="flex bg-page-bg -m-8 h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar List - Minimalist like Sales Order */}
      <aside className="w-64 flex flex-col border-r border-border bg-white shrink-0">
        <div className="p-3 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-sm text-text-primary uppercase tracking-tight">Purchase Orders</h2>
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
               <Settings2 size={12} />
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {['PO-000005', 'PO-000007', 'PO-000010'].map((id) => (
            <div 
              key={id} 
              className={`px-3 py-2.5 border-b border-border cursor-pointer transition-all hover:bg-page-bg/50 ${orderId === id ? 'bg-brand/5 border-l-2 border-l-brand' : ''}`}
            >
              <div className="flex justify-between items-center mb-0.5">
                <span className={`font-black text-[12px] ${orderId === id ? 'text-brand' : 'text-text-primary'}`}>{id}</span>
                <span className="text-[11px] font-bold text-text-primary">$425.00</span>
              </div>
              <span className="text-[9px] font-black uppercase px-1 py-0.25 rounded bg-orange-100 text-orange-800">Unfulfilled</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Editor */}
      <main className="flex-1 overflow-y-auto bg-page-bg relative">
        <div className="p-6 max-w-[1200px] mx-auto space-y-4 animate-in fade-in duration-300">
          
          {/* Top Action Bar */}
          <div className="flex items-center justify-between bg-white border border-border px-4 py-2 rounded-lg shadow-sm">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded transition-all">
                <Trash2 size={12} />
                <span>Cancel order</span>
              </button>
              <div className="w-px h-3 bg-border mx-1"></div>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded">
                <Paperclip size={12} />
                <span>Attachments</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded">
                <Copy size={12} />
                <span>Copy</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded">
                <Printer size={12} />
                <span>Print</span>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-text-secondary hover:bg-page-bg rounded">
                <Mail size={12} />
                <span>Email</span>
              </button>
              <button className="p-1 text-text-secondary hover:bg-page-bg rounded">
                <MoreHorizontal size={16} />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
               <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-[9px] font-black uppercase rounded">Unfulfilled</span>
               <h2 className="text-lg font-black text-text-primary tracking-tight">{orderId}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              {/* Context Area */}
              <div className="inflow-card p-5 bg-white grid grid-cols-2 lg:grid-cols-4 gap-6 shadow-sm">
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">Receive at</label>
                  <p className="text-xs font-bold text-brand flex items-center gap-1 hover:underline cursor-pointer">
                    <MapPin size={12} /> Eastern Warehouse
                  </p>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">Ordered on</label>
                  <p className="text-xs font-bold text-text-primary flex items-center gap-1">
                    <Calendar size={12} className="text-text-secondary" /> Apr 23, 2026
                  </p>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">Assigned to</label>
                  <p className="text-xs font-bold text-brand italic hover:underline cursor-pointer">Set buyer</p>
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-black text-text-secondary tracking-wider">Vendor P.O. #</label>
                  <input type="text" placeholder="Enter P.O." className="w-full text-xs font-bold border-none p-0 focus:ring-0 placeholder:font-normal placeholder:italic placeholder:text-slate-300" />
                </div>
              </div>

              {/* Vendor Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="inflow-card p-5 bg-white flex flex-col shadow-sm">
                   <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-slate-50 border border-border rounded flex items-center justify-center text-brand">
                      <Truck size={20} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-black text-sm text-text-primary leading-none">ChemTrail Inc.</h4>
                      <p className="text-[11px] font-bold text-text-secondary">Wholesale Supplier</p>
                      <p className="text-[10px] text-text-secondary lowercase">support@chemtrail.com</p>
                    </div>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-border">
                    <label className="text-[9px] font-black text-text-secondary uppercase">Ship from</label>
                    <p className="text-[11px] font-medium text-text-primary leading-tight">
                      456 Factory Way<br />Industrial Park, CA<br />90210<br />United States
                    </p>
                  </div>
                </div>

                <div className="inflow-card p-5 bg-white flex flex-col shadow-sm">
                  <label className="text-[9px] font-black text-text-secondary uppercase mb-2">Internal Note</label>
                  <textarea 
                    placeholder="Add a private note for the team..."
                    className="flex-1 bg-page-bg p-3 rounded-lg border border-border text-xs resize-none outline-none focus:ring-1 focus:ring-brand placeholder:italic"
                  />
                </div>
              </div>

              {/* Order Lines */}
              <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
                <div className="flex items-center gap-6 border-b border-border bg-slate-50/50 px-4">
                  <button className="text-[11px] font-black text-brand border-b-2 border-brand py-3 -mb-[1px]">
                    Items <span className="px-1.5 py-0.5 bg-brand text-white rounded-full text-[9px]">{products.length} products</span>
                  </button>
                  <button className="text-[11px] font-bold text-text-secondary py-3">Receive</button>
                </div>

                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white text-[9px] font-black text-text-secondary uppercase border-b border-border font-sans">
                      <th className="px-5 py-3 w-3/5">Product</th>
                      <th className="px-5 py-3 text-right">Quantity</th>
                      <th className="px-5 py-3 text-right">Unit cost</th>
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
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white rounded text-[11px] font-black hover:bg-brand-hover shadow-sm transition-all shadow-brand/20">
                      <Plus size={14} /> Add products
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-text-secondary rounded text-[11px] font-black hover:bg-page-bg transition-all">
                      <Barcode size={14} /> Scan to add
                    </button>
                </div>
              </div>
            </div>

            {/* Financial Sidebar - Multi-level Discounts */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
                <div className="p-5 space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-border border-dashed">
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded leading-none italic">Order Total</span>
                    <div className="text-right">
                      <p className="text-xs font-bold text-text-secondary leading-none mb-1.5 underline decoration-emerald-200 decoration-2 underline-offset-4">GRAND TOTAL</p>
                      <p className="text-3xl font-black text-text-primary leading-none tracking-tighter">${total.toFixed(2)}</p>
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
                    
                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
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

                  <div className="space-y-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-black text-text-secondary uppercase">Vendor</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-text-primary">ChemTrail Inc.</p>
                        <p className="text-[11px] font-bold text-text-secondary">Vendor ID: V-1029</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded border border-border/40">
                      <span className="text-xs font-black text-text-secondary uppercase">Net terms</span>
                      <span className="text-sm font-black text-text-primary flex items-center gap-1">Net 30 <ChevronDown size={14} /></span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 border-t border-border space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-text-secondary">Subtotal</span>
                    <span className="font-bold text-text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discounts.map(d => (
                    <div key={d.id} className="flex justify-between text-sm">
                      <span className="font-medium text-red-500 uppercase tracking-tighter text-[11px]">{d.name} ({d.value}%)</span>
                      <span className="font-bold text-red-500">-${((subtotal * d.value) / 100).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-border flex justify-between items-baseline">
                    <span className="text-sm font-black text-text-primary uppercase tracking-wider">Total</span>
                    <span className="text-2xl font-black text-text-primary">${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-brand/5 px-3 py-2 rounded border border-brand/10 mt-2">
                    <span className="text-[11px] font-black text-brand uppercase tracking-widest">Balance Due</span>
                    <span className="text-lg font-black text-brand">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-white p-4 border-t border-border flex items-center justify-between">
                  <button className="text-[10px] font-black text-brand uppercase hover:underline">Add tags</button>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-brand rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-between p-3 bg-white border border-border rounded-lg group hover:border-brand transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-brand/5 border border-brand/10 rounded-full flex items-center justify-center text-brand">
                    <Info size={14} />
                  </div>
                  <span className="text-xs font-black text-text-primary">Order summary</span>
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
