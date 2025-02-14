import { apiClient } from "@api/apiClient";
import { endpoints } from "@api/endpoints";
import ErrorAlert from "@pages/errorPages/errorAlert";
import { ErrorFormatter } from "@pages/errorPages/ErrorFormatter";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const PieProfileChart = () => {

   const [data, setData] = useState([]);
   const [error, setError] = useState(null);

     useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await apiClient.get(endpoints.getProfilePieChart);
           setData(response.data);
           setError(null)
         } catch (error) {
           setError(ErrorFormatter(error));
         }
       };
       fetchData();

     }, []);

  return (
      <div className=" w-full lg:w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col  ">
           {error && <ErrorAlert message={error} />}
        <strong className="text-gray-700 font-medium" >Guest &apos;s Profile</strong>
        <div className="w-full mt-3 flex-1 text-sm ">
            <ResponsiveContainer width='100%' height='100%' >
                <PieChart width={400} height={300} >
                   <Pie data={data} 
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"

            dataKey="value" >
                  {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
                      
                   </Pie>
                   <Legend/>

                </PieChart>

            </ResponsiveContainer>

        </div>
        </div>
  )
}

export default PieProfileChart