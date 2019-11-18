<script>
export default{
  data () {
    return {}
  },
  created () {
    this.$checkSession('GET')
    this.$store.dispatch('updateIntegral')
    this.$store.dispatch('updateExcount')
  },
}
</script>

<style lang="scss">
button {
  border: none;
  outline: none;
  &::after {
    content: "";
    border: none;
  }
}
.submit-us {
  width: 90%;
  height: 0.7rem;
  line-height: 0.7rem;
  border-radius: 0.5rem;
  font-size: 0.28rem;
  margin: 0.2rem auto;
  text-align: center;
  background: #54bf7b;
  color: #fff;
  margin-top: 1rem;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
