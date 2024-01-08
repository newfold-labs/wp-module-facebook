import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";


export default {
    facebook_module: {
        base_url: "https://graph.facebook.com/v18.0",
        debug_token : "/debug_token",
        token_phrase: "secret_token_phrase",
    },
    wordpress: {
        access: NewfoldRuntime.createApiUrl('/newfold-facebook/v1/facebook/hiive'),
        fb_token: NewfoldRuntime.createApiUrl('/newfold-facebook/v1/facebook/fb_token'),
        facebook_details : NewfoldRuntime.createApiUrl('/newfold-facebook/v1/facebook/details')
    },
    cf_worker: {
        login_screen: `https://127.0.0.1:8787/`,
        get_token: "https://127.0.0.1:8787/get/token?hiive_token=",
        delete_token: "https://127.0.0.1:8787/delete/token?hiive_token=",
    }
}