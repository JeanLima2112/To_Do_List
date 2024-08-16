import {Route ,Routes} from "react-router-dom"
import Home from "./home/Home"

const Router = () => {
    return(
        <Routes>
            <Route path="/" element = {<Home />} />
        </Routes>
    )
}

export default Router