import apiFetch from "@wordpress/api-fetch";
import constants from "./constants";

export const getToken = (hiiveToken) => {
    return apiFetch({
        url: `${constants.cf_worker.get_token}${hiiveToken}&origin=${window.location.origin}`,
        headers: {
            method: "GET",
            Allow: "*/*",
            Connection: "keep-alive"
        }
    })
}

export const getFacebookUserProfile = (accessToken) => {
   return fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`)
   
}

export const getFacebookUserPosts = (userId, accessToken) => {
    fetch(`${constants.facebook_module.base_url}/${userId}/likes?fields=id,name,message,story,created_time,link,description,caption,attachments{media,type,subattachments}&limit=100&access_token=${accessToken}&format=json`)
        .then(response => response.json())
        .then(data => {
           console.log(data, "posst")
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
}

export const getFacebookUserProfileDetails = async () => {
   const settings_details = await apiFetch({ url: constants.wordpress.settings });
   const facebook_details = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${settings_details.fb_token}`);
   const profile_details = await facebook_details.json();
   return profile_details
}
