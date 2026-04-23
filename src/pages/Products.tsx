import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, MoreVertical, Download, Layers } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';
import AddProductGroupModal from '../components/AddProductGroupModal';
import ProductDetailView from '../components/ProductDetailView';

const products = [
  { id: 0, sku: '3110005', name: '12" Wok - Non-Stick', type: 'Stock', stock: 36, cost: '$30.00', price: '$120.00', status: 'In Stock' },
  { id: 1, sku: 'CH-001', name: 'Office Chair', type: 'Stock', stock: 45, cost: '$45.00', price: '$89.00', status: 'In Stock' },
  { id: 2, sku: 'SV-002', name: 'Setup Service', type: 'Non-stocked', stock: '—', cost: '$0.00', price: '$150.00', status: 'In Stock' },
  { id: 3, sku: 'TS-001', name: 'Cotton T-Shirt', type: 'Group', stock: 120, cost: '$12.00', price: '$24.00', status: 'In Stock' },
  { id: 4, sku: 'KB-402', name: 'Ergo Keyboard', type: 'Stock', stock: 12, cost: '$35.00', price: '$75.00', status: 'Low Stock' },
];

export default function Products() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (selectedProduct) {
    return <ProductDetailView onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Products</h2>
          <p className="text-text-secondary text-sm">Create and manage your products and product groups.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsGroupModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-border bg-white rounded-lg text-text-secondary hover:text-text-primary hover:bg-page-bg transition-all font-medium text-sm"
          >
            <Layers size={18} />
            <span>Add Product Group</span>
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="inflow-btn-primary h-10 px-6">
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <AddProductGroupModal isOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)} />

      {/* Filter Bar */}
      <div className="inflow-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or SKU..." 
            className="w-full h-10 bg-page-bg border border-border rounded-lg pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border bg-white rounded-lg text-text-secondary hover:text-text-primary hover:bg-page-bg transition-all font-medium text-sm">
            <Filter size={18} />
            <span>Filters</span>
          </button>
          <button className="p-2 text-text-secondary hover:bg-page-bg rounded-lg border border-border">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="inflow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-page-bg border-b border-border">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded text-brand focus:ring-brand border-border" />
                </th>
                <th className="px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Image & SKU</th>
                <th className="px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Product Name</th>
                <th className="px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest text-right">Stock</th>
                <th className="px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest text-right">Unit Cost</th>
                <th className="px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest text-right">Selling Price</th>
                <th className="px-6 py-4 text-[11px] font-black text-text-secondary uppercase tracking-widest">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr 
                  key={p.id} 
                  className="inflow-table-row group cursor-pointer"
                  onClick={() => setSelectedProduct(p)}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="w-4 h-4 rounded text-brand focus:ring-brand border-border" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-page-bg rounded-lg flex items-center justify-center text-xl border border-border">
                        📦
                      </div>
                      <span className="text-xs font-mono text-brand font-bold bg-brand/5 px-2 py-0.5 rounded border border-brand/10">{p.sku}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-text-primary">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-[11px] font-bold px-2 py-1 bg-page-bg rounded border border-border text-text-secondary">
                      {p.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-black text-slate-700">{p.stock}</td>
                  <td className="px-6 py-4 text-right">{p.cost}</td>
                  <td className="px-6 py-4 text-right font-medium text-text-primary">{p.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight ${
                      p.status === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-text-secondary hover:text-brand hover:bg-brand-light rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <Edit2 size={16} />
                    </button>
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
