import Spline from "@splinetool/react-spline";
import Navbar from "../Navbar/Navbar";

const paidPlan = [
  "Add unlimited projects",
  "Access to live chat",
  "Add unlimited team members",
  "Advanced Reporting",
  "Priority Support",
  "Customization Options",
  "Integration Support",
  "Advanced Security",
  "Training and Resources",
  "Access Control",
  "Custom Workflow",
];

const annualPlan = [
  "Add unlimited projects",
  "Access to live chat",
  "Add unlimited team members",
  "Advanced Reporting",
  "Priority Support",
  "Everything which montly plan has",
];

const freePlan = [
  "Add only 3 projects",
  "Basic Task Management",
  "Project Collaboration",
  "Basic Reporting",
  "Email Notification",
  "Basic Access control"
];

export default function Subscription() {
  return (
    <>
    
        <Navbar/>
        <div className='upgrade-container' style={{}}>
        <Spline scene='/upgradecard3.splinecode'/>
        {/* <Spline scene="/scene2.splinecode" /> */}
    </div>
    </>
  );
}