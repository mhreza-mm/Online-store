import React from "react";
import "../style/UserPanel.css"

const UserPanel=({user,onLogout})=>{
    return(
        <div className="user-panel-container">
            <h3>سلام {user?.name}</h3>
            <button className="logout-btn" onClick={onLogout}>خروج</button>
        </div>
    )
}
export default UserPanel;
