export default function ChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] text-white rounded-lg px-3 py-2 text-xs shadow-lg">
        <div className="font-medium mb-0.5">{label}</div>
        <div className="text-[#A5B4FC]">{payload[0].value}</div>
      </div>
    );
  }
  return null;
}
