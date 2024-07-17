import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
