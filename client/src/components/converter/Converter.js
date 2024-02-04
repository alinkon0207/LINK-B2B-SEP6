/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./Converter.css";

const Converter = ({ width }) => {
  const [converter, setConverter] = useState({
    sending: 468.4,
    receiving: 193852.16,
    rate: 415.94,
    fees: 2.34,
    arrival: "Instant",
  });
  const [sendInput, setSendInput] = useState(468.4);

  return (
    <div className={`bg-primary rounded-lg px-4 py-8 ${width} mx-auto`}>
      {/* Top */}
      <div className="bg-white flex items-center justify-between py-1 px-3 rounded-lg">
        <div className="text-slate-700">
          <p className="text-lg">You send</p>
          <input
            type="number"
            name=""
            min="0"
            value={sendInput}
            className="outline-none text-xl font-medium"
            onChange={(event) => setSendInput(event.target.value)}
          />
        </div>
        <div className="py-3 pl-4  border-l border-gray-800">
          <select name="" id="" className="outline-none">
            <option value="">USD</option>
          </select>
        </div>
      </div>

      {/* Middle */}
      <div className="text-white font-normal flex justify-around py-5 border-l ml-14 relative">
        <div className="text-md space-y-7">
          <h2>{`$${converter.rate}`}</h2>
          <h2>{`$${converter.fees}`}</h2>
          <h2>{`${converter.arrival}`}</h2>
        </div>
        <div className="text-md space-y-7">
          <h1>Our current rate</h1>
          <h1>Fees</h1>
          <h1>Estimated arrival</h1>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-white flex items-center justify-between py-1 px-3 rounded-lg">
        <div className="text-slate-700">
          <p className="text-lg ">Recieve</p>
          <h1 className="text-xl font-medium">{converter.receiving}</h1>
        </div>
        <div className="py-3 pl-4  border-l border-gray-800">
          <select name="" id="" className="outline-none">
            <option value="">NGN</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Converter;
