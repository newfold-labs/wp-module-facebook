export default {
    facebook_module: {
        base_url: "https://graph.facebook.com/v18.0",
        debug_token : "/debug_token",
        token_phrase: "secret_token_phrase",
    },
    wordpress: {
        access: `${window.location.origin}/home/index.php?rest_route=newfold-ecommerce/v1/hiive/token&_locale=user`,
        facebook: `${window.location.origin}/home/index.php?rest_route=%2Fnewfold-ecommerce%2Fv1%2Fintegrations%2Ffacebook&_locale=user`,
        settings: `${window.location.origin}/home/index.php?rest_route=%2Fwp%2Fv2%2Fsettings&_locale=user`
    },
    cf_worker: {
        login_screen: `https://192.168.1.6:8787/`,
        get_token: "https://192.168.1.6:8787/get/token?hiive_token="
    }
}