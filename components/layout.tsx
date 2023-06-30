import React, {JSX} from "react";

const Layout = ({children} : { children: JSX.Element }) => {
    return(
        <div className={'Layout'}>
            Layout
            {children}
        </div>
    )
}
export default Layout;