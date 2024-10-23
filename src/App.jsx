import { useEffect, useState } from 'react';
import Loading from './pages/Loading';
import SetTimer from './pages/SetTimer';
import { useLocation, Route, Routes } from 'react-router-dom';
import AnalogTimer from './pages/AnalogTimer';
import DigitalTimer from './pages/DigitalTimer';
import TextTimer from './pages/TextTimer';
import Alarm from './pages/Alarm';
// import Break from './pages/Break';
import { TimerProvider } from './components/TimerContext';

function App() {
  const location = useLocation();

  const [buttonColor, setButtonColor] = useState("#ffffff");
  const [buttonBorder, setButtonBorder] = useState("1px solid #ffffff");

  useEffect(() => {
    const button = document.getElementById("timer-button");
    if (button) {
      button.style.color = buttonColor;
      button.style.border = buttonBorder;
    }
  }, [buttonColor, buttonBorder]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/timer/alarm" || location.pathname === "/timer/break") {
      document.body.style.backgroundColor = "rgba(10, 10, 10, 0.900)";
      setButtonColor("#fffcfc");
      setButtonBorder("1px solid #fffcfc");
    } else {
      document.body.style.backgroundColor = "#fffcfc";
      setButtonColor("rgba(10, 10, 10, 0.900)");
      setButtonBorder("1px solid rgba(19, 19, 19, 0.900)");
    }
  }, [location.pathname]);

  return (
    <TimerProvider>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/timer" element={<SetTimer />} />
        <Route path="/timer/analog" element={<AnalogTimer />} />
        <Route path="/timer/digital" element={<DigitalTimer />} />
        <Route path="/timer/text" element={<TextTimer />} />
        <Route path="/timer/alarm" element={<Alarm />} />
        {/* <Route path="/timer/break" element={<Break />} /> */}
      </Routes>
    </TimerProvider>
  )
}

export default App;