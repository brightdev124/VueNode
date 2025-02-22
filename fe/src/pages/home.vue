<template>
  <div class="global-coupon-list-wraper">
    <explain :explainName="state.explainName"></explain>

    <div class="mb10">
      <div class="condition-wraper">
        <a
          href="javascript:;"
          class="left-wraper choose-condition"
          @click="showRegionList"
        >
          <span>
            <span>{{ regionName }}</span>
          </span>
        </a>
        <a
          href="javascript:;"
          class="right-wraper choose-condition"
          @click="showClassifyList"
        >
          <span>
            <span>{{ classifyName }}</span>
          </span>
        </a>
      </div>

      <!-- 地区列表 -->
      <div
        class="list"
        id="contry-list"
        :class="{ 'dis-block': state.isRegion, 'dis-none': !state.isRegion }"
      >
        <a
          href="javascript:;"
          v-for="(v, k) in state.regionList"
          :key="k"
          @click="showCoupons(v.id, classifyId)"
          :class="{ 'this-type': regionId == v.id }"
        >
          <span>{{ v.regionName }}</span>
        </a>
      </div>

      <!--分类列表 -->
      <div
        class="list"
        id="classify"
        :class="{
          'dis-block': state.isClassify,
          'dis-none': !state.isClassify
        }"
      >
        <a
          href="javascript:;"
          v-for="(v, k) in state.classifyList"
          :key="k"
          @click="showCoupons(regionId, v.id)"
          :class="{ 'this-type': classifyId == v.id }"
        >
          <span>{{ v.classifyName }}</span>
        </a>
      </div>
    </div>

    <div class="coupon-list-wraper">
      <router-link
        v-for="(v, k) in state.couponList"
        :key="k"
        :to="{ path: '/get-coupon', query: { id: v.id, type: 1 } }"
        :class="{
          'use-discount-bg': v.couponStatus == 0,
          'used-bg': v.couponStatus == 1,
          'past-bg': v.couponStatus == 2
        }"
      >
        <div class="shop-ico">
          <img
            :src="v.couponIcoPath"
            :alt="v.couponName"
          />
        </div>
        <div class="shop-intro">
          <div class="shop-title">{{ v.couponName }}</div>
          <div class="shop-price">
            <span class="condition">{{ v.couponExplain }}</span>
          </div>
        </div>
        <div class="shop-active shop-active-canuse">
          <p>已抢</p>
          <p>{{ v.couponReceivedNum }}</p>
          <span
            :class="{
              'use-discount': v.couponStatus == 0,
              used: v.couponStatus == 1,
              past: v.couponStatus == 2
            }"
          ></span>
        </div>
      </router-link>
    </div>

    <a
      href="javascript:;"
      v-if="state.isShowLoadMore"
      class="load-more"
      @click="loadMore"
      >加载更多</a
    >

    <div v-if="state.couponList.length === 0" style="background-color: white">
      <Skeleton title avatar :row="3" />
      <Skeleton title avatar :row="3" />
      <Skeleton title avatar :row="3" />
      <Skeleton title avatar :row="3" />
      <Skeleton title avatar :row="3" />
    </div>

    <footer-nav></footer-nav>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ComputedRef, onMounted } from 'vue'

import { useStore } from 'vuex'

import { StateProps } from '@/store'

import { getCouponsList, getClassifyList, getRegionList } from '@/api/coupon'

import { Dialog, Skeleton } from 'vant'

import Explain from '@/components/header-explain/index.vue'

import FooterNav from '@/components/footer-nav/index.vue'

type State = {
  explainName: string
  isRegion: boolean
  regionList: any[]
  classifyList: any[]
  isClassify: boolean
  currentPage: number
  couponList: any[]
  isShowLoadMore: boolean
}

function _getClassifyList(state: State) {
  getClassifyList().then(res => {
    const { apiCode, data } = res.data
    if (apiCode === 0) {
      state.classifyList = data
    }
  })
}

