
export default function DaughterComponent({ ...props }) {
    return (
        <div className="tow">
            <h1>counter: {props.counter}</h1>
            <button className="btn btn-primary" onClick={() =>props.setCounter(old => old + 1)}>Increment</button>
        </div>
    )
}