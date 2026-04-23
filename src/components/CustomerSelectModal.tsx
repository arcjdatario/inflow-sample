import React from 'react';
import { X, Search, User } from 'lucide-react';
import { motion } from 'motion/react';

interface CustomerSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (customer: any) => void;
}

const customers = [
  { name: 'Beth May', contact: 'Beth May', phone: '111-222-3334', email: 'Not-A-Person@email-address.com', address: '2371 Address Blvd, Kulpsville, PA 12346, United States' },
  { name: 'Anom Inc.', contact: 'Simona Morasca', phone: '111-222-3333', email: 'Not-A-Person@email-address.com', address: '2371 Address Blvd, Ashland, OH 12345, United States' },
  { name: 'Production Planet', contact: 'Graciela Ruta', phone: '444-555-6666', email: 'graciela@prodplanet.com', address: '888 Industrial Way, Gary, IN 46401' },
  { name: 'Bollinger Machine & Shipyard', contact: 'Blair Malet', phone: '777-888-9999', email: 'blair@bollinger.com', address: '123 Port Road, New Orleans, LA 70112' },
];

export default function CustomerSelectModal({ isOpen, onClose, onSelect }: CustomerSelectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[120] p-4 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="p-4 border-b border-border flex items-center justify-between bg-page-bg">
          <h3 className="font-bold text-text-primary">Select a Customer</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-white rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full h-10 pl-10 pr-4 bg-page-bg border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none"
            />
          </div>

          <div className="space-y-1 max-h-96 overflow-y-auto">
            {customers.map((c) => (
              <button 
                key={c.name}
                onClick={() => onSelect(c)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-page-bg transition-all group group-hover:border-brand"
              >
                <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center shrink-0">
                  <User size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-text-primary group-hover:text-brand transition-colors">{c.name}</p>
                  <p className="text-xs text-text-secondary">{c.contact}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-border bg-page-bg/50 flex justify-end">
           <button className="text-xs font-bold text-brand hover:underline">+ Create new customer</button>
        </div>
      </motion.div>
    </div>
  );
}
