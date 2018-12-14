<template>

  <div id="wrap">
    <!-- header -->
    <div id="header"></div>
    <!-- //header -->
    <div id="container">








<div class="mdc-text-field">
  <input type="text" id="inpt-id" class="mdc-text-field__input">
  <label class="mdc-floating-label" for="inpt-id">ID</label>
  <div class="mdc-line-ripple"></div>
</div>


<!-- <div class="mdc-text-field">
  <input type="password" id="inpt-pwd" class="mdc-text-field__input">
  <label class="mdc-floating-label" for="inpt-pwd">Password</label>
  <div class="mdc-line-ripple"></div>
</div> -->



    </div>
    <!-- footer -->
    <div id="footer"></div>
    <!-- //footer -->
  </div>

  <!-- <h1>{{ msg }}</h1> -->
</template>

<script>
import {MDCTextField} from '@material/textfield';
import {MDCFloatingLabel} from '@material/floating-label';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  beforeDestroy: function(){
    // const floatingLabels =  [].map.call(document.querySelectorAll('.mdc-floating-label'), function(el) {
    //                           return new MDCFloatingLabel(el);
    //                         });
    // const textFields =  [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
    //                       return new MDCTextField(el);
    //                     });

    const floatingLabel = new MDCFloatingLabel(document.querySelector('.mdc-floating-label'));
    const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
  }
}

</script>

<style lang="scss">

</style>
