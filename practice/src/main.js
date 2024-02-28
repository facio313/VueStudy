import { createApp } from 'vue'
import Input from './Inputs.vue'
import Button from './Button.vue'
import Table from './Table.vue'
//import './index.css'

createApp(Input).mount('#inputs')
createApp(Button).mount('#buttons')
createApp(Table).mount('#tables')
