import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Dot,
} from "recharts";

function CustomDot(props) {
  const { cx, cy } = props;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#fff"
      stroke="#8B5CF6"
      strokeWidth={2}
    />
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload) return null;

  return (
    <div
      style={{
        background: "#0D1729",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: "8px",
        padding: "8px 12px",
        color: "#CBD5E1",
      }}
    >
      {payload[0].value}°
    </div>
  );
}

export default function HourlyTemperatureChart({ forecast, timezone }) {
  const data = forecast.map((item) => ({
    time: new Date((item.dt + timezone) * 1000).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),

    temp: Math.round(item.main.temp),
  }));

  return (
    <ResponsiveContainer className="chart" width="100%" height={80}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <XAxis
          dataKey="time"
          tick={{
            fill: "#94A3B8",
            fontSize: 12,
          }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />

        <Tooltip cursor={false} content={<CustomTooltip />} />

        <Line
          type="monotone"
          dataKey="temp"
          stroke="#8B5CF6"
          strokeWidth={3}
          dot={<CustomDot />}
          activeDot={{
            r: 6,
            fill: "#fff",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
