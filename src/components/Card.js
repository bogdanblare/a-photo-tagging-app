export default function Card(props) {
  return (
    <div
      className={
        props.name === "Batman"
          ? "card batman"
          : props.name === "Sonic"
          ? "card sonic"
          : "card waldo"
      }
    >
      <img src={props.img} alt="character to be found" />
      <h1>{props.name}</h1>
    </div>
  );
}
