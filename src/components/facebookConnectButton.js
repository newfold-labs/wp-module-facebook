import { Button } from "@newfold/ui-component-library";
import apiFetch from "@wordpress/api-fetch";
import React, { useEffect, useState } from "react";
import { getFacebookUserProfileDetails, getToken } from "../utils/helper";
import constants from "../utils/constants";

const FacebookConnectButton = (props) => {
    const [fieldValue, setFieldValue] = useState('');
    const [facebookAccess, setFacebookToken] = useState(null);
    const [profileData, setProfileData] = useState([]);

    const postToken = (fb_token) => {
        apiFetch({
            url: constants.wordpress.fb_token,
            method: "post",
            data: {
                fb_token: fb_token
            }
        }).then(res => {
            return res
        }).catch(err => {
            console.log(err)
        })
    }

    const hiiveToekna = () => apiFetch({ url: constants.wordpress.access }).then((res) => {
        getToken().then(resp => {
            if(resp.token){
                postToken(resp.token);
                setFacebookToken(resp.token);
            }
        }).catch(err => {
            console.log(err)
        })
        setFieldValue(res.token);
    }).catch((err) => {
        console.log(err);
    });

    useEffect(() => {
        apiFetch({ url: constants.wordpress.access }).then((res) => {
            res.token && setFieldValue(res.token);
        })
        apiFetch({ url: constants.wordpress.fb_token }).then((res) => {
           if(res.fb_token){
            getFacebookUserProfileDetails().then(response => {
                setFacebookToken(res.fb_token);
                setProfileData(response);
            }).catch(() =>  hiiveToekna())
           }else{
            hiiveToekna();
           }
        })
    }, [])

    const connectFacebook = () => {
       const win = window.open(`${constants.cf_worker.login_screen}?token_hiive=${fieldValue}&redirect=${window.location.href}`, "ModalPopUp", `toolbar=no,scrollbars=no,location=no,width=${window.innerWidth/2 + 200},height=${window.innerHeight/2 + 200},top=200,left=200`)
   
      const intervalId = setInterval(function() {
        if (win.closed) {
            // props.notify?.push('fb-connect-status', {
            //     title: __(
            //       'Connected to facebook successfully',
            //       'wp-module-ecommerce'
            //     ),
            //     variant: 'success',
            //     autoDismiss: 5000,
            //   });
            clearInterval(intervalId);
            window.location.reload();
        }
        }, 5000);
    }

    return (
        <div>{
            facebookAccess ?
                <div>
                    <Button style={{ "color": "#fff", "padding": "5px 20px" }} className="nfd-bg-green-600">Connected to Facebook</Button>
                    <div>
                        {profileData?.map((dataObj, index) => {
                            return (
                                <>
                                    <ul style={{ "paddingTop": "20px" }}>
                                        <li><p>Facebook ID: {dataObj?.Users?.profile?.id}</p></li>
                                        <li><p>User Name: {dataObj?.Users?.profile?.name}</p></li>
                                        <li><p>User Email: {dataObj?.Users?.profile?.email}</p></li>
                                        <li><p>Profile pic:{dataObj?.Users?.profile?.picture.data.url}</p></li>
                                    </ul>
                                    <img src={`https://graph.facebook.com/${dataObj?.Users?.profile?.id}/picture?type=small`} height={dataObj?.Users?.profile?.picture?.height} width={dataObj?.Users?.profile?.picture?.width} />
                                </>
                            );
                        })}
                    </div>
                </div>
                :
                <Button type="submit" variant="primary" onClick={() => connectFacebook()}>Connect to Facebook</Button>
        }
        </div>)
}

export default FacebookConnectButton;