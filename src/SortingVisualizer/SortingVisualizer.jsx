import React from 'react';
import {mergeSort, bubbleSort, quickSort, heapSort} from '../SortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 150;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'pink';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
  }

  scrambleArray () {
    // const newArray = this.state.array.slice()
    // shuffle(newArray);
    // this.setState({newArray});
  }

  mergeSort() {
    const animations = mergeSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // todo
    // make animations line up with every comparison and switch
    // just realized it wont be periodic
    console.log(this.state.array);
    const animations = quickSort(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (i % 3 !== 1){
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const temp = barTwoStyle.height;
          barTwoStyle.height = barOneStyle.height;
          barOneStyle.height = temp;
        }, i * ANIMATION_SPEED_MS);        
      }
    }
  }

  heapSort() {
    const animations = heapSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if (i % 3 !== 1){
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const temp = barTwoStyle.height;
          barTwoStyle.height = barOneStyle.height;
          barOneStyle.height = temp;
        }, i * ANIMATION_SPEED_MS);        
      }
    }
  }

  bubbleSort() {
    const animations = bubbleSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const temp = barTwoStyle.height;
          barTwoStyle.height = barOneStyle.height;
          barOneStyle.height = temp;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <div className="control-panel">
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.heapSort()}>Heap Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function shuffle(array) {
//   array.sort(() => Math.random() - 0.5);
// }