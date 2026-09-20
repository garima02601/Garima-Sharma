import React from 'react';
import { PlatformId } from '../types';
import { PLATFORMS } from '../data/mockItems';

interface PlatformBadgeProps {
  platformId: PlatformId;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platformId,
  size = 'md',
  showTagline = false
}) => {
  const config = PLATFORMS[platformId];
  if (!config) return null;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold rounded-md',
    md: 'px-2.5 py-1 text-xs font-bold rounded-lg',
    lg: 'px-3 py-1.5 text-sm font-bold rounded-xl'
  };

  return (
    <span
      id={`platform-badge-${platformId}`}
      className={`inline-flex items-center gap-1.5 transition-all shadow-xs ${sizeClasses[size]}`}
      style={{
        backgroundColor: config.badgeColor,
        color: config.badgeTextColor,
      }}
    >
      <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
      <span>{config.name}</span>
      {showTagline && (
        <span className="opacity-80 text-[10px] hidden sm:inline ml-1 font-normal">
          • {config.tagline}
        </span>
      )}
    </span>
  );
};
