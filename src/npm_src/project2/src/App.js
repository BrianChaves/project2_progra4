import { Navigate, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/main/Home';
import AuthService from './services/auth-service';
import { useEffect, useState } from 'react';
import UserDetailUpdateRemove from './components/user/UserDetailUpdateRemove';
import InsuranceDetailUpdateRemove from './components/insurance/InsuranceDetailUpdateRemove';
import CoverageCategoryListCreate from "./components/coverageCategory/CoverageCategoryListCreate";
import CoverageCategoryDetailUpdateRemove from './components/coverageCategory/CoverageCategoryDetailUpdateRemove';
import CoverageListCreate from "./components/coverage/CoverageListCreate";
import CoverageDetailUpdateRemove from './components/coverage/CoverageDetailUpdateRemove';
import PaymentListCreate from "./components/payment/PaymentListCreate";
import PaymentDetailUpdateRemove from "./components/payment/PaymentDetailUpdateRemove";
import VehicleListCreate from './components/vehicle/VehicleListCreate';
import VehicleDetailUpdateRemove from './components/vehicle/VehicleDetailUpdateRemove';

function App() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminContent, setShowAdminContent] = useState(false);
  const [showStandardContent, setShowStandardContent] = useState(false);

  if (searchParams.has('page')){
    let pageValue = searchParams.get('page');
    switch (pageValue){
      case 'login':
        navigate("/login");
        break;
      case 'register':
        navigate("/register");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminContent(user.roles.includes("AdministratorClient"));
      setShowStandardContent(user.roles.includes("StandardClient"));
    }
  }, []);

  return (
    <>
      <Header currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent} />
      <div class="container-fluid m-auto flex-shrink-0">
        <div class="row col-12 justify-content-center">
          <Routes>
            {
              user ? <Route path="/" element={<Home currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent} />} />
              : <Route path="/" element={<Navigate to="/login" replace />} /> 
            }
            <Route path="/home" element={<Home currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent} />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setShowAdminContent={setShowAdminContent} setShowStandardContent={setShowStandardContent} />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/user/:username" element={<UserDetailUpdateRemove currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/insurance/:numberPlate" element={<InsuranceDetailUpdateRemove currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/coverageCategory" element={<CoverageCategoryListCreate currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/coverageCategory/:name" element={<CoverageCategoryDetailUpdateRemove currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/coverage" element={<CoverageListCreate currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/coverage/:name" element={<CoverageDetailUpdateRemove currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/payment" element={<PaymentListCreate currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/payment/:id" element={<PaymentDetailUpdateRemove currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/vehicle" element={<VehicleListCreate currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />
            <Route path="/vehicle/:id" element={<VehicleDetailUpdateRemove currentUser={currentUser} showAdminContent={showAdminContent} showStandardContent={showStandardContent}  />} />

            {
              user ? <Route path="*" element={<Navigate to="/home" replace />} /> 
              : <Route path="*" element={<Navigate to="/login" replace />} /> 
            }
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
