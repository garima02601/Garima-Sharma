import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, MessageSquare, ShieldCheck, Clock, Send, CheckCircle2, ExternalLink, Headphones, AlertCircle } from 'lucide-react';
import { ContactMessage, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockItems';
import { PlatformBadge } from './PlatformBadge';

interface ContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMessage?: (msg: Omit<ContactMessage, 'id' | 'submittedAt'>) => void;
}

export const ContactsModal: React.FC<ContactsModalProps> = ({
  isOpen,
  onClose,
  onSubmitMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState<ContactMessage['topic']>('price_mismatch');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const ticketId = `ER-TKT-${Math.floor(1000 + Math.random() * 9000)}`;

    if (onSubmitMessage) {
      onSubmitMessage({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        topic,
        message: message.trim(),
        status: 'received',
      });
    }

    setSubmittedTicket(ticketId);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const platformContacts: Array<{
    id: PlatformId;
    phone: string;
    email: string;
    hours: string;
  }> = [
    { id: 'blinkit', phone: '1800-208-1111', email: 'help@blinkit.com', hours: '6:00 AM - 2:00 AM' },
    { id: 'zepto', phone: '1800-833-2211', email: 'support@zeptonow.com', hours: '24/7 Active Support' },
    { id: 'swiggy', phone: '080-6000-6600', email: 'support@swiggy.in', hours: '24/7 Instamart Desk' },
    { id: 'bigbasket', phone: '1860-123-1000', email: 'customerservice@bigbasket.com', hours: '7:00 AM - 10:00 PM' },
    { id: 'jiomart', phone: '1800-890-1222', email: 'cs@jiomart.com', hours: '8:00 AM - 8:00 PM' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xs">
              <Headphones className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg tracking-tight font-['Cabinet_Grotesk']">
                ER Help & Platform Contacts
              </h3>
              <p className="text-xs text-indigo-200">
                Direct contacts for ER Aggregator & all 5 delivery partner support desks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Central Emergency Support Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-indigo-950 uppercase tracking-wider block">
                  Toll-Free Helpline
                </span>
                <a href="tel:18002673737" className="text-xs sm:text-sm font-extrabold text-indigo-700 hover:underline">
                  1800-267-3737
                </a>
                <span className="text-[10px] text-slate-500 block">Available 24x7 all days</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider block">
                  WhatsApp Support
                </span>
                <a href="https://wa.me/919876500033" target="_blank" rel="noreferrer" className="text-xs sm:text-sm font-extrabold text-emerald-700 hover:underline flex items-center gap-1">
                  +91 98765 00033
                </a>
                <span className="text-[10px] text-slate-500 block">Avg reply: 45 seconds</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-600 text-white shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-purple-950 uppercase tracking-wider block">
                  Email Support
                </span>
                <a href="mailto:support@er-delivery.in" className="text-xs sm:text-sm font-extrabold text-purple-700 hover:underline">
                  support@er-delivery.in
                </a>
                <span className="text-[10px] text-slate-500 block">Escalations & queries</span>
              </div>
            </div>
          </div>

          {/* Individual 5-Platform Customer Care Directory */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Partner Platform Direct Contact Directory</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                Direct rider / dark store escalations
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {platformContacts.map((pc) => {
                const config = PLATFORMS[pc.id];
                return (
                  <div
                    key={pc.id}
                    className="p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <PlatformBadge platformId={pc.id} size="sm" />
                      <span className="text-[10px] font-bold text-slate-400">
                        {pc.hours}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <a href={`tel:${pc.phone}`} className="font-semibold hover:text-indigo-600">
                          {pc.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        <a href={`mailto:${pc.email}`} className="truncate hover:text-indigo-600 text-[11px]">
                          {pc.email}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Headquarters Address Card */}
              <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-slate-50/70 space-y-1.5 text-xs">
                <div className="flex items-center gap-1 text-slate-800 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>ER Corporate Hub</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  #104, 100ft Road, Indiranagar, Bengaluru, Karnataka 560038, India
                </p>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Grievance Officer: Vikram Rao (compliance@er-delivery.in)
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Contact & Inquiry Form */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Send className="w-4 h-4 text-indigo-600" />
                <span>Submit a Query or Report a Discrepancy</span>
              </h4>
              <p className="text-[11px] text-slate-500">
                Notice a price mismatch between ER and Blinkit/Zepto? Or have a delivery question? Our team responds within 15 minutes.
              </p>
            </div>

            {submittedTicket ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-extrabold text-sm text-emerald-950">
                  Message Dispatched Successfully!
                </h5>
                <p className="text-xs text-emerald-800">
                  Your ticket ID is <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">{submittedTicket}</span>. A support specialist has been assigned.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="mt-2 text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                >
                  Submit another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Topic / Category
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-semibold"
                    >
                      <option value="price_mismatch">Report Price Mismatch</option>
                      <option value="order_delay">Live Order Delayed</option>
                      <option value="missing_item">Missing / Damaged Item</option>
                      <option value="partnership">Platform / Store Partnership</option>
                      <option value="feedback">Product Feedback / Suggestion</option>
                      <option value="general">General Support</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Message Details *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe what happened or how we can help..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Encrypted ticket routing to senior resolution leads
                  </span>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>ER Customer Protection Guarantee: 100% resolution within 2 hours</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
