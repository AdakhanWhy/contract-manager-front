import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Contract } from "./components/Contract";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./components/Login/LoginPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route
          path="/contracts"
          element={
            <ProtectedRoute>
              <Contract />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/contracts" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
