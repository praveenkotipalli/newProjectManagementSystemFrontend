import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import BimoSpline from "../custom/BimoSpline";

export default function Auth() {
    const [active, setActive] = useState(true);

    return (
        <div className="loginContainer register-body justify-center flex register-body h-screen w-screen " >
            <div className="flex flex-row h-[30rem] w-[80rem]" style={{marginLeft:"600px"}}> {/* Adjust the width as needed */}
                <div className="box w-[35%] p-5"> {/* Adjust the width for the forms */}
                    <div className="minContainer login flex flex-col">
                        <div className="loginBox w-full space-y-5">
                            {active ? <Register /> : <Login />}
                        </div>
                        <div style={{ marginLeft: "148px", display: "flex", fontSize: "small" }}>
                            <span className={active ? "" : "login-span"} style={{ color: "gray" }}>
                                {active ? "Already had an account ?! " : "New user ?! "}
                            </span>
                            <p onClick={() => setActive(!active)} style={{ color: "#FF520E", marginLeft: "1.5px" }} className="cursor-pointer">
                                {active ? "Sign in" : "Sign up"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center " style={{paddingBottom:"20px", marginRight:"10px"}}> {/* Adjust the width as needed */}
                    <div style={{ height: "1000px",marginRight:"400px",marginBottom:"50px",marginRight:"10px", overflow: "hidden"}} > {/* Adjust the size of BimoSpline */}
                        <BimoSpline  />
                    </div>
                </div>
            </div>
        </div>
    );
}
