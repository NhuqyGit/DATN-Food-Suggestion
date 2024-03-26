import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PopularItem from '../../components/PopularItem/PopularItem'
import DishItem from '../../components/DishItem/DishItem'
import { ScrollView } from 'react-native'
import HistoryItem from '../../components/HistoryItem/HistoryItem'
import SearchResultItem from '../../components/SearchResultItem/SearchResultItem'
import SearchHeader from './components/SearchHeader'
import { AntDesign } from '@expo/vector-icons'

const SearchScreen = () => {
  const mockPopular = [
    {
      id: 1,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'gà rán',
    },
    {
      id: 2,
      image:
        'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg',
      title: 'bánh mì',
    },
    {
      id: 3,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'kẹo dẻo',
    },
    {
      id: 4,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'rau củ',
    },
    {
      id: 5,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'dầu palm',
    },
    {
      id: 6,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'thịt bò',
    },
    {
      id: 7,
      image: 'https://cdn.tgdd.vn/2020/11/CookProduct/thum-1200x676.jpg',
      title: 'kem',
    },
    {
      id: 8,
      image:
        'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_04_24/qua-viet-quoc-781.jpg',
      title: 'quả việt quất',
    },
    {
      id: 9,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'tỏi',
    },
    {
      id: 10,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'gà rán',
    },
    {
      id: 11,
      image:
        'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg',
      title: 'bánh mì',
    },
    {
      id: 12,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'kẹo dẻo',
    },
    {
      id: 13,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'gà rán',
    },
    {
      id: 14,
      image:
        'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg',
      title: 'bánh mì',
    },
    {
      id: 15,
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
      title: 'kẹo dẻo',
    },
  ]

  const mockDish = [
    {
      id: 1,
      image:
        'https://cdn.tgdd.vn/Files/2019/08/29/1192773/cac-mon-rau-xao-voi-thit-bo-vua-ngon-vua-nhanh-lai-de-lam-201908290901015964.jpg',
      title: 'Thịt bò xào đậu que',
    },
    {
      id: 2,
      image:
        'https://cdn.tgdd.vn/Files/2019/07/04/1177219/chong-ngay-bua-an-voi-salad-tron-thit-bo-de-lam-tai-nha-202302011119485860.jpg',
      title: 'Xà lách trộn thịt bò',
    },
    {
      id: 3,
      image:
        'https://fujifoods.vn/wp-content/uploads/2021/05/canh-dua-chua-thit-bo-3.jpg',
      title: 'Canh bò nấu dưa cải chua',
    },
    {
      id: 4,
      image:
        'https://cdn.tgdd.vn/Files/2020/12/15/1313887/cach-lam-bo-sot-me-mem-va-tham-vi-khong-bi-dai-202109281647359478.jpg',
      title: 'Bắp bò xốt me',
    },
    {
      id: 5,
      image:
        'https://cdn.tgdd.vn/Files/2018/04/01/1078873/nau-bun-bo-hue-cuc-de-tai-nha-tu-vien-gia-vi-co-san-202109161718049940.jpg',
      title: 'Bún bò Huế',
    },
    {
      id: 6,
      image:
        'https://hidafoods.vn/wp-content/uploads/2023/07/cach-lam-bo-luc-lac-thom-ngon-chuan-vi-nha-hang-1.jpg',
      title: 'Bò lúc lắc',
    },
  ]

  const mockHistory = [
    {
      id: 1,
      title: 'Thịt bò',
    },
    {
      id: 2,
      title: 'Xà lách',
    },
    {
      id: 3,
      title: 'Dưa cải chua',
    },
  ]

  const mockSearchResult = [
    {
      id: 1,
      title: 'Breakfast with bread, eggs and bacon',
      author: 'Tan Sang',
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
    },
    {
      id: 2,
      title: 'Bun bo Hue with new broth, best recipe from around the world',
      author: 'Tan Sang',
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
    },
    {
      id: 3,
      title: 'Breakfast with bread, eggs and bacon',
      author: 'Tan Sang',
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
    },
    {
      id: 4,
      title: 'Bun bo Hue with new broth, best recipe from around the world',
      author: 'Tan Sang',
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
    },
    {
      id: 5,
      title: 'Breakfast with bread, eggs and bacon',
      author: 'Tan Sang',
      image: 'https://cdn.tgdd.vn/2020/12/CookProduct/2-1200x676-1.jpg',
    },
  ]

  const [isFocusSearch, setIsFocusSearch] = useState(true)
  const [searchText, setSearchText] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper} scrollEnabled vertical>
        <SearchHeader
          setIsFocusSearch={setIsFocusSearch}
          setSearchText={setSearchText}
        />

        {!isFocusSearch ? (
          <View>
            <View style={styles.popularWrapper}>
              <Text style={styles.title}>Các nguyên liệu phổ biến nhất</Text>
              <View style={styles.popularList}>
                {mockPopular.map((item) => (
                  <PopularItem key={item.id} item={item} />
                ))}
              </View>
            </View>
            <View style={styles.popularWrapper}>
              <Text style={styles.title}>Món Mới Nhất</Text>
              <View style={styles.popularList}>
                {mockDish.map((item) => (
                  <DishItem key={item.id} item={item} />
                ))}
              </View>
            </View>
          </View>
        ) : (
          <>
            {!searchText ? (
              <View style={styles.popularWrapper}>
                <Text style={styles.title}>Tìm kiếm gần đây</Text>

                <View style={styles.historyList}>
                  {mockHistory.map((item) => (
                    <HistoryItem key={item.id} item={item} />
                  ))}
                </View>

                <TouchableOpacity style={styles.footer}>
                  <Text style={styles.removeHistoryButton}>
                    Xóa lịch sử tìm kiếm
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.popularWrapper}>
                  <View style={styles.titleContainer}>
                    <Text
                      style={styles.title}
                    >{`${mockHistory.length} results`}</Text>
                    <TouchableOpacity style={styles.titleContainer}>
                      <Text style={styles.filter}>{'Filter'}</Text>
                      <AntDesign
                        style={styles.searchIcon}
                        name='down'
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                  {mockSearchResult?.map((item) => (
                    <SearchResultItem key={item.id} item={item} />
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
  },

  popularWrapper: {
    padding: 16,
    gap: 16,
  },

  historyList: {
    flexDirection: 'column',
    gap: 16,
  },

  removeHistoryButton: {
    marginTop: 'auto',
    textAlign: 'center',
    borderRadius: 100,
    borderBlockColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },

  popularList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  filter: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default SearchScreen

