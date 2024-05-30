import Login from "./views/common/Login";
import ResetPassword from "./views/common/ResetPassword";
import ChangePassword from "./views/common/ChangePassword";
import RoleSelection from "./views/common/RoleSelection";
import Home from "./views/professional/Home";
import ProfessionalManualSignup from "./views/professional/ProfessionalManualSignup";
import ProfessionalSocialMediaSignup from "./views/professional/ProfessionalSocialMediaSignup";
import LearningPage from "./views/professional/LearningPage";
import CommunityPage from "./views/professional/CommunityPage";
import Profile from "./layouts/Profile";
import HomeAll from "./views/professional/HomeOptionsLayout/HomeAll";
import HomeRecommended from "./views/professional/HomeOptionsLayout/HomeRecommended";
import HomeApplied from "./views/professional/HomeOptionsLayout/HomeApplied";
import HomeSaved from "./views/professional/HomeOptionsLayout/HomeSaved";
import RequireAuth from "./layouts/RequireAuth";
import { Toaster } from "react-hot-toast";
import Pricing from "./views/common/Pricing";
import { Route, Routes } from "react-router-dom";
import SuccessPayment from "./views/common/SuccessPayment";
import FailurePayment from "./views/common/FailurePayment";
import ProfessionalHome from "./views/professional/ProfessionalHome";
import JobWorkSpaceRightContent from "./layouts/Home/JobWorkSpaceRightContent";
import EmployerManualSignup from "./views/employer/EmployerManualSignup";
import EmployerHome from "./views/employer/EmployerHome";
import EmployerAuth from "./views/employer/EmployerAuth";
import EmployerCandidates from "./views/employer/EmployerCandidates";
import EmployerPool from "./views/employer/EmployerPool";
import EmployerProfile from "./views/employer/EmployerProfile";
import CandidateRightMinimumDeviceCard from "./views/employer/employerComponents/CandidateRightMinimumDeviceCard";
import MultiStepForm from "./views/employer/MultiStepForm";
import EmployerRequireAuth from "./hooks/EmployerRequireAuth"; 
import SuperAdminProfessional from "./views/SuperAdmin/SuperAdminProfessional";
import SuperAdminEmployer from "./views/SuperAdmin/SuperAdminEmployer";
import SuperAdminAnalysis from "./views/SuperAdmin/SuperAdminAnalysis";
import SuperAdminStateManagement from "./views/SuperAdmin/Resuable_Comp/SuperAdminStateManagement";
import ProfessionalDetailedView from "./views/SuperAdmin/Resuable_Comp/ProfessionalDetailedView";
import ProfessionalMinDevice from "./views/SuperAdmin/Resuable_Comp/ProfessionalMinDevice";
import EmployerMinDevice from "./views/SuperAdmin/Resuable_Comp/EmployerMinDevice";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot_password" element={<ChangePassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        <Route path="/role_selection" element={<RoleSelection />} />
        <Route path="/role_selection/professional_signup">
          <Route index path="manual" element={<ProfessionalManualSignup />} />
          <Route
            path="social_media"
            element={<ProfessionalSocialMediaSignup />}
          />
        </Route>

        <Route path="/role_selection/employer_signup">
          <Route index path="manual" element={<EmployerManualSignup />} />

        </Route>
        <Route path="employer_signup/manual" element={<EmployerManualSignup />} />

        <Route element={<RequireAuth />}>
          <Route path="professional" element={<ProfessionalHome />}>
            <Route path="home" element={<Home />}>
              <Route path="all_jobs" element={<HomeAll />} />
              <Route path="recommended_jobs" element={<HomeRecommended />} />
              <Route path="applied_jobs" element={<HomeApplied />} />
              <Route path="saved_jobs" element={<HomeSaved />} />
              <Route path="job_Details" element={<JobWorkSpaceRightContent />} />
            </Route>

            <Route path="profile" element={<Profile />} />
            <Route path="pricing_plan" element={<Pricing />} />
            <Route path="learning" element={<LearningPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>
        </Route>

        <Route element={<EmployerRequireAuth />}>
          <Route path="employer_dashboard" element={<EmployerAuth />}>
            <Route path="home" element={<EmployerHome />} />
            <Route path="multistepForm" element={<MultiStepForm />} />
            <Route path="candidates" element={<EmployerCandidates />} />
            <Route path="candidates/full_details" element={<CandidateRightMinimumDeviceCard />} />
            <Route path="pool" element={<EmployerPool />} />
            <Route path="profile" element={<EmployerProfile />} />
          </Route>
        </Route>

        <Route path="super-admin" element={<SuperAdminStateManagement/>}>
          <Route path="professional">
            <Route index element={<SuperAdminProfessional/>}/>
            <Route path="candidates_details" element={<ProfessionalMinDevice/>}/>
          </Route>

          <Route path="employer">
            <Route index element={<SuperAdminEmployer/>}/>
            <Route path="job_details" element={<EmployerMinDevice/>}/>
          </Route>
          <Route path="analysis" element={<SuperAdminAnalysis/>}/>
        </Route>




        <Route path="/checkout_success" element={<SuccessPayment />} />
        <Route path="/checkout_failure" element={<FailurePayment />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
