<template>
  <MyButton sm>My Button1</MyButton>
  <!--MyButton 컴포넌트에 v-bind="$attrs"가 있으면 엘리먼트 속성이 그대로 전달됨. ex) sm이 그대로 전달됨-->
  <MyButton>My Button2</MyButton>
  <MyButton lg background-white>My Button3</MyButton>
  <MyButton sm pill text-red background-black>My Button4</MyButton>
  <MyButton md pill text-green background-pink>My Button5</MyButton>
  <MyButton lg pill @click.prevent.capture="onClick">My Button6</MyButton>
  <br/>
  <MyButton type="switch" background-blue text-white v-model:active="active">SWITCH</MyButton>
</template>

<script>
import MyButton from './components/MyButton.vue'

export default {
  name: 'Button',
  data() {//
    return {//
      active: false//
    }//
  },//
  watch: {//
    active(new_val) {//
      alert(new_val)//
    }//
  },//
  methods: {
    onClick(evt) {
      alert('Clicked')
    },
  },
  components: {
    MyButton,
  },
}
</script>
