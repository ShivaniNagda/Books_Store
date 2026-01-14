import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { userAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import Profile from "./Pages/Profile";
import CreateBookForm from "./components/CreateBookForm";
import ProfileData from "./components/ProfileData";
import UpdateBookForm from "./components/UpdateBookForm";
import BookReader from "./pages/BookReader";

// protect route that requires authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = userAuthStore();
  const { user } = userAuthStore();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  // if ( !user ) {

  //   return <Navigate to="/verify-email" replace />;
  // }

  return children;
};

// redirect authenticated users to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const isAuthenticated = userAuthStore();
  const user = userAuthStore((state) => state.user);

  // if (isAuthenticated && user) {
  //   return <Navigate to="/" replace />;
  // }
  console.log("RedirectAuthenticatedUser rendered", children);
  return children;
};

function App() {
  const isCheckingAuth = userAuthStore((state) => state.isCheckingAuth);
  const checkAuth = userAuthStore((state) => state.checkAuth);

  useEffect(() => {
    userAuthStore.getState().checkAuth();
  }, []);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen  bg-slate-900 from-slate-200 via-slate-50 to-slate-50  relative overflow-hidden">
      <FloatingShape
        color="bg-yellow-300"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-slate-100"
        size="w-48 h-48"
        top="70%"
        left="0%"
        delay={5}
      />
      <FloatingShape
        color="bg-yellow-300"
        size="w-48 h-48"
        top="10%"
        left="70%"
        delay={1}
      />
      <FloatingShape
        color="bg-slate-400"
        size="w-48 h-48"
        top="80%"
        left="60%"
        delay={3}
      />
      <FloatingShape
        color="bg-yellow-100"
        size="w-48 h-48"
        top="17%"
        left="90%"
        delay={2}
      />
      <FloatingShape
        color="bg-slate-50"
        size="w-64 h-64"
        top="60%"
        left="60%"
        delay={6}
      />
      <FloatingShape
        color="bg-yellow-200"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LogInPage />{" "}
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/profile"
          element={
            <RedirectAuthenticatedUser>
              <Profile />
            </RedirectAuthenticatedUser>
          }
        >
          {/* Default page */}
          <Route index element={<ProfileData />} />

          {/* Add book page */}
          <Route path="add-book" element={<CreateBookForm />} />
          <Route path="update-book/:id" element={<UpdateBookForm />} />
        </Route>

        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Book Routers */}
        <Route
          path="/create-book"
          element={
            <ProtectedRoute>
              <CreateBookForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookReader />
            </ProtectedRoute>
          }
        />
        {/* <Route path='/edit-book/:id' element={
      <ProtectedRoute>
        <EditBook />
      </ProtectedRoute>
    } /> */}

        {/* catch all routes */}

        <Route
          path="*"
          element={
            <div className="text-white text-2xl d-flex flex-col items-center justify-center h-screen">
              <h1>404 Not Found</h1>
              <p>Page not found</p>
            </div>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
