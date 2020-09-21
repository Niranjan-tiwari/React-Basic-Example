import React, { useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Context } from "../../store";
import "./nav-bar.scss"

const Navbar = (props) => {
    const history = useHistory()
    const [state, dispatch] = useContext(Context);

    return(
        <>
        <div className="nav-bar">
            <div className="nav-link">
                LOGO
            </div>
            {
                state.isLoggedIn && (
                    <>  
                        <div className={`nav-link ${history.location.pathname === "/" ? 'active' : ''}`} onClick={() => history.push('/')}>
                            Home
                        </div>
                        <div className={`nav-link ${history.location.pathname === "/task" ? 'active' : ''}`} onClick={() => history.push('/task')}>
                            Tasks
                        </div>
                        <div className={`nav-link ${history.location.pathname === "/user" ? 'active' : ''}`} onClick={() => history.push('/user')}>
                            User
                        </div>
                    </>
                )
            }            
        </div>
        {props.children}
        </>
    )
}

export default withRouter(Navbar);