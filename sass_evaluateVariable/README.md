      %color-1{
        background-color:#20337f !important;
      }
      %color-2{
        background-color:#8493ca !important;
      }
      %color-3{
        background-color:#f26222 !important;
      }
      @mixin set-color($arg) {
        @extend %color-#{$arg};
      }
      text-align:center;
      @for $i from 1 through 3{
        li:nth-of-type(#{$i}){
          .title{
            @include set-color(#{$i});
          }
          a.info{
            @include set-color(#{$i});
          }
        }
      }




http://krasimirtsonev.com/blog/article/SASS-interpolation-in-a-name-of-variable-nest-variables-within-variables