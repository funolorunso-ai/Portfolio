import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !comment) {
      alert('Please fill in name, email, and comment.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, rating, comment }),
      });

      if (response.ok) {
        alert('Review submitted!');
        setName('');
        setEmail('');
        setRating(5);
        setComment('');
        fetchReviews();
      } else {
        alert('Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8 animate-fade-in">Reviews</h1>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-8 transform transition-all duration-500 hover:shadow-xl border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Leave a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num} className="bg-gray-700 text-white">
                    {'★'.repeat(num) + '☆'.repeat(5 - num)}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300 resize-none"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Existing Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to leave one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-600 rounded-lg bg-gray-700 hover:bg-gray-600 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  <h3 className="font-semibold text-white mb-2">{review.name}</h3>
                  <p className="text-yellow-500 text-lg mb-2">{renderStars(review.rating)}</p>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;