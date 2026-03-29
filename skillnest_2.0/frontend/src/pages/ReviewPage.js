import React from "react";
import AddReview from "../components/AddReview";
import ReviewList from "../components/ReviewList";

function ReviewPage() {

  return (

    <div>

      <h2 className="mb-4">Service Reviews</h2>

      <div className="row">

        {/* ADD REVIEW SECTION */}
        <div className="col-md-5">

          <div className="card p-3 shadow">

            <h5 className="mb-3">Add Review</h5>

            <AddReview />

          </div>

        </div>

        {/* REVIEW LIST SECTION */}
        <div className="col-md-7">

          <div className="card p-3 shadow">

            <h5 className="mb-3">All Reviews</h5>

            <ReviewList />

          </div>

        </div>

      </div>

    </div>

  );

}

export default ReviewPage;
