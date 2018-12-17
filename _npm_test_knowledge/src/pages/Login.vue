<template>
    <Layouts>


<div class="mdc-text-field">
  <input type="text" id="inpt-id" class="mdc-text-field__input">
  <label class="mdc-floating-label" for="inpt-id">ID</label>
  <div class="mdc-line-ripple"></div>
</div>


<div class="mdc-text-field">
  <input type="password" id="inpt-pwd" class="mdc-text-field__input">
  <label class="mdc-floating-label" for="inpt-pwd">Password</label>
  <div class="mdc-line-ripple"></div>
</div>



    </Layouts>
</template>

<script>
import Layouts from '../layouts/Layouts.vue';
import {MDCTextField} from '@material/textfield';
import {MDCFloatingLabel} from '@material/floating-label';


export default{
  components: {
    Layouts
  },
  mounted: function(){
    const floatingLabels =  [].map.call(document.querySelectorAll('.mdc-floating-label'), function(el) {
                              return new MDCFloatingLabel(el);
                            });
    const textFields =  [].map.call(document.querySelectorAll('.mdc-text-field'), function(el) {
                          return new MDCTextField(el);
                        });
  }
}
</script>