export default function TimeframeSelector({ onChange }) {
  return (
    <div className="my-4">
      <label className="mr-2">Select Time Frame:</label>
      <select onChange={(e) => onChange(e.target.value)} className="p-2 border rounded">
        <option value="5">Last 5 min</option>
        <option value="15">Last 15 min</option>
        <option value="30">Last 30 min</option>
        <option value="60">Last 60 min</option>
      </select>
    </div>
  );
}
