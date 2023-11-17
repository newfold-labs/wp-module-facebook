import { Badge, Button } from "@newfold/ui-component-library";
import React, { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";

const FacebookConnectButton = () => {
    const [fieldValue, setFieldValue] = useState('');
    const [facebookAccess, setFacebookToken] = useState(null);

    const hiiveToekna = () => apiFetch({ url: 'http://localhost:10023/home/index.php?rest_route=%2Fnewfold-ecommerce%2Fv1%2Fintegrations%2Fhiive&_locale=user' }).then((res) => {
        apiFetch({
            url: `https://192.168.1.2:8787/get/token?hiive_token=${res.token}`,
            headers: {
                method: "GET"
            },
            "mode": "cors"
        }).then(resp => {
            setFacebookToken(resp.token)
        }).catch(err => {
            console.log(err)
        })
        setFieldValue(res.token);
    }).catch((err) => {
        console.log(err);
    });

    useEffect(() => {
        hiiveToekna()
    }, [])

    return (<div>{facebookAccess ? <Badge variant="success" className="nfd-bg-green-300">Connected to Facebook</Badge> : <form action={`https://192.168.1.2:8787/?redirect=${window.location.href}`} enctype="application/x-www-form-urlencoded" method="post">
        <input type="text" value={fieldValue} name="token_hiive" hidden />
        <Button type="submit" variant="primary">Connect to Facebook</Button>
    </form>}</div>)
}

export default FacebookConnectButton;