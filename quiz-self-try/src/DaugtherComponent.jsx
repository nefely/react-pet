
export default function DaughterComponent({ ...props }) {
    return (
        <div className="tow">
            <h1>counter: {props.counter}</h1>
            <button className="btn btn-primary" onClick={() =>props.setCounter(old => old + 1)}>Increment</button>
            <button className="btn btn-danger" onClick={() => props.decrementReal(props.counter)}>Decrement</button>
            <button className="btn btn-warning" onClick={() =>props.setCounter(0)}>Reset</button>
        </div>
    )
}