import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";



const TransactionCharts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear(); // Get the current year
  const startYear = 2025; // Starting year
   // Generate an array of years from 2025 to the previous year (exclude current year)
   const years = Array.from(
    { length: currentYear - startYear },
    (_, i) => startYear + i
  );

  const [year, setYear] = useState(startYear); 

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await apiClient.get(`${endpoints.getTransactionChartData}?year=${year}`);
        setData(response.data);
        setError(null)
      } catch (error) {
        setError(ErrorFormatter(error));
      }
    };
    fetchDate();
  }, [year]);



  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 ">
              {error && <ErrorAlert message={error} />}
      <div className="flex items-center justify-between">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div>
      <h1 className="font-primary text-accent">Year: {year}</h1>
      {/* Add a dropdown or input to allow the user to change the year */}
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
    </div>
      <div className="w-full mt-3 flex-1 text-sm ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#8884d8" />
            <Bar dataKey="Expense" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionCharts;
