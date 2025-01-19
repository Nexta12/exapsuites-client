
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [

    {name: 'Jan',
        Expense: 4000,
        Income: 2400
    },
    {name: 'Feb',
        Expense: 1000,
        Income: 1400
    },
    {name: 'Mar',
        Expense: 1060,
        Income: 2400
    },
    {name: 'Apr',
        Expense: 300,
        Income: 2400
    },
    {name: 'May',
        Expense: 1600,
        Income: 2400
    },
    {name: 'Jun',
        Expense: 1000,
        Income: 400
    },
    {name: 'Jul',
        Expense: 1000,
        Income: 200
    },
    {name: 'Aug',
        Expense: 100,
        Income: 2400
    },
    {name: 'Sep',
        Expense: 1600,
        Income: 2400
    },
    {name: 'Oct',
        Expense: 1050,
        Income: 2800
    },
    {name: 'Nov',
        Expense: 1000,
        Income: 200
    },
    {name: 'Dec',
        Expense: 800,
        Income: 2500
    },
]


const TransactionCharts = () => {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1 ">
    <strong className="text-gray-700 font-medium" >Transactions</strong>
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
  )
}

export default TransactionCharts