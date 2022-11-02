export default function Pill(props) {
  return (
    <div
      className={`${props.textColor} ${props.bgColor} ${props.className} h-fit px-3 py-0.5 rounded-lg`}
    >
      {props.icon}
      {props.text}
    </div>
  );
}
