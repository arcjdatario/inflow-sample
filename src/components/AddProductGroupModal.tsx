import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface AddProductGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductGroupModal({ isOpen, onClose }: AddProductGroupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[110] p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-[750px] max-h-[90vh] rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#F9FAFB] px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Add Product Group</h2>
            <p className="text-xs text-text-secondary font-medium italic">Create variants like color, size, or material</p>
          </div>
          <button onClick={onClose} className="p-2 text-text-secondary hover:text-text-primary hover:bg-page-bg rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Section 1: Basic Info */}
          <div>
            <div className="mb-4">
               <label className="text-sm font-bold text-text-primary">Product Group Name *</label>
               <input 
                 type="text" 
                 placeholder="e.g., T-Shirt" 
                 className="w-full h-10 px-3 border border-border rounded-md text-sm mt-1 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
               />
            </div>
            <div>
               <label className="text-sm font-bold text-text-primary">Description</label>
               <textarea 
                 className="w-full h-20 p-3 border border-border rounded-md text-sm mt-1 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all placeholder:italic"
                 placeholder="Enter a brief description for this group..."
               ></textarea>
            </div>
          </div>

          {/* Section 2: Variant Options */}
          <div className="bg-page-bg/50 border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
               <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider flex items-center gap-2">
                 Variant Options
                 <Info size={14} className="text-text-secondary" />
               </h3>
            </div>
            
            <div className="space-y-3">
              {/* Option 1: Size */}
              <div className="flex items-center gap-3">
                <div className="w-24 shrink-0">
                   <p className="text-[11px] font-black uppercase text-text-secondary mb-1">Option</p>
                   <div className="h-10 px-3 flex items-center border border-border bg-white rounded-md text-sm font-bold">Size</div>
                </div>
                <div className="flex-1">
                   <p className="text-[11px] font-black uppercase text-text-secondary mb-1">Values (comma separated)</p>
                   <div className="h-10 px-3 flex items-center border border-border bg-white rounded-md text-sm gap-2 flex-wrap overflow-hidden">
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-bold">S</span>
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-bold">M</span>
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-bold">L</span>
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-bold">XL</span>
                   </div>
                </div>
                <button className="self-end mb-2 p-2 text-text-secondary hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Option 2: Color */}
              <div className="flex items-center gap-3">
                <div className="w-24 shrink-0">
                   <div className="h-10 px-3 flex items-center border border-border bg-white rounded-md text-sm font-bold">Color</div>
                </div>
                <div className="flex-1">
                   <div className="h-10 px-3 flex items-center border border-border bg-white rounded-md text-sm gap-2">
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-bold">Red</span>
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-bold">Blue</span>
                      <span className="px-2 py-0.5 bg-brand/10 text-brand rounded text-xs font-bold">Black</span>
                   </div>
                </div>
                <button className="p-2 text-text-secondary hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <button className="text-xs font-bold text-brand flex items-center gap-1 mt-2">
              <Plus size={14} /> Add another option
            </button>
          </div>

          {/* Section 3: Creation Mode */}
          <div className="space-y-4">
             <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Creation Mode</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative p-4 border-2 border-brand bg-brand/5 rounded-xl cursor-pointer">
                   <input type="radio" name="mode" defaultChecked className="absolute top-4 right-4 w-4 h-4 text-brand focus:ring-brand" />
                   <div className="pr-8">
                      <p className="font-bold text-text-primary text-sm">Group and products</p>
                      <p className="text-xs text-text-secondary mt-1">Create this product group with individual products for each variant combination.</p>
                   </div>
                </label>
                <label className="relative p-4 border-2 border-border bg-white rounded-xl cursor-pointer hover:border-brand/30 transition-all">
                   <input type="radio" name="mode" className="absolute top-4 right-4 w-4 h-4 text-brand focus:ring-brand" />
                   <div className="pr-8">
                      <p className="font-bold text-text-primary text-sm">Group only</p>
                      <p className="text-xs text-text-secondary mt-1">Create this product group with 0 products now. inFlow will link products to it later.</p>
                   </div>
                </label>
             </div>
          </div>

          {/* Section 4: Example Preview */}
          <div className="space-y-2">
             <h3 className="text-[10px] font-black text-text-secondary uppercase tracking-widest px-1">Variant Combinations Preview</h3>
             <div className="inflow-card overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#F9FAFB] border-b border-border">
                    <tr>
                      <th className="px-4 py-2 text-[10px] uppercase font-bold text-text-secondary">Expected Product Name</th>
                      <th className="px-4 py-2 text-[10px] uppercase font-bold text-text-secondary">Variants</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b border-border">
                      <td className="px-4 py-2 font-medium">T-Shirt (S, Red)</td>
                      <td className="px-4 py-2 text-text-secondary italic">Size: S, Color: Red</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="px-4 py-2 font-medium">T-Shirt (S, Blue)</td>
                      <td className="px-4 py-2 text-text-secondary italic">Size: S, Color: Blue</td>
                    </tr>
                    <tr className="border-b border-border text-text-secondary">
                      <td colSpan={2} className="px-4 py-2 text-center py-4 bg-page-bg/20">... plus 10 other combinations</td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F9FAFB] border-t border-border flex items-center justify-between">
          <button onClick={onClose} className="px-6 py-2 border border-border bg-white rounded-lg text-sm font-bold text-text-secondary hover:bg-page-bg transition-colors">
            Cancel
          </button>
          <button className="px-8 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg text-sm font-bold shadow-sm transition-all shadow-brand/20">
            Create Group
          </button>
        </div>
      </motion.div>
    </div>
  );
}
