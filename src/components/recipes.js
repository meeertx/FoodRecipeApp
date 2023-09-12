import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated,{ FadeInDown } from 'react-native-reanimated';
import MasonryList from '@react-native-seoul/masonry-list';

import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

export default function Recipes({categories,meals}) {
  const navigation = useNavigation();
  return (
    <View style={{marginHorizontal:16,marginTop:12}}>
      <Text style={{fontSize:hp(3),fontWeight:'600',color:'#525252'}}>Recipes</Text>
      <View>
        {
          categories.length==0 || meals.length==0 ?(
          <Loading style={{marginTop:80,fontSize:40}} />
          ) :(
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({item,i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
            //refreshing={isLoadingNext}
            //onRefresh={() => refetch({first: ITEM_CNT})}
            onEndReachedThreshold={0.1}
            //onEndReached={() => loadNext(ITEM_CNT)}
          />
          )
        }
        
      </View>
    </View>
  )
}

const RecipeCard = ({item,index,navigation}) =>{
    const isEven = index %2 ==0;
    return(
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
                style={{width:'100%',flex:1,justifyContent:'center',marginBottom:16,marginTop:4,paddingLeft:isEven ? 0:8,paddingRight:isEven ? 8:0}}
                onPress={()=> navigation.navigate('RecipeDetail', {...item})}
            >  
               {/* <Image
                  source={{uri:item.strMealThumb}}
                  style={{width:'100%',height: index%3 ==0 ? hp(25):hp(35),backgroundColor:'#d4d4d4',borderRadius:35}}
                />    */}
                <CachedImage 
                  uri={item.strMealThumb}
                  style={{width:'100%',height: index%3 ==0 ? hp(25):hp(35),backgroundColor:'#d4d4d4',borderRadius:35}} 
                  sharedTransitionTag={item.strMeal}
                />
                <Text style={{fontWeight:'600',marginLeft:8,color:'#525252',fontSize:hp(1.5)}}>
                  {
                    item.strMeal.length>20 ? item.strMeal.slice(0,20)+'...' : item.strMeal
                  }
                </Text>
            </Pressable>   
        </Animated.View>
    )
}

const styles = StyleSheet.create({})