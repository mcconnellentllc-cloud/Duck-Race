'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type DuckTier = 'A' | 'B' | 'C' | 'D';

const TIER_CONFIG = {
  A: { price: 10, label: '$10 Duck' },
  B: { price: 25, label: '$25 Duck' },
  C: { price: 50, label: '$50 Duck' },
  D: { price: 100, label: '$100 Duck' },
};

interface DuckEntry {
  tier: string;
  quantity: number;
  duckNumbers: string[];
}

interface Order {
  _id: string;
  buyerName: string;
  phone: string;
  email: string;
  address: string;
  ducks: DuckEntry[];
  totalDucks: number;
  amountPaid: number;
  paymentMethod: string;
  purchaseDate: string;
  notes: string;
}

interface Donation {
  _id: string;
  donorName: string;
  phone: string;
  email: string;
  address: string;
  amount: number;
  paymentMethod: string;
  donationDate: string;
  notes: string;
  anonymous: boolean;
}

interface TierStats {
  tier: string;
  label: string;
  ducksSold: number;
  totalPot: number;
  winnerPayout: number;
  scholarshipFund: number;
}

interface Stats {
  tiers: TierStats[];
  grandTotal: {
    ducksSold: number;
    totalPot: number;
    scholarshipFund: number;
    donationsTotal: number;
  };
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'donations'>('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addFormType, setAddFormType] = useState<'order' | 'donation'>('order');
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  // Manual entry form state
  const [manualForm, setManualForm] = useState({
    buyerName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
    notes: '',
  });
  const [manualDucks, setManualDucks] = useState<Record<DuckTier, number>>({
    A: 0, B: 0, C: 0, D: 0,
  });
  const [donationAmount, setDonationAmount] = useState(0);
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [ordersRes, donationsRes, statsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/donations'),
        fetch('/api/stats'),
      ]);

      if (ordersRes.ok) {
        const data = await ordersRes.json();
        setOrders(data.orders || []);
      }
      if (donationsRes.ok) {
        const data = await donationsRes.json();
        setDonations(data.donations || []);
      }
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateManualTotal = () => {
    return Object.entries(manualDucks).reduce((total, [tier, qty]) => {
      return total + (TIER_CONFIG[tier as DuckTier].price * qty);
    }, 0);
  };

