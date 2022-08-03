import React, { useState } from "react";
import SingleCar from "./SingleCar";

function Cars() {
  const [data, setData] = useState({
    cars: [
      {
        id: 1,
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        id: 2,
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        id: 3,
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        id: 4,
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        id: 5,
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        id: 6,
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        id: 7,
        make: "Toyota",
        model: "Camry",
        year: 2021,
      },
      {
        id: 8,
        make: "Ford",
        model: "Mustang",
        year: 2019,
      },
      {
        id: 9,
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        id: 10,
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        id: 11,
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
    carsRendered: [],
  });
  const [showCard, setShowCard] = useState(false);

  const mapCar = (aCar) => {
    return <SingleCar car={aCar} key={aCar.id} />;
  };

  //   useEffect(() => {
  //     renderCars();
  //   }, []);
  //   const renderCars = () => {
  //     setData((prevState) => {
  //       const pd = { ...prevState };
  //       const carsArray = data.cars;
  //       pd.carsRendered = carsArray.map(mapCar);
  //       console.log("this", pd.carsRendered);
  //       return pd;
  //     });
  //   };

  const onShowCarsClicked = (e) => {
    e.preventDefault();
    console.log("click me");
    setData((prevState) => {
      const pd = { ...prevState };
      const carsArray = data.cars;
      pd.carsRendered = carsArray.map(mapCar);
      console.log("this", pd.carsRendered);
      return pd;
    });
    return setShowCard(!showCard);
  };

  const on2018Clicked = (e) => {
    e.preventDefault();
    const filter2018CarYear = (car) => {
      let result = false;

      if (car.year === 2018) {
        result = true;
      }
      return result;
    };
    setData((prevState) => {
      const pd = { ...prevState };
      const carsArray = data.cars;
      const filteredCars = carsArray.filter(filter2018CarYear);
      pd.carsRendered = filteredCars.map(mapCar);
      console.log("this", pd.carsRendered);
      return pd;
    });
    return setShowCard(showCard);
  };
  const on2019Clicked = (e) => {
    e.preventDefault();
    const filter2019CarYear = (car) => {
      let result = false;

      if (car.year === 2019) {
        result = true;
      }
      return result;
    };
    setData((prevState) => {
      const pd = { ...prevState };
      const carsArray = data.cars;
      const filteredCars = carsArray.filter(filter2019CarYear);
      pd.carsRendered = filteredCars.map(mapCar);
      console.log("this", pd.carsRendered);
      return pd;
    });
    return setShowCard(showCard);
  };
  const on2020Clicked = (e) => {
    e.preventDefault();
    const filter2020CarYear = (car) => {
      let result = false;

      if (car.year === 2020) {
        result = true;
      }
      return result;
    };
    setData((prevState) => {
      const pd = { ...prevState };
      const carsArray = data.cars;
      const filteredCars = carsArray.filter(filter2020CarYear);
      pd.carsRendered = filteredCars.map(mapCar);
      console.log("this", pd.carsRendered);
      return pd;
    });
    return setShowCard(showCard);
  };
  const on2021Clicked = (e) => {
    e.preventDefault();
    const filter2021CarYear = (car) => {
      let result = false;

      if (car.year === 2021) {
        result = true;
      }
      return result;
    };
    setData((prevState) => {
      const pd = { ...prevState };
      const carsArray = data.cars;
      const filteredCars = carsArray.filter(filter2021CarYear);
      pd.carsRendered = filteredCars.map(mapCar);
      console.log("this", pd.carsRendered);
      return pd;
    });
    return setShowCard(showCard);
  };

  return (
    <React.Fragment>
      <h1>Cars</h1>
      <div className="container student">
        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              id="showCars"
              className="btn btn-danger"
              onClick={onShowCarsClicked}
            >
              Show Cars
            </button>
            {"       "}
            <button
              type="button"
              id="show-2018-cars"
              className="btn btn-info"
              onClick={on2018Clicked}
            >
              2018 Cars
            </button>{" "}
            <button
              type="button"
              id="show-2019-cars"
              className="btn btn-info"
              onClick={on2019Clicked}
            >
              2019 Cars
            </button>
            {"  "}
            <button
              type="button"
              id="show-2020-cars"
              className="btn btn-info"
              onClick={on2020Clicked}
            >
              2020 Cars
            </button>{" "}
            <button
              type="button"
              id="show-2021-cars"
              className="btn btn-info"
              onClick={on2021Clicked}
            >
              2021 Cars
            </button>
          </div>

          <div className="col-2"></div>
        </div>
        {/*<h3 onClick={onHeaderClicked}>Rendering {count}</h3>*/}
        <div className="row">{showCard && data.carsRendered} </div>
      </div>
    </React.Fragment>
  );
}
export default Cars;
