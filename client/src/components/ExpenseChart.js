// this component draws a colorful pie chart 🍕
import "./ExpenseChart.css";           // Loads the css file
import {            
  PieChart,        // Creates the chart area.           
  Pie,             // Creates the actual pizza slices.
  Cell,              // Assigns colors to individual slices.
  Tooltip,           // Shows details when hovering
  Legend,           // Shows category names.
  ResponsiveContainer,  //Makes the chart responsive,Automatically adjusts for Desktop and Mobile screen.
} from "recharts";   //Recharts : Because React cannot create charts by itself. Recharts provides ready-made chart components.

const COLORS = [
  "#7c77df", // Indigo
  "#92e0c6", // Emerald
  "#b9a2ef", // Amber                  //Stores colors used for pie slices.
  "#edb5b5", // Red
  "#ea81ce", // Pink
  "#8B5CF6", // Violet
];

function ExpenseChart({ expenses = [] }) {     //Receives expense data from App.js.
  const safeExpenses = Array.isArray(expenses) ? expenses : [];  //Prevents application crashes.when expense=null or undefined.

  const categoryData = safeExpenses.reduce((acc, item) => {  //Groups expenses by category and totals the amount.
    const category = item.category || "Other";   //If category is missing:Then:"Other"will be used.
    const amount = Number(item.amount || 0);    //Converts text values into numbers.

    acc[category] = (acc[category] || 0) + amount;
    return acc;      // Returns the updated category totals.
  }, {});

  //Convert Data for Recharts 
  const data = Object.keys(categoryData).map((key) => ({    // tooltip key:value
    name: key,
    value: categoryData[key],
  }));

  return (
    <div className="chart-container">   // Applies styles from:
      <h3 className="chart-title">
  Category Wise Expenses                     //Displays chart heading.
</h3>

      {data.length === 0 ? (        //Empty Data Check
        <p>No data available</p>    //If no expenses exist:No data available is displayed instead of an empty chart.
      ) : (
        <ResponsiveContainer width="100%" height="100%">    // Makes chart fit available space.
          <PieChart>                                          //Creates the chart canvas.
            <Pie
              data={data}                       //Provides chart data.
              dataKey="value"
              nameKey="name"
              outerRadius={90}                   //Controls chart size. 
              labelLine={true}
              label={({ name, percent }) =>                         //displayed around the chart.
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}   //Assigns colors to slices.
                />
              ))}
            </Pie>

            <Tooltip />             //Displays information when hovering over a slice.

            <Legend
              verticalAlign="bottom"            //Displays category names below the chart.
              wrapperStyle={{
                bottom: -24,               //Moves the legend slightly downward to improve spacing.
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseChart;      // Allows the component to be imported into App.js.