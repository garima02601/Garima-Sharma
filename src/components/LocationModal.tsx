import React, { useState } from 'react';
import { X, MapPin, Navigation, Check, LocateFixed, Search } from 'lucide-react';
import { DeliveryLocation } from '../types';
import { PRESET_LOCATIONS } from '../data/mockItems';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: DeliveryLocation;
  onSelectLocation: (loc: DeliveryLocation) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [detectingGps, setDetectingGps] = useState(false);

  if (!isOpen) return null;

  const handleUseCurrentGps = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDetectingGps(false);
        onSelectLocation({
          label: 'Current Location (GPS)',
          address: 'Detected via device coordinates',
          city: 'Local Area',
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        onClose();
      },
      (err) => {
        setDetectingGps(false);
        console.warn('Geolocation error:', err);
        // Fallback to Indiranagar default
        alert('Could not acquire GPS coordinates. Using Indiranagar, Bengaluru.');
      },
      { timeout: 8000 }
    );
  };

  const filteredLocations = PRESET_LOCATIONS.filter(loc =>
    loc.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Select Delivery Location</h3>
              <p className="text-[11px] text-slate-500">Compare real-time dark store coverage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & GPS button */}
        <div className="p-4 space-y-3">
          
          {/* GPS Detector button */}
          <button
            id="use-gps-btn"
            onClick={handleUseCurrentGps}
            disabled={detectingGps}
            className="w-full py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center justify-center gap-2 border border-indigo-200/80 shadow-2xs"
          >
            <LocateFixed className={`w-4 h-4 ${detectingGps ? 'animate-spin' : ''}`} />
            <span>{detectingGps ? 'Detecting current GPS location...' : 'Use Current Device Location'}</span>
          </button>

          {/* Search filter input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search area, landmark or city..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* Locations list */}
          <div className="space-y-2 max-h-60 overflow-y-auto pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
              Supported Delivery Hotspots
            </span>

            {filteredLocations.map((loc) => {
              const isSelected = loc.label === currentLocation.label;
              return (
                <div
                  key={loc.label}
                  onClick={() => {
                    onSelectLocation(loc);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-300 shadow-2xs'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <Navigation className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{loc.label}</h4>
                      <p className="text-[11px] text-slate-500">{loc.address}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
