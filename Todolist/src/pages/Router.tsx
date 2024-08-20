import {Route ,Routes} from "react-router-dom"
import Home from "./home/Home"
import SingUp from "./singup/SingUp"
import SingIn from "./login/SingIn"

const Router = () => {
    return(
        <Routes>
            <Route path="" element = {<Home />} />
            <Route path="/singUp" element = {<SingUp />} />
            <Route path="/singin" element = {<SingIn />} />

        </Routes>
    )
}

export default Router