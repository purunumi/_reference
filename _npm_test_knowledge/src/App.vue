<template>

  <div id="wrap">
    <!-- header -->
    <div id="header"></div>
    <!-- //header -->
    <div id="container">







<div class="mdc-form-field">


<div class="mdc-text-field">
  <input type="text" id="my-text-field" class="mdc-text-field__input">
  <label class="mdc-floating-label" for="my-text-field">Hint text</label>
  <div class="mdc-line-ripple"></div>
</div>


</div>






    </div>
    <!-- footer -->
    <div id="footer"></div>
    <!-- //footer -->
  </div>

  <!-- <h1>{{ msg }}</h1> -->
</template>

<script>
import {MDCFormField} from '@material/form-field';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldHelperText} from '@material/textfield/helper-text';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeDestroy: function(){
    const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
    const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
    const helperText = new MDCTextFieldHelperText(document.querySelector('.mdc-text-field-helper-text'));
  }
}

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
