import { Button } from "@newfold/ui-component-library";
import React from "react";

const FacebookConnectButton = () => {
    return  <form action={`https://192.168.1.9:8787/?redirect=${window.location.href}`} enctype="application/x-www-form-urlencoded" method="post">
            <input type="text" value={"test"} name="token_hiive" hidden /> 
            <Button type="submit" variant="primary">Connect to Facebook</Button>
         </form> 
}

export default FacebookConnectButton;