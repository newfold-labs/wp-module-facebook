export default {
    facebook_module: {
        base_url: "https://graph.facebook.com/v18.0",
    },
    hiive_toke: {
        access: `${window.location.origin}/home/index.php?rest_route=%2Fnewfold-ecommerce%2Fv1%2Fintegrations%2Fhiive&_locale=user`
    },
    cf_worker: {
        login_screen: `https://192.168.1.7:8787/`,
        get_token: "https://192.168.1.7:8787/get/token?hiive_token="
    }
}