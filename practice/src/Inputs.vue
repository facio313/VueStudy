<template>
  <label>이름 : </label>
  <input type="text" v-model="result.name" placeholder="이름"/><br/>
  <label>나이 : </label>
  <input type="number" v-model="result.age" placeholder="나이"/><br/>
  <label>성별 : </label>
  <label>남성</label>
  <input type="radio" name="gender" v-model="result.gender" value="male"/>
  <label>여성</label>
  <input type="radio" name="gender" v-model="result.gender" value="female"/><br/>
  <label>취미 : </label>
  <span v-for="hobby in hobby_options" :key="hobby">
    <label>{{ hobby }}</label>
    <input type="checkbox" v-model="result.hobby" v-bind:value="hobby"/> 
  </span><br/>
  <label>비번 : </label>
  <input type="password" v-model="result.password"/><br/>
  <label>국가 : </label>
  <select v-model="result.country">
    <option v-for="country in country_options" :key="country">
      {{ country }}
    </option>
  </select><br/>
  <label>날짜 : </label>
  <input type="date" v-model="result.date"/><br/>
  <label>시간 : </label>
  <input type="time" v-model="result.time"/><br/>
  <label>색깔 : </label>
  <input type="color" v-model="result.color"/><br/>
  <label>범위 : </label>
  <input type="range" v-model="result.range" min="1" max="100"/>
  <div>
    <h3>결과</h3>
    <hr/>
    {{ result }}
  </div>

</template>

<script>
import { reactive } from 'vue'
// ref는 단일 변수 양방향 결합
// reactive는 객체 양방향 결합
// ref로 변수 하나하나 만드는 것보다 하나로 묶어 reactive로 결합하는 게 편함

export default {
  setup() {
    const name = ''
    const age = 0
    const gender = 'male'
    const hobby = ['스포츠']
    const password = ''
    const country = '한국'
    const date = ''
    const time = ''
    const color = ''
    const range = ''

    const country_options = ['한국', '미국', '중국']
    const hobby_options = ['스포츠', '그림', '음악', '코딩']

    const result = reactive({
      name
      , age
      , gender
      , hobby
      , password
      , country
      , date
      , time
      , color
      , range
    })

    return {
      // 얘는 양방향 결합 필요해서 reactive
      result,

      // 얘네는 양방향 결합 필요 안 함
      country_options,
      hobby_options,
    }
  },
}
</script>
