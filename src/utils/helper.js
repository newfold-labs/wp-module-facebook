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

export const checkAccessTokenValidity = (accessToken) => {
    fetch(`${constants.facebook_module.base_url}/${constants.facebook_module.debug_token}?input_token=${accessToken}&access_token=696041252459517|66251f57e1d15f5db650ed121920a4a1`)
        .then(response => response.json())
        .then(data => {
            console.log(data, "token validity")
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
}

export const getFacebookUserProfileDetails = async () => {
    const settings_details = await apiFetch({ url: constants.wordpress.settings });
    const checkAccess = await checkAccessTokenValidity(settings_details.fb_token);
    if (checkAccess.data.is_valid) {
        const facebook_details = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${settings_details.fb_token}`);
        const profile_details = await facebook_details.json();
        return profile_details
    } else {
        return { status: "failed", data: "token expired" }
    }
}
