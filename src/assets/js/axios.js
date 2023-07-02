import Vue from "vue";
import axios from "axios";
import router from "../../router";
import moment from "moment";
//import Toast from "vue-toastification";

Vue.use({
    install(Vue) {
        (Vue.prototype.$http = axios.create({
            // test no servidor 
            // local: npm run build 
            // copiar os arquivos para o servidor
            // wwwroot/singlecrmtst  
            // usando este URL

            //baseURL: "https:localhost:7091/api/",
            //baseURL: "https:localhost:7090/api/",

            baseURL: process.env.VUE_APP_baseURLAPI,
            //baseURL: "https://tecnoexpresss.ddns.net:7091/api/",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Empresa: localStorage.getItem("Empresa"),
                Accept: 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        })),
        // 
        Vue.prototype.$http.interceptors.request.use(
            function(config) {
                let bearer = localStorage.getItem("token");
                if (bearer == null) {
                    Vue.$toast.error("Acesso não é permitido!")
                    router.push({ name: "login" });
                } else {
                    let now = moment();
                    let then = localStorage.getItem("tscrm");
                    let duration = moment.duration(now.diff(then));
                    let minutes = duration.asMinutes();

                    if (minutes > 30) {
                        if (config.url != 'Authentication/Authenticate') {
                            Vue.$toast.clear()
                            Vue.$toast.warning("Sessão vencido!")
                        }
                        router.push({ name: "login" });
                    } else {
                        localStorage.setItem('tscrm', moment())
                    }
                }
                return config;
            },
            function(error) {
                console.log("Erro INTERCEPTOR: " + error);
                return Promise.reject(error);
            }
        );
    },
});