function _getCouponsList(
  state: State,
  regionId: number,
  classifyId: number,
  currentPage: number
) {
  getCouponsList(regionId, classifyId, currentPage)
    .then(res => {
      const { apiCode, data, message } = res.data
      if (apiCode === 0) {
        state.couponList.push.apply(state.couponList, data)
        if (!data.length) {
          state.isShowLoadMore = false
        }
      } else {
        Dialog.alert({ message })
      }
    })
    .catch(error => {
      Dialog.alert({
        message: '优惠券列表获取失败，请稍后再试'
      })
    })
}

function _getRegionList(state: State) {
  getRegionList().then(res => {
    const { apiCode, data } = res.data
    if (apiCode === 0) {
      state.regionList = data
    }
  })
}

const store = useStore<StateProps>()

const regionId: ComputedRef<number> = computed(
  () => store.state.app.regionId
)

const regionName: ComputedRef<string> = computed(
  () => store.state.app.regionName
)

const classifyId: ComputedRef<number> = computed(
  () => store.state.app.classifyId
)

const classifyName: ComputedRef<string> = computed(
  () => store.state.app.classifyName
)

const state: State = reactive({
  explainName: '全球优惠',
  isRegion: false,
  regionList: [],
  classifyList: [],
  isClassify: false,
  currentPage: 1,
  couponList: [],
  isShowLoadMore: true
})

const showRegionList = () => {
  state.isRegion = true
  state.isClassify = false
}

const showClassifyList = () => {
  state.isRegion = false
  if (!state.classifyList.length) {
    _getClassifyList(state)
  }
  state.isClassify = true
}

const showCoupons = (regionId: number, classifyId: number) => {
  const currentregionName = state.regionList
    ? state.regionList[regionId - 1].regionName
    : '全球'
  const currentClassifyName = state.classifyList
    ? state.classifyList[classifyId - 1].classifyName
    : '购物'

  state.currentPage = 1
  state.couponList = []

  store.commit('app/changeRegionId', regionId)
  store.commit('app/changeRegionName', currentregionName)
  store.commit('app/changeClassifyId', classifyId)
  store.commit('app/changeClassifyName', currentClassifyName)

  _getCouponsList(state, regionId, classifyId, state.currentPage)

  state.isRegion = state.isClassify = false
}

const loadMore = () => {
  state.currentPage += 1
  _getCouponsList(
    state,
    regionId.value,
    classifyId.value,
    state.currentPage
  )
}

onMounted(() => {
  _getClassifyList(state)

  _getRegionList(state)

  _getCouponsList(
    state,
    regionId.value,
    classifyId.value,
    state.currentPage
  )
})
</script>

<style lang="less" scoped>
@import '../static/less/coupon.less';

.mb10 {
  margin-bottom: 10px;
}

.global-coupon-list-wraper {
  .condition-wraper {
    display: flex;
    background-color: #fff;
    border-top: 1px solid #f1f4fd;
    .choose-condition {
      flex: 1;
      position: relative;
      height: 45px;
      color: #383838;
      &.left-wraper span {
        border-right: 1px solid #e6e6e6;
        font {
          width: 73px;
          background-position: 62px 8px;
        }
      }
      &.right-wraper span font {
        width: 62px;
        background-position: 50px 8px;
      }
      span {
        display: block;
        position: absolute;
        top: 10px;
        width: 100%;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font {
          display: block;
          margin: 0 auto;
          background-image: url('../static/images/downarrows.png');
          background-repeat: no-repeat;
          background-size: 12px 12px;
        }
      }
    }
  }
  .list {
    position: fixed;
    left: 0;
    top: 91px;
    z-index: 10001;
    width: 100%;
    background-color: #fafbfc;
    a {
      display: block;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #383838;
      font-size: 16px;
      &.this-type span {
        display: inline-block;
        width: 118px;
        color: #2577e3;
        background-image: url('../static/images/check.png');
        background-repeat: no-repeat;
        background-position: 92px 5px;
        background-size: 32px 32px;
      }
    }
  }
  .coupon-list-wraper {
    margin: 0 3%;
  }
  .load-more {
    display: block;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
  }
}
</style>
