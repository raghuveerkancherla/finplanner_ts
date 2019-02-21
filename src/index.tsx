
import {Atom, F } from '@grammarly/focal';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const state = Atom.create({
    name: "Raghu",
    counter: 1
  })

state.subscribe(x => {
    console.log(`New app state: ${JSON.stringify(x)}`)
  })


const Counter = (props: { counter: Atom<number> }) => {
    console.log("counter : ", props.counter)
    return (
        <F.div>
            {/* use observable state directly in JSX */}
            You have clicked this button {props.counter} time(s).
        
            <button
            onClick={() =>
                // update the counter state on click
                props.counter.modify(x => x + 1)
            }
            >
            Click again?
            </button>
        </F.div>
    
    )
}

const App1 = () => {
    const counter = state.lens('counter');
    return (
        <F.div>            
            <F.div>
                <F.p> Current counter: {counter} </F.p>
                <button onClick={() => counter.modify(x => x + 1)}>
                ++ Click again!
                </button>
            </F.div>
        </F.div>
       )
  }

const App = (props: {state: Atom<{counter: number, name: string}>}) => {
    console.log("app", props.state.get().counter)
    return (
        <div>
            Hello {props.state.get().name}!
            <Counter counter={props.state.lens('counter')}/>
        </div>
    )
}


ReactDOM.render(<div>
        <App1 />
        <App state={state} />
    </div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
