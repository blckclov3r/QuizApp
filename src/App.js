// import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Questions from './pages/Questions';
import Settings from './pages/Settings';
import FinalScore from './pages/FinalScore';
import {Container,Box} from '@mui/material'
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="sm">
      <Box textAlign={"center"} mt={5}>
        <Routes>
            <Route exact path="/" element={<Settings />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/score" element={<FinalScore />} />
            <Route path="*" element={<Settings />} />
        </Routes>
      </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
