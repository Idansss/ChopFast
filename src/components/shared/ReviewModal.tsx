"use client";
import { useState } from "react";
import { X, Star } from "lucide-react";

interface Props {
  restaurantName: string;
  orderId: string;
  onClose: () => void;
}

export default function ReviewModal({ restaurantName, orderId: _orderId, onClose }: Props) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!rating) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 id="review-modal-title" className="font-bold text-[#1A1A2E] text-base">
              Rate your order
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{restaurantName}</p>
          </div>
          <button
            type="button"
            aria-label="Close review modal"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🙌</div>
            <p className="font-bold text-[#1A1A2E] text-lg">Thank you for your review!</p>
            <p className="text-sm text-gray-400 mt-1">Your feedback helps others choose great food.</p>
          </div>
        ) : (
          <div className="p-5 space-y-5">
            {/* Star selector */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                How was your experience?
              </p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          filled
                            ? "fill-[#FFB800] text-[#FFB800]"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm font-semibold text-[#FF5A1F] mt-2">
                  {["", "Poor", "Fair", "Good", "Great", "Excellent!"][rating]}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="review-comment"
                className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2"
              >
                Comments <span className="font-normal normal-case text-gray-400">(optional)</span>
              </label>
              <textarea
                id="review-comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience…"
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!rating}
              className="w-full bg-[#FF5A1F] text-white py-3.5 rounded-2xl font-bold hover:bg-[#e8430a] transition-all shadow-lg shadow-[#FF5A1F]/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Submit review
            </button>
          </div>
        )}
      </div>
    </>
  );
}
