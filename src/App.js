import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import MainPage from "./pages/MainPage";
import ErrorPages from "./pages/ErrorPages";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<MainPage/>}/>
                <Route exact path="/error" element={<ErrorPages/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
