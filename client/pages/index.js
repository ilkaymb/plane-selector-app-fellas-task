import { Inter } from "next/font/google";
import { useState, useEffect, use } from "react";

import {
  DatePicker,
  Pagination,
  SelectPicker,
} from "rsuite";

import PlaneCard from "./components/PlaneCard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import { IoCarOutline } from "react-icons/io5";
import { LiaHotelSolid } from "react-icons/lia";
import { MdOutlineBeachAccess } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(3);
  const startIndex = (activePage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentFlights = filteredFlights.slice(startIndex, endIndex);
  const [flights, setFlights] = useState([]);
  const [isOneWay, setIsOneWay] = useState(false);
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState([]);

  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().split('T')[0]);

  const convertToDateString = (dateString) => {
    const date = new Date(dateString); // Datepicker'dan gelen string'i Date objesine çevir
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Aylar 0-11 arasında olduğu için +1 yapıyoruz
    const day = String(date.getDate()).padStart(2, '0'); // Günü 2 haneli olarak alıyoruz
  
    return `${year}-${month}-${day}`; // YYYY-MM-DD formatında birleştiriyoruz
  };

 // departure seçildiğinde scheduleDate'i güncelle
useEffect(() => {
  if (startDate) {
    // Eğer departure bir tarih formatındaysa, bu şekilde eşitleyebilirsin
    setScheduleDate(convertToDateString(startDate));
  } else {
    // Departure boşsa bugünün tarihini varsayılan olarak ayarla
    setScheduleDate(new Date().toISOString().split('T')[0]);
  }
}, [startDate]);
const fetchFlights = async () => {
  try {

    const response = await fetch(`http://localhost:3001/flights?scheduleDate=${scheduleDate}`);
 
    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }
    const data = await response.json();
    setFlights(data.flights);
    setFilteredFlights(data.flights); // Başlangıçta tüm uçuşları göster
  } catch (err) {
    setError(err.message);
  }
};
// scheduleDate değiştiğinde uçuşları çek
useEffect(() => {
 

  if (scheduleDate) {
    fetchFlights();
  }
}, [scheduleDate]);

// handleSearch fonksiyonunu kullanarak manuel arama yapabilirsin
const handleSearch = () => {
  fetchFlights();
};


  return (
    <main className={`flex min-h-screen flex-col items-center justify-start bg-gray-200 ${inter.className}`}>
      <Header />
      <section id="content" className="flex flex-col lg:flex-row w-full p-4 lg:p-8">
        <div className="flex-grow w-full">
          <div className="w-full border-2 bg-white border-gray-200 py-6 px-4 rounded-3xl">
            <div className="flex w-full justify-between items-center pb-4">
              <span className="text-2xl font-bold text-purple-800 uppercase underline-offset-4 mb-5">
                BOOK YOUR FLIGHT
              </span>
              <div className="flex">
                <button
                  onClick={() => setIsOneWay(true)}
                  className={`px-4 py-4 rounded-l-full ${isOneWay ? 'bg-purple-800 text-white' : 'bg-gray-200 text-purple-800'}`}
                >
                  One way
                </button>
                <button
                  onClick={() => setIsOneWay(false)}
                  className={`px-4 py-4 rounded-r-full ${!isOneWay ? 'bg-purple-800 text-white' : 'bg-gray-200 text-purple-800'}`}
                >
                  Round trip
                </button>
              </div>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-start gap-2">
              <div className="flex-grow w-full">
                <SelectPicker
                  placeholder="Departure Country"
                  className="w-full"
                  size="lg"
                  data={destinations.filter(destination => destination.city).map(destination => ({
                    label: destination.country,
                    value: destination.country
                  }))}
                  onChange={(value) => setDeparture(value)}
                />
              </div>
              <div className="flex-grow w-full">
                <SelectPicker
                  placeholder="Arrival Country"
                  className="w-full"
                  size="lg"
                  data={destinations.filter(destination => destination.city).map(destination => ({
                    label: destination.country,
                    value: destination.country
                  }))}
                  onChange={(value) => setArrival(value)}
                />
              </div>
              <div className="flex-grow w-full lg:w-1/2">
                <DatePicker
                  className="w-full bg-white mb-4"
                  size="lg"
                  format="MM/dd/yyyy"
                  onChange={(value) => setStartDate(value)}
                />
              </div>
              <div className="flex-grow w-full lg:w-1/2">
                <DatePicker
                  size="lg"
                  format="MM/dd/yyyy"
                  className="bg-white w-full"
                  onChange={(value) => setEndDate(value)}
                  disabled={isOneWay}
                />
              </div>
            </form>
            <button
              className="bg-purple-800 font-bold text-lg text-white px-5 py-3 h-full w-full lg:w-40 rounded-md"
              type="button"
              onClick={handleSearch}
            >
              Show Flights
            </button>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full md:w-full lg:w-3/4 pt-4 pr-2">
              <ul>
                {currentFlights.map((flight, index) => (
                  <PlaneCard flight={flight} key={index} />
                ))}
              </ul>
              {currentFlights.length === 0 && (
                <div className="text-center text-2xl font-bold text-red-500">
                  Uçuş bulunamadı
                </div>
              )}
              <div className="w-full border-2 bg-white">
                <Pagination
                  size="lg"
                  prev
                  next
                  first
                  last
                  ellipsis
                  total={filteredFlights.length}
                  limit={limit}
                  maxButtons={5}
                  activePage={activePage}
                  onChangePage={setActivePage}
                  onChangeLimit={setLimit}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "2rem",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <FilterSidebar />
          </div>
        </div>
        <aside className="sm:w-full md:w-full lg:w-80 pl-0 lg:pl-4 pt-4 lg:pt-0">
          <div className="grid grid-cols-1 gap-4">
            <div className="w-full h-64 bg-orange-300 rounded-3xl p-6 flex items-start justify-end text-2xl font-bold text-white flex-col">
              <IoCarOutline size={"40px"} />CAR RENTALS
            </div>
            <div className="w-full h-64 bg-blue-300 rounded-3xl p-6 flex items-start justify-end text-2xl font-bold text-white flex-col">
              <LiaHotelSolid size={"40px"} />HOTELS
            </div>
            <div className="w-full h-64 bg-green-300 rounded-3xl p-6 flex items-start justify-end text-2xl font-bold text-white flex-col">
              <MdOutlineBeachAccess size={"40px"} />TRAVEL PACKAGES
            </div>
          </div>
        </aside>
      </section>
      <Footer />
    </main>
  );
}
