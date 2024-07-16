import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AboutUsPage from './pages/AboutUsPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import createStore from 'react-auth-kit/createStore' 
import AuthProvider from 'react-auth-kit'           
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import HomeUserPage from './pages/HomeUserPage'
import ProfilePage from './pages/ProfilePage'
import TravelsOne from './shared/TravelsOne'
import TravelEdit from './shared/TravelEdit'

function App() {
    const store = createStore({
        authName: '_auth',
        authType: 'cookie',
        cookieDomain: window.location.hostname,
        // cookieSecure: window.location.protocol === 'https:',
        cookieSecure: false,
    })

    return (
        <AuthProvider store={store}> 
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainLayout />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/about-us' element={<AboutUsPage />} />
                        <Route path='/register' element={<RegisterPage />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route element={<AuthOutlet fallbackPath='/register' />}>
                            <Route path='/homeuser' element={<HomeUserPage />} />
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/travels/:id' element={<TravelsOne />} />
                            <Route path='/travels/edit/:id' element={<TravelEdit />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App