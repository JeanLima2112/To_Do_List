import {Route ,Routes} from "react-router-dom"
import Home from "./home/Home"
import SingUp from "./singup/SingUp"
import SingIn from "./login/SingIn"

const Router = () => {
    return(
        <Routes>
            <Route path="/home" element = {<Home />} />
            <Route path="/To_Do_List/tree/main/Todolist_Front_End/" element = {<SingUp />} />
            <Route path="/singin" element = {<SingIn />} />

        </Routes>
    )
}

export default Router