export default function Row({ guess, current }) {
  let column = [];

  for (let i = 0; i < guess[0].length; i++) {
    const color =
      guess[0][i] == current[i]
        ? "green"
        : guess[0].includes(current[i])
        ? "yellow"
        : "grey";
    column.push(
      <span
        key={i}
        className="box"
        style={{
          backgroundColor: color,
        }}
      >
        {current[i]}
      </span>
    );
  }

  return <div className="row">{column}</div>;
}
