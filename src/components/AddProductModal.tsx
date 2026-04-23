import React, { useState } from 'react';
import { X, ChevronDown, Package, Plus, Info, Upload, Trash2, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InputField = ({ label, placeholder, required, type = "text", subtext }: { label: string, placeholder?: string, required?: boolean, type?: string, subtext?: string }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-semibold text-text-primary flex items-center gap-1">
      {label} {required && <span className="text-red-500 font-bold">*</span>}
      {subtext && <Info size={14} className="text-text-secondary cursor-help" />}
    </label>
    <input 
      type={type}
      placeholder={placeholder}
      className={`h-10 px-3 border border-border rounded-md text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all placeholder:italic placeholder:text-text-secondary/50 ${required && !placeholder ? 'border-red-200' : ''}`}
    />
  </div>
);

const SelectField = ({ label, required, options }: { label: string, required?: boolean, options: string[] }) => (
  <div className="flex flex-col gap-1 w-full relative">
    <label className="text-sm font-semibold text-text-primary">
      {label} {required && <span className="text-red-500 font-bold">*</span>}
    </label>
    <div className="relative">
      <select className="w-full h-10 px-3 pr-10 border border-border rounded-md text-sm bg-white appearance-none focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all cursor-pointer">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
    </div>
  </div>
);

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [activeTab, setActiveTab] = useState('General');
  const [productMode, setProductMode] = useState<'stock' | 'non-stocked'>('stock');

  if (!isOpen) return null;

  const tabs = ['General', 'Units & Locations', 'Kit/Group', 'Advanced'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-[700px] max-h-[95vh] rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#F9FAFB] px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Add Product</h2>
            <p className="text-xs text-text-secondary font-medium">Create a single product record</p>
          </div>
          <button onClick={onClose} className="p-2 text-text-secondary hover:text-text-primary hover:bg-page-bg rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-all relative ${
                activeTab === tab ? 'text-brand' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
              )}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'General' && (
              <motion.div key="general" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                {/* Product Mode Selection */}
                <div className="bg-page-bg rounded-xl p-2 flex gap-1 border border-border">
                  <button 
                    onClick={() => setProductMode('stock')}
                    className={`flex-1 flex flex-col items-center justify-center py-4 rounded-lg transition-all border-2 ${
                      productMode === 'stock' ? 'bg-white border-brand shadow-sm' : 'border-transparent text-text-secondary hover:bg-white/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mb-2 ${productMode === 'stock' ? 'bg-brand/10 text-brand' : 'bg-slate-200'}`}>
                      <Package size={20} />
                    </div>
                    <span className="text-sm font-bold">Stock Product</span>
                    <span className="text-[10px] opacity-70 px-4 text-center mt-1">Physical objects whose quantity should be tracked.</span>
                  </button>
                  <button 
                    onClick={() => setProductMode('non-stocked')}
                    className={`flex-1 flex flex-col items-center justify-center py-4 rounded-lg transition-all border-2 ${
                      productMode === 'non-stocked' ? 'bg-white border-brand shadow-sm' : 'border-transparent text-text-secondary hover:bg-white/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg mb-2 ${productMode === 'non-stocked' ? 'bg-brand/10 text-brand' : 'bg-slate-200'}`}>
                      <ClipboardList size={20} />
                    </div>
                    <span className="text-sm font-bold">Non-stocked Product</span>
                    <span className="text-[10px] opacity-70 px-4 text-center mt-1">Not tracked by quantity, but can assign costs and prices.</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <InputField label="Product Name *" placeholder="Required" required />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="SKU" placeholder="Optional" />
                    <InputField label="Barcode" placeholder="Optional" />
                  </div>
                  
                  {productMode === 'stock' && (
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                      <InputField label="Initial Stock" type="number" placeholder="0" />
                      <InputField label="Reorder Point" type="number" placeholder="5" />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-bold text-text-primary">Unit Cost</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">$</span>
                        <input type="number" className="w-full h-10 pl-7 border border-border rounded-md text-sm outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-bold text-text-primary">Selling Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">$</span>
                        <input type="number" className="w-full h-10 pl-7 border border-border rounded-md text-sm outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand" placeholder="0.00" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs remain similar but simplified for the demo focus */}
            {activeTab !== 'General' && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                <Info size={32} />
                <p className="mt-4 font-bold italic">Standard inFlow settings for {activeTab}</p>
                <p className="text-xs">UOM, Multi-location, Kit components, and Advanced attributes.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F9FAFB] border-t border-border flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 border border-border bg-white rounded-lg text-sm font-bold text-text-secondary hover:bg-page-bg transition-colors">
            Cancel
          </button>
          <button className="px-8 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-sm font-bold shadow-sm transition-all focus:ring-2 focus:ring-brand/20">
            Save Product
          </button>
        </div>
      </motion.div>
    </div>
  );
}
