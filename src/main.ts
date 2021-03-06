import { createApp, h } from 'vue'
import App from './App.vue'
import { router } from './router/routes'

const app = createApp({
    render: ()=>h(App)
})


app.use(router)

app.mount('#app')
