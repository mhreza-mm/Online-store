import React from "react";
import "../style/LoginRegister.css"
const LoginRegister =(onLogin)=>{
    return(
        <div className="login-panel-container"> 
            <h3>ورود /ثبت نام </h3>
            <butto className="login-btn" onClick={()=>onLogin({name:'محمد'})}></butto>
        </div>
    )
};
export default LoginRegister;
