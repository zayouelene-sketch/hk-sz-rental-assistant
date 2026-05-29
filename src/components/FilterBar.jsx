import { Clock3, MapPin, TrainFront } from "lucide-react";

export default function FilterBar({ selectedSchool, selectedPort, commuteLabel, onOpenFilter }) {
  const filters = [
    {
      icon: MapPin,
      label: selectedSchool.locationLabel,
      value: selectedSchool.name,
      tone: "green",
      type: "school"
    },
    {
      icon: TrainFront,
      label: "深圳口岸",
      value: selectedPort.name,
      tone: "blue",
      type: "port"
    },
    {
      icon: Clock3,
      label: "通勤时间",
      value: commuteLabel,
      tone: "orange",
      type: "commute"
    }
  ];

  return (
    <section className="filter-bar" aria-label="commuting filters">
      {filters.map(({ icon: Icon, label, value, tone, type }) => (
        <button className="filter-item filter-button" key={type} type="button" onClick={() => onOpenFilter(type)}>
          <span className={`filter-icon ${tone}`}>
            <Icon size={18} />
          </span>
          <div>
            <p>{label}</p>
            <strong>{value}</strong>
          </div>
        </button>
      ))}
    </section>
  );
}
