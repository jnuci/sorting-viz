import React from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import './App.css';
import { Helmet } from "react-helmet";


function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet='utf-8' />
        <title>Sorting Bars</title>
        <meta name="description" content = "Sorting Algorithm Visualizer" />
      </Helmet>
      <SortingVisualizer></SortingVisualizer>
    </div>
  );
}

export default App;
