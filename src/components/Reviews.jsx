import { REVIEWS, REVIEWS_ARE_SAMPLE, unsplash } from "../data.js";
import { useReveal } from "../hooks.js";

function Review({ review, feature }) {
  const [ref, cls] = useReveal();
  return (
    <figure ref={ref} className={`review${feature ? " review--feature" : ""} ${cls}`}>
      <div className="review__home">
        <img src={unsplash(review.photo, 640, 400)} alt="" loading="lazy" />
      </div>
      <div className="review__body">
        <div className="review__photo" aria-hidden="true">{review.initial}</div>
        <blockquote>“{review.quote}”</blockquote>
        <figcaption><b>{review.name}</b><span>{review.plan}</span></figcaption>
      </div>
    </figure>
  );
}

export default function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviewsTitle">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow">รีวิวจากลูกค้า</p>
          <h2 id="reviewsTitle">ความสุขของครอบครัวใบบุญ</h2>
        </div>
        <div className="reviews__grid">
          {REVIEWS.map((r, i) => <Review key={i} review={r} feature={i === 1} />)}
        </div>
      </div>
    </section>
  );
}
