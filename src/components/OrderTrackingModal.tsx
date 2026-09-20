import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Phone, ShieldCheck, MapPin, Navigation, Bike } from 'lucide-react';
import { DeliveryLocation, OrderRecord } from '../types';
import { PLATFORMS } from '../data/mockItems';
import { PlatformBadge } from './PlatformBadge';

interface OrderTrackingModalProps {
  order: OrderRecord | null;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(540); // 9 minutes

  // Simulate real-time progress transitions
  useEffect(() => {
    const t1 = setTimeout(() => setCurrentStep(2), 2500);
    const t2 = setTimeout(() => setCurrentStep(3), 5500);
    const t3 = setTimeout(() => setCurrentStep(4), 9000);

    const interval = setInterval(() => {
      setSecondsRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const steps = [
    { label: 'Order Confirmed', desc: 'Received by ER unified gateway' },
    { label: 'Dark Store Packing', desc: 'Item scanned & temperature secured' },
    { label: 'Rider Dispatched', desc: `${order.riderName} on electric 2-wheeler` },
    { label: 'Out for Delivery', desc: `Arriving in ${formattedTime}` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <Bike className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight font-['Cabinet_Grotesk']">
                  Live Order Tracker
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {order.id}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Direct fulfillment via ER Aggregator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Simulation Map Strip */}
        <div className="relative h-44 bg-slate-100 border-b border-slate-200 overflow-hidden flex items-center justify-center">
          {/* Stylized Map Grid Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Route path curve */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 60 120 Q 220 40 420 80"
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
          </svg>

          {/* Dark Store Marker */}
          <div className="absolute left-10 bottom-8 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg border-2 border-white text-xs font-bold">
              🏬
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded-md shadow-xs mt-1">
              Dark Store Hub
            </span>
          </div>

          {/* Customer Destination Marker */}
          <div className="absolute right-10 top-10 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white text-xs font-bold">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-white/90 px-1.5 py-0.5 rounded-md shadow-xs mt-1">
              Your Location
            </span>
          </div>

          {/* Moving Rider Icon */}
          <div
            className="absolute transition-all duration-1000 flex flex-col items-center z-10"
            style={{
              left: `${Math.min(85, 20 + currentStep * 16)}%`,
              top: `${Math.max(25, 65 - currentStep * 10)}%`,
            }}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
              <Bike className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-extrabold text-white bg-slate-900 px-2 py-0.5 rounded-full shadow-md mt-0.5">
              ETA {formattedTime}
            </span>
          </div>

          {/* Live Badge Overlay */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Delivery in progress</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-4 max-h-[50vh] overflow-y-auto">
          
          {/* OTP & Rider Strip */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-emerald-700 block">Delivery Confirmation PIN</span>
              <span className="text-xl font-extrabold text-emerald-950 tracking-widest font-mono">
                5 8 9 2
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-500 block">Assigned Rider</span>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1 justify-end">
                {order.riderName}
                <button className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center ml-1 shadow-xs">
                  <Phone className="w-3 h-3" />
                </button>
              </span>
            </div>
          </div>

          {/* 4-Step Progression Tracker */}
          <div className="space-y-3 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Fulfillment Milestones
            </h4>
            
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isPassed = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;

                return (
                  <div key={step.label} className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle className="w-3.5 h-3.5" /> : stepNum}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-indigo-900' : 'text-slate-700'}`}>
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200 animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Summary in Order */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-700 block mb-2">Order Breakdown:</span>
            <div className="space-y-1.5">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2 truncate">
                    <PlatformBadge platformId={it.selectedPlatform} size="sm" />
                    <span className="truncate">{it.quantity}x {it.item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    ₹{(it.item.quotes[it.selectedPlatform]?.price || 0) * it.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-900">
              <span>Total Paid via ER</span>
              <span className="text-sm text-indigo-700 font-['Cabinet_Grotesk']">₹{order.total}</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ER Buyer Protection Active</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
          >
            Track in Background
          </button>
        </div>

      </div>
    </div>
  );
};