  const getTotalManualDucks = () => {
    return Object.values(manualDucks).reduce((a, b) => a + b, 0);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage(null);

    try {
      if (addFormType === 'order') {
        const ducks = Object.entries(manualDucks)
          .filter(([, qty]) => qty > 0)
          .map(([tier, quantity]) => ({ tier, quantity }));

        if (ducks.length === 0) {
          throw new Error('Please select at least one duck');
        }

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            buyerName: manualForm.buyerName,
            phone: manualForm.phone,
            email: manualForm.email || 'admin-entry@duckrace.local',
            address: manualForm.address,
            ducks,
            paymentMethod: manualForm.paymentMethod,
            notes: manualForm.notes + ' [Admin Entry]',
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to create order');
        }

        setFormMessage({ type: 'success', text: 'Order added successfully!' });
      } else {
        if (donationAmount <= 0) {
          throw new Error('Please enter a donation amount');
        }

        const res = await fetch('/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            donorName: manualForm.buyerName,
            phone: manualForm.phone,
            email: manualForm.email || 'admin-entry@duckrace.local',
            address: manualForm.address,
            amount: donationAmount,
            paymentMethod: manualForm.paymentMethod,
            notes: manualForm.notes + ' [Admin Entry]',
            anonymous,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to create donation');
        }

        setFormMessage({ type: 'success', text: 'Donation added successfully!' });
      }

      // Reset form
      setManualForm({
        buyerName: '',
        phone: '',
        email: '',
        address: '',
        paymentMethod: 'cash',
        notes: '',
      });
      setManualDucks({ A: 0, B: 0, C: 0, D: 0 });
      setDonationAmount(0);
      setAnonymous(false);

      // Refresh data
      fetchData();
    } catch (error) {
      setFormMessage({ type: 'error', text: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.phone.includes(searchTerm) ||
    order.ducks.some(d => d.duckNumbers.some(num => num.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const filteredDonations = donations.filter(donation =>
    donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.phone.includes(searchTerm)
  );

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Address', 'Total Ducks', 'Amount', 'Payment Method', 'Date', 'Duck Numbers', 'Notes'];
    const rows = orders.map(order => [
      order.buyerName,
      order.phone,
      order.email,
      order.address,
      order.totalDucks,
      order.amountPaid,
      order.paymentMethod,
      formatDate(order.purchaseDate),
      order.ducks.flatMap(d => d.duckNumbers).join('; '),
      order.notes,
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `duck-race-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportDonationsToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Address', 'Amount', 'Payment Method', 'Date', 'Anonymous', 'Notes'];
    const rows = donations.map(donation => [
      donation.anonymous ? 'Anonymous' : donation.donorName,
      donation.phone,
      donation.email,
      donation.address,
      donation.amount,
      donation.paymentMethod,
      formatDate(donation.donationDate),
      donation.anonymous ? 'Yes' : 'No',
      donation.notes,
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `duck-race-donations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-haynes-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-wrangler-700">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-haynes-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 no-print">
          <div>
            <h1 className="text-3xl font-bold text-wrangler-800">Admin Dashboard</h1>
            <p className="text-carhartt-600">Toyne-Britton Memorial Scholarship Duck Race</p>
          </div>
          <Link href="/" className="text-wrangler-600 hover:text-wrangler-800 underline">
            Back to Site
          </Link>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 no-print">
            <div className="card text-center">
              <div className="text-3xl font-bold text-wrangler-700">{stats.grandTotal.ducksSold}</div>
              <div className="text-sm text-gray-600">Total Ducks Sold</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-wrangler-700">{formatCurrency(stats.grandTotal.totalPot)}</div>
              <div className="text-sm text-gray-600">Total Race Pot</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-wrangler-700">{formatCurrency(stats.grandTotal.donationsTotal)}</div>
              <div className="text-sm text-gray-600">Total Donations</div>
            </div>
            <div className="card text-center bg-carhartt-50">
              <div className="text-3xl font-bold text-carhartt-700">{formatCurrency(stats.grandTotal.scholarshipFund)}</div>
              <div className="text-sm text-gray-600">To Scholarship</div>
            </div>
          </div>
        )}

        {/* Tier Breakdown */}
        {stats && (
          <div className="card mb-8 no-print">
            <h2 className="text-xl font-bold text-wrangler-800 mb-4">Tier Breakdown</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-carhartt-200">
                    <th className="text-left py-2 px-4">Tier</th>
                    <th className="text-right py-2 px-4">Ducks Sold</th>
                    <th className="text-right py-2 px-4">Total Pot</th>
                    <th className="text-right py-2 px-4">Winner Payout</th>
                    <th className="text-right py-2 px-4">To Scholarship</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.tiers.map(tier => (
                    <tr key={tier.tier} className="border-b border-carhartt-100">
                      <td className="py-2 px-4 font-semibold">{tier.tier} - {tier.label}</td>
                      <td className="text-right py-2 px-4">{tier.ducksSold}</td>
                      <td className="text-right py-2 px-4">{formatCurrency(tier.totalPot)}</td>
                      <td className="text-right py-2 px-4 text-carhartt-700">{formatCurrency(tier.winnerPayout)}</td>
                      <td className="text-right py-2 px-4 text-wrangler-700">{formatCurrency(tier.scholarshipFund)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Manual Entry Section */}
        <div className="card mb-8 no-print">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-wrangler-800">Add Entry (Cash/In-Person Sales)</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-wrangler-600 hover:bg-wrangler-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {showAddForm ? 'Hide Form' : 'Add New Entry'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleManualSubmit} className="space-y-6">
              {/* Type Toggle */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setAddFormType('order')}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    addFormType === 'order'
                      ? 'bg-wrangler-600 text-white'
                      : 'bg-carhartt-100 text-carhartt-700'
                  }`}
                >
                  Duck Order
                </button>
                <button
                  type="button"
                  onClick={() => setAddFormType('donation')}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    addFormType === 'donation'
                      ? 'bg-wrangler-600 text-white'
                      : 'bg-carhartt-100 text-carhartt-700'
                  }`}
                >
                  Donation
                </button>
              </div>

              {formMessage && (
                <div className={`p-4 rounded-lg ${formMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {formMessage.text}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  value={manualForm.buyerName}
                  onChange={(e) => setManualForm({ ...manualForm, buyerName: e.target.value })}
                  required
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  value={manualForm.phone}
                  onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                  required
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={manualForm.email}
                  onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={manualForm.address}
                  onChange={(e) => setManualForm({ ...manualForm, address: e.target.value })}
                  required={addFormType === 'order'}
                  className="input-field"
                />
                <select
                  value={manualForm.paymentMethod}
                  onChange={(e) => setManualForm({ ...manualForm, paymentMethod: e.target.value })}
                  className="input-field"
                >
                  <option value="cash">Cash</option>
                  <option value="venmo">Venmo</option>
                  <option value="paypal">PayPal</option>
                </select>
                <input
                  type="text"
                  placeholder="Notes (optional)"
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="input-field"
                />
              </div>

              {addFormType === 'order' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(Object.entries(TIER_CONFIG) as [DuckTier, typeof TIER_CONFIG.A][]).map(([tier, config]) => (
                    <div key={tier} className="text-center p-4 bg-haynes-100 rounded-lg">
                      <div className="font-bold text-wrangler-700">{tier} - {config.label}</div>
                      <input
                        type="number"
                        min="0"
                        value={manualDucks[tier]}
                        onChange={(e) => setManualDucks({ ...manualDucks, [tier]: parseInt(e.target.value) || 0 })}
                        className="w-20 text-center border-2 border-carhartt-300 rounded-lg py-2 mt-2"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-gray-600">$</span>
                  <input
                    type="number"
                    min="1"
                    value={donationAmount || ''}
                    onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                    placeholder="Donation amount"
                    className="input-field w-48"
                    required
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span>Anonymous</span>
                  </label>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-lg font-bold text-wrangler-800">
                  {addFormType === 'order'
                    ? `Total: ${getTotalManualDucks()} ducks - ${formatCurrency(calculateManualTotal())}`
                    : `Donation: ${formatCurrency(donationAmount)}`}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-wrangler-600 hover:bg-wrangler-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Adding...' : 'Add Entry'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-4 no-print">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'bg-wrangler-600 text-white'
                : 'bg-white text-wrangler-700 border border-carhartt-200'
            }`}
          >
            Duck Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              activeTab === 'donations'
                ? 'bg-wrangler-600 text-white'
                : 'bg-white text-wrangler-700 border border-carhartt-200'
            }`}
          >
            Donations ({donations.length})
          </button>
        </div>

        {/* Search and Export */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 no-print">
          <input
            type="text"
            placeholder="Search by name, email, phone, or duck number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field flex-1"
          />
          <button
            onClick={activeTab === 'orders' ? exportToCSV : exportDonationsToCSV}
            className="bg-carhartt-600 hover:bg-carhartt-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Export CSV
          </button>
        </div>

        {/* Orders Table */}
        {activeTab === 'orders' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-wrangler-50 border-b border-carhartt-200">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-left py-3 px-4">Ducks</th>
                    <th className="text-right py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4 no-print">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order._id} className="border-b border-carhartt-100 hover:bg-haynes-100">
                      <td className="py-3 px-4 font-semibold">{order.buyerName}</td>
                      <td className="py-3 px-4">
                        <div className="text-xs">{order.email}</div>
                        <div className="text-xs text-gray-500">{order.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        {order.ducks.map(d => (
                          <div key={d.tier} className="text-xs">
                            <span className="font-semibold">{d.tier}:</span> {d.quantity} ({d.duckNumbers.join(', ')})
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">{formatCurrency(order.amountPaid)}</td>
                      <td className="py-3 px-4 capitalize">{order.paymentMethod}</td>
                      <td className="py-3 px-4 text-xs">{formatDate(order.purchaseDate)}</td>
                      <td className="py-3 px-4 no-print">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-wrangler-600 hover:text-wrangler-800 underline text-xs"
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && (
                <p className="text-center py-8 text-gray-500">No orders found</p>
              )}
            </div>
          </div>
        )}

        {/* Donations Table */}
        {activeTab === 'donations' && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-wrangler-50 border-b border-carhartt-200">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Contact</th>
                    <th className="text-right py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Payment</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map(donation => (
                    <tr key={donation._id} className="border-b border-carhartt-100 hover:bg-haynes-100">
                      <td className="py-3 px-4 font-semibold">
                        {donation.anonymous ? <span className="italic text-gray-500">Anonymous</span> : donation.donorName}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-xs">{donation.email}</div>
                        <div className="text-xs text-gray-500">{donation.phone}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-wrangler-700">{formatCurrency(donation.amount)}</td>
                      <td className="py-3 px-4 capitalize">{donation.paymentMethod}</td>
                      <td className="py-3 px-4 text-xs">{formatDate(donation.donationDate)}</td>
                      <td className="py-3 px-4 text-xs">{donation.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDonations.length === 0 && (
                <p className="text-center py-8 text-gray-500">No donations found</p>
              )}
            </div>
          </div>
        )}

        {/* Receipt Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 no-print">
            <div className="bg-white rounded-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div ref={printRef} className="p-8 print-area">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-wrangler-800">Toyne-Britton Memorial Scholarship</h2>
                  <p className="text-carhartt-600">Duck Race Receipt</p>
                </div>

                <div className="border-t border-b border-carhartt-200 py-4 my-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Name</p>
                      <p className="font-semibold">{selectedOrder.buyerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-semibold">{formatDate(selectedOrder.purchaseDate)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-semibold">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-semibold">{selectedOrder.phone}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-500">Address</p>
                      <p className="font-semibold">{selectedOrder.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-wrangler-800 mb-2">Duck Numbers</h3>
                  {selectedOrder.ducks.map(d => (
                    <div key={d.tier} className="mb-2">
                      <p className="text-sm font-semibold">Tier {d.tier} ({d.quantity} ducks)</p>
                      <p className="font-mono text-lg text-wrangler-700">{d.duckNumbers.join(', ')}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-carhartt-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Paid ({selectedOrder.paymentMethod})</span>
                    <span className="text-2xl font-bold text-wrangler-700">{formatCurrency(selectedOrder.amountPaid)}</span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="mt-4 p-3 bg-haynes-100 rounded-lg">
                    <p className="text-sm text-gray-600">Notes: {selectedOrder.notes}</p>
                  </div>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>Race Date: April 25, 2026</p>
                  <p>Thank you for supporting local youth!</p>
                </div>
              </div>

              <div className="p-4 border-t border-carhartt-200 flex gap-4 no-print">
                <button
                  onClick={handlePrint}
                  className="flex-1 bg-wrangler-600 hover:bg-wrangler-700 text-white py-2 rounded-lg font-semibold"
                >
                  Print Receipt
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-carhartt-200 hover:bg-carhartt-300 text-carhartt-800 py-2 rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
