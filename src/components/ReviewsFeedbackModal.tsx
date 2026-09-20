import React, { useState } from 'react';
import { X, Star, ThumbsUp, MessageSquare, CheckCircle2, Filter, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { ReviewItem, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockItems';
import { PlatformBadge } from './PlatformBadge';

interface ReviewsFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'date' | 'helpfulCount'>) => void;
  onHelpfulVote: (reviewId: string) => void;
}

export const ReviewsFeedbackModal: React.FC<ReviewsFeedbackModalProps> = ({
  isOpen,
  onClose,
  reviews,
  onAddReview,
  onHelpfulVote,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [platformTag, setPlatformTag] = useState<PlatformId | 'er_unified'>('er_unified');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Saved ₹150+', 'Accurate Live Prices']);
  const [comment, setComment] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const availableTags = [
    'Saved ₹150+',
    'Accurate Live Prices',
    'Lightning 10m Delivery',
    'Loved Split Basket',
    'Cheaper than Offline',
    'Dark Store Nearby',
    'Zero Markup',
    'Instant Checkout',
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    onAddReview({
      author: author.trim(),
      rating,
      platformTag,
      tags: selectedTags,
      comment: comment.trim(),
      verifiedBuyer: true,
    });

    setSubmittedSuccess(true);
    setAuthor('');
    setComment('');
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsFormOpen(false);
    }, 2000);
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    return r.platformTag === selectedFilter;
  });

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  const platformScoreCards: Array<{
    id: PlatformId | 'er_unified';
    name: string;
    rating: string;
    reviewsCount: string;
    highlight: string;
  }> = [
    { id: 'er_unified', name: 'ER Unified App', rating: '4.9', reviewsCount: '14,800+', highlight: 'Price savings & 1-click order' },
    { id: 'zepto', name: 'Zepto', rating: '4.8', reviewsCount: '8,200+', highlight: '9-min late-night speed' },
    { id: 'blinkit', name: 'Blinkit', rating: '4.7', reviewsCount: '9,100+', highlight: 'Electronics & packaging' },
    { id: 'swiggy', name: 'Swiggy Instamart', rating: '4.6', reviewsCount: '7,400+', highlight: 'Snack & dessert variety' },
    { id: 'bigbasket', name: 'BigBasket BB Now', rating: '4.5', reviewsCount: '6,200+', highlight: 'Fresh organic vegetables' },
    { id: 'jiomart', name: 'JioMart', rating: '4.3', reviewsCount: '5,100+', highlight: 'Lowest MRP on household staples' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xs">
              <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight font-['Cabinet_Grotesk']">
                  Overall Review & Feedback Center
                </h3>
                <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full border border-white/30">
                  {reviews.length} Verified Reviews
                </span>
              </div>
              <p className="text-xs text-emerald-100">
                Community feedback across ER and all 5 quick delivery apps
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Top Score Summary Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 font-['Cabinet_Grotesk']">
                    {averageRating}
                  </span>
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-600 block mt-0.5">
                  Based on 14,800+ aggregated customer ratings
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isFormOpen ? 'Cancel Feedback' : 'Write a Review'}</span>
            </button>
          </div>

          {/* Platform Performance Cards */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Multi-App Rating Breakdown
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {platformScoreCards.map((sc) => (
                <div
                  key={sc.id}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white text-center space-y-1 shadow-2xs"
                >
                  <span className="text-[11px] font-bold text-slate-700 block truncate">
                    {sc.name}
                  </span>
                  <div className="flex items-center justify-center gap-1 text-xs font-black text-slate-900">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{sc.rating}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 block truncate">
                    {sc.reviewsCount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Review Form */}
          {isFormOpen && (
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Share Your Experience & Rating</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Rate your shopping experience with ER or specific partner platforms.
                </p>
              </div>

              {submittedSuccess ? (
                <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-center text-xs font-bold text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 inline-block mr-1" />
                  Thank you! Your verified review has been published.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Reviewer Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. Priya M."
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
                      />
                    </div>

                    {/* Platform Tag */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Reviewing What?
                      </label>
                      <select
                        value={platformTag}
                        onChange={(e) => setPlatformTag(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-semibold"
                      >
                        <option value="er_unified">ER (Entire Unified Experience)</option>
                        <option value="blinkit">Blinkit Delivery</option>
                        <option value="zepto">Zepto Delivery</option>
                        <option value="swiggy">Swiggy Instamart Delivery</option>
                        <option value="bigbasket">BigBasket Delivery</option>
                        <option value="jiomart">JioMart Delivery</option>
                      </select>
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Rating *
                      </label>
                      <div className="flex items-center gap-1 py-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1 text-amber-400 hover:scale-110 transition"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-1.5">
                          {rating} / 5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Tags */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      Highlights (Select applicable)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {availableTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={`text-[11px] px-2.5 py-1 rounded-lg border transition font-medium ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback Comments */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Your Comments & Review *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share details about price differences, delivery speed, or packaging..."
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified community submission
                    </span>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      Post Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'er_unified', label: 'ER App' },
                { id: 'blinkit', label: 'Blinkit' },
                { id: 'zepto', label: 'Zepto' },
                { id: 'swiggy', label: 'Swiggy' },
                { id: 'bigbasket', label: 'BigBasket' },
                { id: 'jiomart', label: 'JioMart' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    selectedFilter === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] text-slate-400">
              Showing {filteredReviews.length} reviews
            </span>
          </div>

          {/* Reviews List */}
          <div className="space-y-3">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-2.5 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-200">
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {rev.author}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="flex text-amber-500">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400">• {rev.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {rev.platformTag === 'er_unified' ? (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                        ER Unified
                      </span>
                    ) : (
                      <PlatformBadge platformId={rev.platformTag} size="sm" />
                    )}

                    {rev.verifiedBuyer && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px]">
                  <div className="flex flex-wrap gap-1">
                    {rev.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onHelpfulVote(rev.id)}
                    className="flex items-center gap-1 text-slate-500 hover:text-emerald-700 font-semibold transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>ER Feedback Policy: Authentic verified dark store shopper reviews</span>
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
