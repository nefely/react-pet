import { useState } from "react"

export default function MarketPlace({...props}) {

    let name = props.data.name || "Unknown Product";
    let src = props.data.src || "";
    let category = props.data.category || "Unknown Category";
    let onStore = props.data.onStore || 0;
    let price = props.data.price.toFixed(2) || 0.00;

    let [counter , setCounter] = useState(0);
    let finalPrice = (price * counter).toFixed(2);

    const incrementCounter = () => {
        if (counter >= onStore) return;
        setCounter(counter + 1);
    }

    const decrementCounter = () => {
        if (counter <= 0) return;
        setCounter(counter - 1);
    }
    

    return (
        <div className={onStore === 0 ? "card out-of-stock" : "card"}>
            <div className="line line-center card-image">
                <img src={src} alt=""/>
            </div>
            <div className="card-body">
                <div className="line line-between">
                    <h5>{name}</h5> <p className="small">{category}</p>
                </div>
                <div className="line line-between">
                    <p className="small">Price: ${price}</p>
                    <p className="small">On store: {onStore}</p>
                </div>
                { 
                    counter > 0 && (
                    <div className="line line-between">
                        <p className="small">Final Price: ${finalPrice}</p>
                        <p className="small">Item: {counter}</p>
                    </div>
                    )
                }      
                {
                    onStore === 0 && (
                        <div className="mt-a mb-0 text-center text-danger">Out of Stock</div>
                    )
                }
                {   
                    onStore > 0 && (
                        <div className="line line-start mt-a mb-0 btn-group">
                            <button className={counter <= 0 ? "btn btn-secondary disabled" : "btn btn-danger"} onClick={decrementCounter}>-</button>
                            <button className={counter >= onStore ? "btn btn-secondary disabled" : "btn btn-primary"} onClick={incrementCounter}>+</button>
                        </div>
                    )
                }
            </div>
        </div>
    )

    
}