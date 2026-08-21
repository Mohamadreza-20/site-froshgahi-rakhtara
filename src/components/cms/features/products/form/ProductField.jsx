export default function ProductField({ id, label, type = "text", value, onChange, placeholder, required = false, min, children, ...props }) {
  return <div><label htmlFor={id} className="block text-sm font-medium text-[#374151] mb-1.5">{label}</label>{children ?? <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} min={min} className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEF0F5] text-sm outline-none focus:border-[#6C63FF] transition bg-white" {...props} />}</div>;
}
