<template>
  <!-- <button v-bind="$attrs" :type="type" :class="classes" ref="button"> -->
  <button v-bind="$attrs" :type="type" :class="classes" ref="button" v-on="type == 'switch' ? {click: onClick} : {}">
    <!--v-bind="$attrs" 부모 컴포넌트의 엘리먼트 속성이 그대로 자식 컴포넌트에 전달됨-->
    <!--v-bind:class="['class1', 'class2', 'class3']" 클래스 모두 적용됨-->
    <!--ref="button" script에서 ref함수로 양방향 결합한 변수(이름이 같음)-->
    <slot></slot>
    <!--시작태그와 종료태그 사이에 들어가는 내뇽이 위치하는 곳-->
    <!--Button.vue에서 MyButton으로 불러들이는데 그 태그 안에 들어갈 text가 들어갈 곳 정하는 것-->
  </button>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  // 엘리먼트의 속성을 정의한다. props, sm, md, lg, pill
  // 현재 <button>태그의 엘리먼트는 v-bind="$attrs" :type="type" :class="classes" ref="button"인가
  props: {
    type: {
      default: 'button',
      // validator를 이용해 3가지 type 이외는 에러로 처리한다.
      validator: (value) => { // value 파라미터는 type의 값
        const allowed = ['button', 'submit', 'reset', 'switch']//
        return allowed.includes(value)
      },
    },
    // Boolean타입으로 선언, default로 기본값 설정 가능, 설정 안 하면 false가 기본
    // style태그들 확인하기
    sm: Boolean,
    md: {
      type: Boolean,
      default: true,
    },
    lg: Boolean,
    pill: Boolean,
    active: {//
      type: Boolean,//
      default: true//
    }
  },
  emits: ['update:active'],//
  // setpup은 props와 context를 받음
  // context에는 slots, attrs, emits가 있음
  // context.attrs => Non-Prop 관련 전부!
  setup(props, context) {
    // 프록시 변수 : ref함수나 reactive함수로 양방향 결합이 가능하게 만든 변수
    // :class로 결합됨 -> class 값 전달 시!!
    const classes = ref([]) // const classes = reactive([])//
    const button = ref(null)
    const active = ref(props.active)//

    // Props 로 처리되는 변수들
    if (props.sm) classes.value.push('sm')//
    else if (props.lg) classes.value.push('lg')//
    else classes.value.push('md')//
    
    /*
    if (props.sm) classes.push('sm')
    else if (props.lg) classes.push('lg')
    else classes.value.push('md')
    */

    if (props.pill) classes.value.push('pill')//

    // switch를 위한 Props
    const changeBrightness = () => {//
      if (props.type == 'switch') {//
        if (!active.value) classes.value.push('deactive')//
        else classes.value = classes.value.filter((i) => i != 'deactive')//
      }//
    }//
    changeBrightness()//

    const onClick = () => {//
      active.value = !active.value//
      changeBrightness()//
      context.emit('update:active', active.value)//
    }//

    // 컴포넌트가 마운트됐을 때 불러오는 함수
    // 컴포넌트가 마운트돼야 button변수가 <button> 엘리번트 정보를 가지게 됨
      onMounted(() => {
        // Non-props 로 처리되는 변수들 <- 원래는 props로 할 수 있던 것들을 Non-props로 해본 것
        // Key-Value 형식으로 속성 넘기기 가능함
        Object.keys(context.attrs).forEach((attr) => {
          if (attr.startsWith('text-')) {
            // button변수 자체가 <button>을 가리키는 게 아니라 button.value가 <button>을 가리킴
            button.value.style.color = attr.substring(5)
        }
        if (attr.startsWith('background-')) {
          button.value.style.backgroundColor = attr.substring(11)
        }
      })
    })

    return {
      classes,
      button,
      onClick
    }
  },
}
</script>

<style scoped>
button {
  outline: none;
}

.sm {
  height: 20px;
  font-size: 13px;
}

.md {
  height: 30px;
  font-size: 22px;
}

.lg {
  height: 40px;
  font-size: 31px;
}

.pill {
  border-radius: 16px;
}

.deactive {
  filter: brightness(50%);
}
</style>
