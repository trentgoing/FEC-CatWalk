import React, { useState } from 'react';
import axios from 'axios';

const IndividualReviews = (props) => {
  let data = props.reviewId;
  const [howHelpful, sethowHelpful] = useState(data.helpfulness);
  const [
    checkIfAlreadyPressedHelpful,
    setCheckIfAlreadyPressedHelpful,
  ] = useState(false);

  return (
    <div>
      <div className='placeHolder'>
        {/* <StarIndicator starData={data.rating} /> */}
      </div>
      {userNameDiv(data)}
      <div className='placeHolder'>
        <p className='placeHolder'>{data.summary}</p>
        <p className='placeHolder'>{data.body}</p>
      </div>
      {checkIfResponses(data.response)}
      <div>
        <p className='placeHolder'>Helpful?</p>
        <div
          className='placeHolder'
          type='button'
          onClick={() => {
            if (checkIfAlreadyPressedHelpful) {
              return;
            } else {
              let reviewID = data.review_id;
              handleReviewHelpful(reviewID, true);
              setCheckIfAlreadyPressedHelpful(true);
              sethowHelpful((prevCount) => prevCount + 1);
            }
          }}
        >
          Yes({howHelpful}) |
        </div>
        <div
          className='placeHolder'
          type='button'
          onClick={() => {
            let reviewID = data.review_id;
            handleReviewHelpful(reviewID, false);
          }}
        >
          Report
        </div>
      </div>
    </div>
  );
};

const checkIfResponses = (data) => {
  if (data !== null && data.length > 0) {
    return (
      <div className='placeHolder'>
        <p className='placeHolder'>Response:</p>
        <p className='placeHolder'>${data}</p>
      </div>
    );
  } else {
    return;
  }
};


const userNameDiv = (data) => {
  let checkMark = false;
  if (data.reccomend === 1) {
    checkMark = true;

    // NEED TO ADD FUNCTIONALITY TO LINE 83
  }

  if (data.reviewer_name) {
    return (
      <div>
        <p>
          {data.reviewer_name} {data.date}
        </p>
      </div>
    );
  }

  if (!data.reviewer_name) {
    return (
      <div>
        <p>cognito {data.date}</p>
      </div>
    );
  }
};

const handleReviewHelpful = (reviewID, trueOrFalse) => {
  if (trueOrFalse) {
    axios
      .put(`http://18.224.37.110/reviews/${reviewID}/helpful`)
      .then((response) => {
        console.log('success', response);
      })
      .catch((err) => {
        console.log('error marking answer helpful', err);
      });
  }
  if (!trueOrFalse) {
    axios
      .put(`http://18.224.37.110/reviews/${reviewID}/report/`)
      .then((response) => {
        console.log('success', response);
      })
      .catch((err) => {
        console.log('error marking answer helpful', err);
      });
  }
};

IndividualReviews.propTypes = {};

export default IndividualReviews;
