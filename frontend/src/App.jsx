import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  ConfigProvider,
  Layout,
  message as AntdMessage,
  Spin,
} from 'antd';
import useAuthStore from './store/authStore';

// Layout Components
import Navbar from './components/layout/NavBar';
import { Footer } from 'antd/es/layout/layout';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Pages
import QuizList from './pages/quizzes/QuizList';
import QuizDetail from './pages/quizzes/QuizDetail';
import QuizForm from './pages/quizzes/QuizForm';
import QuestionList from './pages/questions/QuestionList';
import QuestionForm from './pages/questions/QuestionForm';
import TakeQuiz from './pages/attempts/TakeQuiz';
import UserAttempts from './pages/attempts/UserAttempts';
import QuizResults from './pages/results/QuizResults';
import ResultDetail from './pages/results/ResultsDetail';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VerifyEmail from './pages/common/VerifyEmail';
import NotFound from './pages/common/NotFound';

const { Content } = Layout;

const AppRoutes = () => {
  const location = useLocation();
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/verify-email';

  if (loading) {
    return (
      <Layout
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin size="large" tip="Đang kiểm tra phiên đăng nhập..." />
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!hideLayout && <Navbar />}

      <Content style={{ padding: '0px', flex: 1 }}>
        <div style={{ background: '#fff', minHeight: '100%' }}>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<SignInPage />} />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<QuizList />} />
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quizzes/new" element={<QuizForm />} />
              <Route path="/quizzes/:id" element={<QuizDetail />} />
              <Route path="/quizzes/:id/edit" element={<QuizForm />} />

              <Route path="/quizzes/:quizId/questions" element={<QuestionList />} />
              <Route path="/quizzes/:quizId/questions/new" element={<QuestionForm />} />
              <Route path="/quizzes/:quizId/questions/:questionId/edit" element={<QuestionForm />} />

              <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
              <Route path="/my-attempts/:userId" element={<UserAttempts />} />
              <Route path="/results/:attemptId" element={<ResultDetail />} />
              <Route path="/results/quiz/:quizId" element={<QuizResults />} />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Content>

      {!hideLayout && (
        <Footer style={{ textAlign: 'center' }}>
          Quiz App ©{new Date().getFullYear()} Created by You
        </Footer>
      )}
    </Layout>
  );
};

function App() {
  const [messageApi, contextHolder] = AntdMessage.useMessage();

  return (
    <ConfigProvider>
      {contextHolder}
      <Router>
        <AppRoutes />
      </Router>
    </ConfigProvider>
  );
}

export default App;