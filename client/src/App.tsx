import { Navigate, Route, Routes } from "react-router";

import HomePage from "./HomePage";
import LoginForm from "./login/LoginForm";

import { AppContext } from "./App.context";

function App() {
    return (
        <AppContext>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                {/* Redirect to main page on invalid URLs */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AppContext>
    );
}

export default App;
