<template>
    <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <a href="#" class="material-icons mdc-top-app-bar__navigation-icon">menu</a>
                <span class="mdc-top-app-bar__title">TEST</span>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                <a href="#" class="material-icons mdc-top-app-bar__action-item" aria-label="Download" alt="Download">file_download</a>
                <a href="#" class="material-icons mdc-top-app-bar__action-item" aria-label="Print this page" alt="Print this page">print</a>
                <a href="/login" class="material-icons mdc-top-app-bar__action-item" aria-label="Bookmark this page" alt="Bookmark this page">bookmark</a>
            </section>
        </div>
    </header>
</template>


<script>
import {MDCTopAppBar} from '@material/top-app-bar/index';

export default {
  mounted: function(){
    const topAppBarElement = document.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);
  }
}
</script>
