import { Badge, Button } from "@newfold/ui-component-library";
import React, { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";

const FacebookConnectButton = () => {
    const [fieldValue, setFieldValue] = useState('');
    const [facebookAccess, setFacebookToken] = useState(null);

    const ENDPOINTS = {
        facebook_module: {
            login_status: "https://graph.facebook.com/v18.0/me"
        },
        hiive_toke: {
            access: `${window.location.origin}/home/index.php?rest_route=%2Fnewfold-ecommerce%2Fv1%2Fintegrations%2Fhiive&_locale=user`
        },
        cf_worker: {
            login_screen: `https://192.168.100.7:8787/?redirect=${window.location.href}`,
            get_token: "https://192.168.100.7:8787/get/token?hiive_token="
        }
    }

    const hiiveToekna = () => apiFetch({ url: ENDPOINTS.hiive_toke.access }).then((res) => {
        apiFetch({
            url: `${ENDPOINTS.cf_worker.get_token}${res.token}&origin=${window.location.origin}`,
            headers: {
                method: "GET",
                Allow: "*/*",
                Connection: "keep-alive"
            }
                 }).then(resp => {
            setFacebookToken(resp.token);
            // window.fbAsyncInit = () => {
                // console.log("inside")
                // window.FB.init({
                //     appId: "696041252459517",
                //     cookie: true,
                //     xfbml: true,
                //     version: 'v18.0',
                //     access_token: resp.token
                // });
                // console.log(FB);
                // FB.getAuthResponse((resss) => {
                //     console.log(resss)
                // })
                // FB.getAccessToken((access) => {
                //     console.log(access)
                // })
                // FB.getLoginStatus((res) => {
                    // if (res) {
                    //     FB.api(`/me?access_token=${authResponse.token}`, function (response) {
                    //         console.log('Good to see you, ' + response.name + '.');
                    //     });
                    // } else {
                        // console.log(res)
                    // }
                // });
               
            // }
            // (function(d, debug){
            //     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            //     if (d.getElementById(id)) {return;}
            //     js = d.createElement('script'); js.id = id; js.async = true;
            //     js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
            //     ref.parentNode.insertBefore(js, ref);
            //   }(document, /*debug*/ true));
        }).catch(err => {
            console.log(err)
        })
        setFieldValue(res.token);
    }).catch((err) => {
        console.log(err);
    });

    useEffect(() => {
        hiiveToekna();
    }, [])

    return (<div>{facebookAccess ? <Badge variant="success" className="nfd-bg-green-300">Connected to Facebook</Badge> : <form action={ENDPOINTS.cf_worker.login_screen} enctype="application/x-www-form-urlencoded" method="post">
        <input type="text" value={fieldValue} name="token_hiive" hidden />
        <Button type="submit" variant="primary">Connect to Facebook</Button>
    </form>}
    </div>)
}

export default FacebookConnectButton;