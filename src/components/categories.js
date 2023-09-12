import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated,{ FadeInDown } from 'react-native-reanimated';

import { CachedImage } from '../helpers/image';

export default function Categories({categories,activeCategory,handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()} style={{marginTop:20,flex:1}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:15}}
      >
        {
            categories.map((cat,index) => {
                const isActive = cat.strCategory === activeCategory;
                const activeButtonStyle = {
                  backgroundColor: isActive ? '#fbbf24' : '#d4d4d8',
                };
                return(
                    <TouchableOpacity
                        key={index}
                        onPress={() =>handleChangeCategory(cat.strCategory)}
                        style={{flex:1,alignItems:'center',marginTop:4}}
                    >
                        <View style={[{borderRadius:999,padding:6,marginHorizontal:4},activeButtonStyle]}>
                            {/* <Image
                                source={{uri:cat.strCategoryThumb}}
                                style={{width:hp(6),height:hp(6),borderRadius:999}}
                            />     */}
                            <CachedImage 
                               uri={cat.strCategoryThumb}
                               style={{width:hp(6),height:hp(6),borderRadius:999}}
                            />
                        </View>
                        <Text style={{fontSize:hp(1.6),color:'#757575'}}>{cat.strCategory}</Text>
                    </TouchableOpacity>    
                )
            })
        }

      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({})