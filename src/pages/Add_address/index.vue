<template>
  <div class="page">
    <view class="row b-b">
      <text class="tit">联系人</text>
      <input
        class="input"
        type="text"
        v-model="addressData.userName"
        placeholder="收货人姓名"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">手机号</text>
      <input
        class="input"
        type="number"
        v-model="addressData.phone"
        placeholder="收货人手机号码"
        maxlength="11"
        placeholder-class="placeholder"
      />
    </view>
    <view class="row b-b">
      <text class="tit">地址</text>
      <text
        @click="chooseLocation"
        class="input"
      >
        {{addressData.address || '点击选择地址'}}
      </text>
    </view>
    <view class="row b-b">
      <text class="tit">门牌号</text>
      <input
        class="input"
        type="text"
        v-model="addressData.area"
        placeholder="楼号、门牌"
        placeholder-class="placeholder"
      />
    </view>

    <view class="row default-row">
      <text class="tit">设为默认</text>
      <switch
        class="fr"
        :checked="addressData.defaultStatus > 0"
        color="#54bf7b"
        @change="switchChange($event)"
      />
    </view>
    <view
      v-if="isEdit"
      class="row default-row del"
      @click="showModal()"
    >
      <text class="tit">删除该收货地址</text>
    </view>
    <button
      class="submit"
      @click="submit"
    >提交</button>
  </div>
</template>
<style lang="scss" scoped>
$font-color-dark: #333;
$font-color-light: #888;
.page {
  height: 100vh;
  width: 100%;
  background: #f8f8f8;
}
img {
  width: 100%;
  height: 100%;
}
.fr {
  float: right;
}
.submit {
  width: 90%;
  height: 0.75rem;
  margin: 0.3rem auto;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #54bf7b;
  color: #fff;
}
.row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 30rpx;
  height: 110rpx;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  .tit {
    flex-shrink: 0;
    width: 120rpx;
    font-size: 30rpx;
    color: $font-color-dark;
  }

  .input {
    flex: 1;
    font-size: 30rpx;
    color: $font-color-dark;
    height: auto;
    height: 100%;
    display: flex;
  }
}

.default-row {
  margin-top: 16upx;
  &.del {
    .tit {
      color: #f22;
    }
  }
  .tit {
    flex: 1;
  }

  switch {
    transform: translateX(16upx) scale(0.9);
  }
}
</style>
<script>
export default {
  data () {
    return {
      addressData: {
        userName: '',
        phone: '',
        address: '',
        area: '',
        defaultStatus: 0
      }
    }
  },
  methods: {
    switchChange(e) {
			this.addressData.defaultStatus = e.mp.detail.value ? 1 : 0;
    },
    chooseLocation () {
      wx.chooseLocation({
        success: (data) => {
          this.addressData.address = data.address
        }
      })
    },
    showModal() {
      wx.showModal({
          title: '确定要删除该地址吗？',
          success:  res => {
            if (res.confirm) {
              this.$post(`member/address/delete/${this.addressData.id}/${this.$store.getters.userInfo.id}`).then(res => {
                if (res.data.code == 200) {
                  this.$toast('删除成功！')
                  setTimeout(() => {
                    wx.navigateBack()
                  }, 1000)
                }
				      })
            }
          }
      })
    },
    submit() {
				var data = this.addressData
				var form = Object.assign({}, this.addressData);
				if (!data.userName) {
					this.$toast('请填写收货人姓名');
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phone)) {
					this.$toast('请输入正确的手机号码');
					return;
				}
				if (!data.address) {
					this.$toast('请在地图选择所在位置');
					return;
				}
				if (!data.area) {
					this.$toast('请填写门牌号信息');
					return;
				}
				if (this.isEdit) {
					this.$post(`member/address/update/${form.id}`, form).then(res => {
						if (res.data.code === 200) {
							this.$toast('修改成功!')
							setTimeout(() => {
								wx.navigateBack();
							}, 1000)
						}
					})
					return
				}
				form.memberId = this.$store.getters.userInfo.id;
				form.userId = this.$store.getters.userInfo.id;
				this.$post('member/address/add', form).then(res => {
					if (res.data.code === 200) {
						this.$toast('添加成功!')
						setTimeout(() => {
							wx.navigateBack();
						}, 1000)
					}
				})
			}
  }
}
</script>