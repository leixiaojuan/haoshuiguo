import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { bindActionCreators } from 'redux'
import { View } from '@tarojs/components'
import Space from '../../components/space/index'
import ProductSwiper from './components/product-swiper/index'
import ProductHeader from './components/product-header/index'
import ProductNumber from './components/product-number/index'
import ProductAction from './components/product-action/index'
import ProductIntroduce from './components/product-introduct/index'
import { productDetailInit } from './redux';

import './index.less'

const mapStateToProps = ({ productDetail }) => ({
  ...productDetail,
})
const mapActionsToProps = dispatch => bindActionCreators({
  productDetailInit,
}, dispatch)

@connect(
  mapStateToProps,
  mapActionsToProps,
)

export default class ProductDetail extends Component {
  config = {
    navigationBarTitleText: '商品详情'
  }

  constructor() {
    super(...arguments)
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentDidMount() {
    this.props.productDetailInit()
  }

  onPullDownRefresh() {
    this.props.productDetailInit(true, () => {
      Taro.stopPullDownRefresh()
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    const { init, detail } = this.props
    return (
      <View className='product-detail'>
        {
          init &&
          <View>
            <ProductSwiper data={detail.slide} />
            <ProductHeader data={detail} />
            <Space />
            <ProductNumber />
            <Space />
            <ProductIntroduce data={detail.introduce} />
            <ProductAction data={detail} />
          </View>
        }
      </View>
    )
  }
}

