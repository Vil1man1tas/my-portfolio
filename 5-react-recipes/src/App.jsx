import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import InstructionPage from './pages/InstructionPage'
import AboutUsPage from './pages/AboutUsPage'


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/apie-mus' element={<AboutUsPage />} />
                    <Route path='/instruction' element={<InstructionPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
