import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.less'

const listArray = [
  {
    title: '我的收藏',
    icon: require('./images/shoucang.png'),
    url: '/pages/product-list/index?key=收藏'
  },
  {
    title: '常用地址',
    icon: require('./images/address.png'),
    url: '/pages/address/index'
  },
  {
    title: '客服中心',
    icon: require('./images/kefu.png')
  },
]

export default class ListItem extends Component {
  toDetailPage(url) {
    Taro.navigateTo({
      url
    })
  }

  render() {
    return (
      <View className='list-item'>
        {listArray.map((v, i) => (
          <View key={i} className='list-item-content' onClick={this.toDetailPage.bind(this, v.url)}>
            <View className='list-item-left'>
              <Image className='list-item-image' src={v.icon} />
              <Text className='list-item-text'>{v.title}</Text>
            </View>
            <Image className='list-item-right' src={require('./images/right.png')} />
          </View>
        ))}
      </View>
    )
  }
}
