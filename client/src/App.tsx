import { Navigate, Route, Routes } from "react-router";

import HomePage from "./HomePage";
import LoginForm from "./login/LoginForm";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            {/* Redirect to main page on invalid URLs */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
