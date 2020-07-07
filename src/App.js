import React, { Suspense } from 'react';
import './App.css';


const Index = React.lazy(() => import('./cmp/index'));
function App() {
  return (
    <div className="app-div">
      <Suspense fallback={<div>Loading...</div>}>
        <Index />
      </Suspense>
    </div>
  );
}

export default App;
