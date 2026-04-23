import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit2, 
  MoreHorizontal, 
  Package, 
  Tag, 
  Barcode, 
  Info, 
  MapPin, 
  ChevronDown, 
  Plus, 
  Search,
  Globe,
  Palette,
  Hammer,
  Clock,
  ShieldCheck,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface ProductDetailViewProps {
  onBack: () => void;
}

export default function ProductDetailView({ onBack }: ProductDetailViewProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  const pricingSchemes = [
    { name: 'Normal Price', markup: '300%', price: '$120.00' },
    { name: 'CAD Price', markup: '107.37%', price: 'CAD 85.00' },
    { name: 'Cost/Employee', markup: '0.00%', price: '$30.00' },
    { name: 'Employee/Project', markup: '0%', price: '$0.00' },
    { name: 'Euro Price', markup: '247.38%', price: '89.00 EUR' },
    { name: 'Government', markup: '266.67%', price: '$110.00' },
    { name: 'Level 1', markup: '0%', price: '$0.00' },
    { name: 'Level 2', markup: '0%', price: '$0.00' },
    { name: 'Level 3', markup: '0%', price: '$0.00' },
    { name: 'Tier 1', markup: '200.00%', price: '$90.00' },
    { name: 'Tier 2', markup: '175.00%', price: '$82.50' },
    { name: 'Tier 3', markup: '150.00%', price: '$75.00' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto animate-in slide-in-from-right duration-300 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-lg transition-colors text-text-secondary">
            <ArrowLeft size={20} />
          </button>
          <div>
             <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-black uppercase text-text-secondary bg-slate-100 px-2 py-0.5 rounded">Product view</span>
               <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
             </div>
             <h2 className="text-3xl font-black text-text-primary leading-tight">12" Wok - Non-Stick</h2>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-white rounded-lg text-text-secondary hover:text-text-primary transition-all font-bold text-sm">
            <Edit2 size={16} />
            <span>Edit</span>
          </button>
          <button className="p-2 text-text-secondary hover:bg-white rounded-lg border border-border">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Identity & Specs */}
          <div className="inflow-card p-0 overflow-hidden bg-white">
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-page-bg rounded-2xl flex items-center justify-center text-brand border border-border shadow-inner">
                    <Package size={32} />
                  </div>
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] uppercase font-black text-text-secondary tracking-widest leading-none">Item code</label>
                    <p className="text-xl font-black text-text-primary leading-none">3110005</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-text-secondary tracking-widest leading-none">Category</label>
                    <div className="flex items-center gap-2 text-sm font-bold text-brand hover:underline cursor-pointer">
                      <Tag size={14} /> Pans
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-text-secondary tracking-widest leading-none">Barcode</label>
                    <div className="flex items-center gap-2 text-sm font-bold text-text-primary">
                      <Barcode size={14} className="text-text-secondary" /> 0487080000937
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] uppercase font-black text-text-secondary tracking-widest leading-none">Description</label>
                   <p className="text-sm text-text-secondary leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                     "Designed for rapid movement and high heat, the Wok is oven safe to 1200 F. Non-stick"
                   </p>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-white">
                       <label className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Dimensions</label>
                       <div className="flex gap-4">
                         <span className="text-xs font-bold text-text-primary">15cm</span>
                         <span className="text-xs font-bold text-text-primary">15cm</span>
                         <span className="text-xs font-bold text-text-primary">15cm</span>
                       </div>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b border-white text-brand">
                       <label className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Weight</label>
                       <span className="text-xs font-black">20g</span>
                    </div>
                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] uppercase font-black text-text-secondary tracking-widest">Unit of Measure</label>
                      <div className="flex flex-col gap-2">
                        <div className="bg-white px-3 py-2 rounded-lg border border-border flex justify-between items-center">
                          <span className="text-xs font-bold text-text-primary">1 ea</span>
                          <span className="text-[10px] font-black text-text-secondary uppercase">Default</span>
                        </div>
                        <div className="bg-white px-3 py-2 rounded-lg border border-border flex justify-between items-center text-brand">
                          <span className="text-xs font-bold">1 case = 5 ea</span>
                          <Plus size={12} className="cursor-pointer" />
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Configuration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="inflow-card p-6 bg-white space-y-6">
                <h4 className="text-[10px] uppercase font-black text-text-secondary tracking-[0.2em] border-b border-page-bg pb-4">Manufacturing Info</h4>
                <div className="grid grid-cols-2 gap-y-6">
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">Brand</label>
                      <p className="text-sm font-bold text-text-primary">Chef Boy</p>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">Country of Origin</label>
                      <p className="text-sm font-bold text-text-primary flex items-center gap-1.5"><Globe size={14} className="text-blue-500" /> USA</p>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">Color</label>
                      <p className="text-sm font-bold text-text-primary flex items-center gap-1.5"><Palette size={14} className="text-slate-800" /> Black</p>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">Material</label>
                      <p className="text-sm font-bold text-text-primary flex items-center gap-1.5"><Hammer size={14} /> Stainless Steel</p>
                   </div>
                </div>
             </div>

             <div className="inflow-card p-6 bg-white space-y-6">
                <h4 className="text-[10px] uppercase font-black text-text-secondary tracking-[0.2em] border-b border-page-bg pb-4">Specifications</h4>
                <div className="grid grid-cols-2 gap-y-6">
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">WHMIS #</label>
                      <p className="text-xs font-medium text-slate-300 italic">Enter data</p>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">Amps</label>
                      <p className="text-xs font-medium text-slate-300 italic">Enter data</p>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">Scent</label>
                      <p className="text-xs font-medium text-slate-300 italic">Enter data</p>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] uppercase font-black text-slate-400">Warranty</label>
                      <p className="text-xs font-bold text-text-primary flex items-center gap-1.5 opacity-40"><Clock size={14} /> MMM DD, YYYY</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Stock & Movement Tabs */}
          <div className="space-y-4">
             <div className="flex gap-8 border-b border-border px-2">
                {['Overview', 'Product vendors', 'Order history', 'Movement history'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-black uppercase tracking-widest pb-4 -mb-[1px] transition-all ${
                      activeTab === tab ? 'text-brand border-b-2 border-brand' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
             </div>

             <div className="inflow-card p-0 bg-white overflow-hidden shadow-xl border-brand/10 border">
                <div className="p-8 border-b border-page-bg bg-brand/5 flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center shadow-lg border border-brand/20">
                         <span className="text-2xl font-black text-text-primary leading-none">36</span>
                         <span className="text-[10px] font-black text-brand uppercase mt-1">ea</span>
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-text-primary">Quantity on hand</h3>
                         <p className="text-xs font-bold text-text-secondary uppercase">for all locations</p>
                      </div>
                   </div>
                   <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-border rounded-xl text-xs font-bold text-text-primary hover:bg-page-bg transition-all">
                      View breakdown
                   </button>
                </div>

                <div className="p-0">
                   <div className="p-4 bg-white border-b border-border flex items-center justify-between">
                      <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={14} />
                        <input type="text" placeholder="Search locations..." className="w-full h-9 pl-9 pr-4 bg-page-bg rounded-lg text-xs outline-none" />
                      </div>
                      <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Sort by: Qty Desc</span>
                   </div>
                   
                   <div className="divide-y divide-page-bg">
                      {[
                        { location: 'Eastern Warehouse', qty: 25 },
                        { location: 'Western Warehouse', qty: 11 }
                      ].map((item, i) => (
                        <div key={i} className="px-8 py-4 flex items-center justify-between hover:bg-page-bg transition-colors">
                           <div className="flex items-center gap-4">
                              <MapPin size={16} className="text-brand" />
                              <span className="font-bold text-text-primary text-sm">{item.location}</span>
                           </div>
                           <span className="font-black text-text-primary px-3 py-1 bg-slate-100 rounded-lg">{item.qty} <span className="text-[10px] text-text-secondary font-black uppercase ml-1">ea</span></span>
                        </div>
                      ))}
                   </div>
                   <div className="p-4 text-center">
                     <button className="text-[10px] font-black text-brand uppercase hover:underline">Show more locations</button>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Pricing & Cost */}
        <div className="lg:col-span-4 space-y-6">
           <div className="inflow-card p-0 bg-white overflow-hidden shadow-2xl border-2 border-brand/10">
              <div className="p-6 bg-brand/5 border-b border-brand/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand shadow-sm border border-brand/20">
                     <TrendingUp size={20} />
                   </div>
                   <h3 className="font-black text-text-primary">Pricing & Cost</h3>
                 </div>
                 <span className="text-[10px] font-black text-brand bg-white px-2 py-1 rounded shadow-sm uppercase">Advanced</span>
              </div>
              
              <div className="p-6">
                 <div className="space-y-6">
                    <div className="grid grid-cols-4 items-center mb-2 px-1">
                       <span className="col-span-2 text-[9px] font-black text-slate-400 uppercase">Pricing Scheme</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase text-center">Markup</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase text-right">Sales Price</span>
                    </div>

                    <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                       {pricingSchemes.map((scheme, i) => (
                         <div key={i} className="grid grid-cols-4 items-center group py-2 hover:bg-page-bg rounded-lg px-2 transition-all">
                            <span className="col-span-2 text-[11px] font-black text-text-primary">{scheme.name}</span>
                            <div className="flex items-center justify-center">
                               <div className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-black text-slate-500">
                                 {scheme.markup}
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="text-sm font-black text-brand">{scheme.price}</div>
                            </div>
                         </div>
                       ))}
                    </div>

                    <button className="w-full py-3 bg-brand/5 border border-dashed border-brand/30 text-brand font-black rounded-xl text-[10px] hover:bg-brand/10 transition-all uppercase tracking-[0.2em]">
                       + Add pricing scheme
                    </button>

                    <div className="pt-6 border-t border-page-bg space-y-6">
                       <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-200">
                               <DollarSign size={20} />
                             </div>
                             <div className="space-y-0.5">
                                <label className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Cost</label>
                                <p className="text-xl font-black text-text-primary leading-none">$30.00</p>
                             </div>
                          </div>
                          <button className="p-2 text-emerald-600 hover:bg-white rounded-lg transition-all">
                             <Edit2 size={16} />
                          </button>
                       </div>

                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-text-secondary uppercase tracking-[0.2em]">Remarks</label>
                          <div className="p-4 bg-page-bg rounded-xl border border-border min-h-[100px] cursor-text hover:border-brand transition-colors">
                             <p className="text-xs text-text-secondary italic">Add remarks...</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="inflow-card p-6 bg-slate-900 text-white space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                 <h4 className="text-[10px] uppercase font-black tracking-[0.2em] text-white/50">Customs Info</h4>
                 <ShieldCheck size={18} className="text-emerald-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[8px] font-bold text-white/40 uppercase">QA Passed?</label>
                    <button className="px-3 py-1 bg-white/10 rounded text-xs font-black hover:bg-white/20 transition-all uppercase tracking-widest">Manage</button>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[8px] font-bold text-white/40 uppercase">Capacity</label>
                    <p className="text-lg font-black">5</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
