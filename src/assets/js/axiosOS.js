import Vue from 'vue'
import axios from 'axios'


Vue.use({
    install(Vue) {
        Vue.prototype.$httpOS = axios.create({
                // test no servidor 
                // local: npm run build 
                // copiar os arquivos para o servidor
                // wwwroot/singlecrmtst  
                // usando este URL
                // baseURL: 'https://25.52.219.187:7236/api/',
                // baseURL: 'https:localhost:7236/api/',
                // baseURL: 'https:localhost:7235/api/',

                baseURL: process.env.VUE_APP_baseURLAPIOS,
                headers: {
                    //Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Empresa: localStorage.getItem("Empresa")
                }
            }),
            // por motivos de depuração
            Vue.prototype.$httpOS.interceptors.request.use(function(config) {
                return config;
            }, function(error) {
                console.log("Erro INTERCEPTOR OS: " + error)
                return Promise.reject(error);
            });
    }
})