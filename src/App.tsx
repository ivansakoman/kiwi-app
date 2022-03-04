import { Routes, Route } from 'react-router-dom';
import MainScreen from './features/main/MainScreen';

function App() {
  return <>
    <Routes>
      <Route path='/' element={<MainScreen />} />
    </Routes>
  </>
}

export default App;
