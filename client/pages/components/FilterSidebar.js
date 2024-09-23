import React, { useState } from "react";
import { Input, Checkbox, RadioGroup, Radio, DatePicker, SelectPicker } from "rsuite";
import 'rsuite/dist/rsuite.min.css';

const FilterSidebar = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [arrivalTime, setArrivalTime] = useState('');
  const [stops, setStops] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCheckboxChange = (value, checked) => {
    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== value));
    }
  };

  return (
    <aside className=" md:w-full w-full lg:w-1/4 pt-4 pl-2">
      <div className="w-full p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Sort by:</h3>
        <SelectPicker
          data={[
            { label: 'Lowest Price', value: 'lowest' },
            { label: 'Highest Price', value: 'highest' },
            { label: 'Earliest Arrival', value: 'earliest' },
            { label: 'Latest Arrival', value: 'latest' }
          ]}
          size="lg"
          style={{ width: "100%"}}
          placeholder="Sort by"
          value={sortBy}
          onChange={setSortBy}
        />

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Select Date</h3>
          <DatePicker
            format="yyyy-MM-dd"
            value={selectedDate}
            onChange={setSelectedDate}
            style={{ width: "100%",backgroundColor: "white",borderRadius: "6px" }}
            size="lg" 
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Arrival Time</h3>
          <RadioGroup
            value={arrivalTime}
            onChange={setArrivalTime}
          >
            <Radio value="morning">5:00 AM - 11:59 AM</Radio>
            <Radio value="afternoon">12:00 PM - 5:59 PM</Radio>
            <Radio value="evening">6:00 PM - 11:59 PM</Radio>
            <Radio value="night">12:00 AM - 4:59 AM</Radio>
          </RadioGroup>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Stops</h3>
          <RadioGroup
            value={stops}
            onChange={setStops}
          >
            <Radio value="nonstop">Nonstop</Radio>
            <Radio value="1stop">1 Stop</Radio>
            <Radio value="2stops">2+ Stops</Radio>
          </RadioGroup>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Airlines Included</h3>
          {["Alitalia", "Lufthansa", "Air France", "Emirates", "British Airways"].map((airline) => (
            <Checkbox 
              key={airline}
              value={airline} 
              onChange={(checked) => handleCheckboxChange(airline, checked)}
              className={`${
                checkedItems.includes(airline) ? "bg-purple-100 border-purple-500" : ""
              }`}>
              {airline}
            </Checkbox>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
