import React from "react";

function SingleCar(props) {
  const aCar = props.car;
  console.log("look here", aCar);
  return (
    <div className="col-md-3">
      <div
        className="card h-100 rounded-3 shadow-sm"

        // value={id}
      >
        <div className="card-body">
          <h5 className="card-title">{aCar.make}</h5>
          <p className="card-text">{aCar.model}</p>
          <p className="card-text">{aCar.year}</p>
        </div>
      </div>
    </div>
  );
}
export default SingleCar;
