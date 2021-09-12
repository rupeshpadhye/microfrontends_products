import React from 'react';
import { Rate } from 'antd';
import styles from './css/Review.module.css';

const ReviewRow = ({ rating, note }) => {
    return (
      <li className={styles.reviewRow}>
        <Rate allowHalf defaultValue={rating} disabled />
        <b>{rating}</b>
        <p>{note}</p>
      </li>
    );
  };
  
  const Reviews = ({ reviews }) => {
    return (
      <div className=''>
        <h2>Reviews</h2>
        <ul className={styles.reviewList}>
          {reviews.map((r, index) => (
            <ReviewRow key={`review-${index}`} {...r} />
          ))}
        </ul>
      </div>
    );
  };

export default Reviews;