export default function Button(props) {
  const textColor = props.textColor;
  const bgColor = props.bgColor;
  return (
    <div className="flex flex-col justify-center">
      <button
        onClick={props.onClick}
        type={props.type}
        className={`${textColor} ${bgColor} ${props.className} h-fit px-3 py-0.5 rounded-[5px] drop-shadow hover:drop-shadow-lg hover:brightness-90 transition-all duration-300 `}
      >
        {props.icon}
        {props.text}
      </button>
    </div>
  );
}
