import {reactive} from "vue";

const state = reactive({
    user: null,
})


const methods = {
    setUser(payload) {
        console.log(payload.user)
        state.user = payload ? payload.user : null;
    }
}

export default {
    state,
    methods,
}