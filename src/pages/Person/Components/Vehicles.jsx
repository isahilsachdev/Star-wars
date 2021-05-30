import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../index.css';
const Vehicles = ({ vehicles }) => {
  const [vehiclesData, setVehiclesData] = useState([]);

  // find info for all vehicles
  useEffect(() => {
    async function fetchAll() {
      setVehiclesData(
        await Promise.all(
          vehicles?.map((url) => axios.get(url).then((r) => r.data))
        )
      );
    }
    vehicles && fetchAll();
  }, [vehicles]);

  return (
    <div className='background-image'>
      {vehiclesData.length ? <h1 className='text-shadow'>Vehicles</h1> : null}
      <div className='box-container-row'>
        {vehiclesData?.map((vehicle, i) => (
          <div
            key={i}
            style={{ backgroundImage: 'url(/Images/vehicles.jpeg)' }}
            className='box-container background-image '
          >
            <div className='box-head'>
              <h2>{vehicle.name}</h2>
            </div>
            <div className='box-content'>
              <div>
                <span>Model :</span>
                <p>{vehicle.model}</p>
              </div>

              <div>
                <span>Class : </span>
                <p>{vehicle.vehicle_class}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
