
'use client';

import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reviews = [
  {
    id: 1,
    name: 'James Wilson',
    location: 'Northampton',
    date: '2 weeks ago',
    rating: 5,
    text: 'Excellent service from start to finish. They arrived on time, quickly identified the leaking pipe, and fixed everything at a fair price. Would definitely recommend!',
    initials: 'JW',
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    location: 'Salford',
    date: '1 month ago',
    rating: 5,
    text: 'Our boiler stopped working on a cold morning. The plumber was professional, explained the issue clearly, and got our heating working again. Really happy with the service.',
    initials: 'ST',
  },
  {
    id: 3,
    name: 'David Roberts',
    location: 'Stockport',
    date: '3 weeks ago',
    rating: 5,
    text: 'Great experience having our bathroom taps and shower replaced. Everything was completed neatly, and the work area was left spotless.',
    initials: 'DR',
  },
  {
    id: 4,
    name: 'Emma Johnson',
    location: 'Oldham',
    date: '1 week ago',
    rating: 5,
    text: 'Called about a blocked kitchen sink and received a quick response. The problem was sorted efficiently, and the pricing was explained before work started.',
    initials: 'EJ',
  },
  {
    id: 5,
    name: 'Michael Brown',
    location: 'Rochdale',
    date: '2 months ago',
    rating: 5,
    text: 'Very pleased with the radiator repairs. The plumber was knowledgeable, arrived when promised, and made sure everything was working properly before leaving.',
    initials: 'MB',
  },
  {
    id: 6,
    name: 'Olivia Taylor',
    location: 'Bury',
    date: '3 weeks ago',
    rating: 5,
    text: 'Professional, helpful, and easy to deal with. They fixed our leaking toilet and replaced a faulty valve without any hassle.',
    initials: 'OT',
  },
  {
    id: 7,
    name: 'Daniel Harris',
    location: 'Northampton',
    date: '1 month ago',
    rating: 5,
    text: 'We needed a new kitchen tap fitted and a small leak repaired. Everything was done in one visit, and the work was clean and tidy.',
    initials: 'DH',
  },
  {
    id: 8,
    name: 'Sophie Williams',
    location: 'Salford',
    date: '2 weeks ago',
    rating: 5,
    text: 'Really helpful service when our shower started leaking. The issue was explained clearly, and the repair was completed without any mess.',
    initials: 'SW',
  },
  {
    id: 9,
    name: 'Peter Clarke',
    location: 'Stockport',
    date: '3 weeks ago',
    rating: 5,
    text: "Our radiator wasn't heating properly. The plumber checked the system, identified the problem, and got it working again. Very straightforward service.",
    initials: 'PC',
  },
  {
    id: 10,
    name: 'Lucy Martin',
    location: 'Oldham',
    date: '1 month ago',
    rating: 5,
    text: 'We had a new bathroom basin and taps installed. Communication was clear throughout, and the finished work looked great.',
    initials: 'LM',
  },
  {
    id: 11,
    name: 'Andrew Walker',
    location: 'Rochdale',
    date: '2 months ago',
    rating: 5,
    text: 'Quick response to a leaking pipe under our kitchen sink. The repair was handled professionally, and everything was checked before the plumber left.',
    initials: 'AW',
  },
  {
    id: 12,
    name: 'Rachel Evans',
    location: 'Bury',
    date: '3 weeks ago',
    rating: 5,
    text: 'Friendly and professional service. Our toilet flush was repaired, the price was explained beforehand, and the job was completed efficiently.',
    initials: 'RE',
  },
];

export default function ReviewsSection() {
  return (
    <section
      className="reviews-section"
      id="reviews"
      aria-labelledby="reviews-title"
    >
      <div className="reviews-container">
        <div className="reviews-heading">
          <div>
            <span className="reviews-eyebrow">
              CUSTOMER TESTIMONIALS
            </span>

            <h2 id="reviews-title">Trusted by Homeowners</h2>

            <p>
              See what customers say about our plumbing and heating
              services.
            </p>
          </div>

          <div className="reviews-controls">
            <button
              type="button"
              className="reviews-arrow reviews-prev"
              aria-label="Previous review"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              className="reviews-arrow reviews-next"
              aria-label="Next review"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation={{
            prevEl: '.reviews-prev',
            nextEl: '.reviews-next',
          }}
          pagination={{
            el: '.reviews-pagination',
            clickable: true,
          }}
          spaceBetween={24}
          slidesPerView={1}
          loop
          speed={500}
          grabCursor
          watchOverflow
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="reviews-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <article className="review-card">
                <div className="review-card-top">
                  <div
                    className="review-stars"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={17}
                          fill="currentColor"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      ),
                    )}
                  </div>

                  <Quote
                    className="review-quote-icon"
                    size={30}
                    aria-hidden="true"
                  />
                </div>

                <p className="review-text">"{review.text}"</p>

                <div className="review-footer">
                  <div className="review-avatar" aria-hidden="true">
                    {review.initials}
                  </div>

                  <div className="review-customer">
                    <h3>{review.name}</h3>
                    <span>{review.location}</span>
                  </div>

                  <span className="review-date">{review.date}</span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="reviews-bottom">
          <div
            className="reviews-pagination"
            aria-label="Review pagination"
          />
        </div>
      </div>
    </section>
  );
}
