import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { CachedImage } from '../helpers/image';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import Animated,{ FadeInDown,FadeIn } from 'react-native-reanimated';
import { Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import YouTubeIframe from 'react-native-youtube-iframe';

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const navigation = useNavigation();
  const [isFavourite,setIsFavourite] = useState(false);
  const [meals,setMeals] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    getMealData(item.idMeal);
  },[])

  const getMealData = async(id) =>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      //console.log('got recipes: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals[0]);
        setLoading(false);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }

  const ingredientsIndexes = (meal) =>{
    if(!meal) return [];
    let indexes = [];
    for(let i=1 ; i<=20; i++){
      if(meal['strIngredient'+i]){
        indexes.push(i)
      }
    }

    return indexes;
  }

  const getYoutubeVideoId = url=>{
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if(match && match[1]){
      return match[1];
    }
    return null;
  }

  return (
    <ScrollView 
      style={{flex:1,backgroundColor:'#fff'}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:30}}
    >
      <StatusBar style='light'/>

      {/* recipe image */}
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <CachedImage
          sharedTransitionTag={item.strMeal}
          uri={item.strMealThumb}
          style={{width:wp(98),height:hp(50),borderRadius:53,borderBottomLeftRadius:40,borderBottomRightRadius:40,marginTop:4}}
        />
      </View>

      {/* back button */}
      <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{width:'100%',position:'absolute',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:56}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style={{padding:8,borderRadius:999,marginLeft:20,backgroundColor:'#fff'}}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24"/> 
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setIsFavourite(!isFavourite)} style={{padding:8,borderRadius:999,marginRight:20,backgroundColor:'#fff'}}>
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"}/> 
        </TouchableOpacity>
      </Animated.View>    

      {/* meal description */}
      {
        loading? (
          <Loading size="large" style={{marginTop:64}}/>
        ):(
          <View style={{paddingHorizontal:16,justifyContent:'space-between',marginTop:16,paddingTop:32}}>
            {/* name and area */}
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{marginTop:8}}>
              <Text style={{fontSize:hp(3),fontWeight:'bold',flex:1,color:'#404040'}}>
                {meals?.strMeal}
              </Text>
              <Text style={{fontSize:hp(2),fontWeight:'600',flex:1,color:'#737373'}}>
                {meals?.strArea}
              </Text>
            </Animated.View>
            {/* misc */}
            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                <View style={{borderRadius:999,backgroundColor:'#fcd34d',padding:8}}>
                  <View style={{height:hp(6.5),width:hp(6.5),backgroundColor:'#fff',borderRadius:999,alignItems:'center',justifyContent:'center'}}>
                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                  </View>
                  <View style={{alignItems:'center',paddingVertical:8,marginTop:4}}>
                    <Text style={{fontSize:hp(2),fontWeight:'bold',color:'#404040'}}>
                      35
                    </Text>
                    <Text style={{fontSize:hp(1.3),fontWeight:'bold',color:'#404040'}}>
                      Mins
                    </Text>
                  </View>
                </View>

                <View style={{borderRadius:999,backgroundColor:'#fcd34d',padding:8}}>
                  <View style={{height:hp(6.5),width:hp(6.5),backgroundColor:'#fff',borderRadius:999,alignItems:'center',justifyContent:'center'}}>
                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                  </View>
                  <View style={{alignItems:'center',paddingVertical:8,marginTop:4}}>
                    <Text style={{fontSize:hp(2),fontWeight:'bold',color:'#404040'}}>
                      03
                    </Text>
                    <Text style={{fontSize:hp(1.3),fontWeight:'bold',color:'#404040'}}>
                      Servings
                    </Text>
                  </View>
                </View>

                <View style={{borderRadius:999,backgroundColor:'#fcd34d',padding:8}}>
                  <View style={{height:hp(6.5),width:hp(6.5),backgroundColor:'#fff',borderRadius:999,alignItems:'center',justifyContent:'center'}}>
                    <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                  </View>
                  <View style={{alignItems:'center',paddingVertical:8,marginTop:4}}>
                    <Text style={{fontSize:hp(2),fontWeight:'bold',color:'#404040'}}>
                      103
                    </Text>
                    <Text style={{fontSize:hp(1.3),fontWeight:'bold',color:'#404040'}}>
                      Cal
                    </Text>
                  </View>
                </View>

                <View style={{borderRadius:999,backgroundColor:'#fcd34d',padding:8}}>
                  <View style={{height:hp(6.5),width:hp(6.5),backgroundColor:'#fff',borderRadius:999,alignItems:'center',justifyContent:'center'}}>
                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252"/>
                  </View>
                  <View style={{alignItems:'center',paddingVertical:8,marginTop:4}}>
                    <Text style={{fontSize:hp(2),fontWeight:'bold',color:'#404040'}}>
                      
                    </Text>
                    <Text style={{fontSize:hp(1.3),fontWeight:'bold',color:'#404040'}}>
                      Easy
                    </Text>
                  </View>
                </View>
            </Animated.View>
            {/* ingredients */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={{marginTop:16}}>
              <Text style={{fontSize:hp(2.5),fontWeight:'bold',color:'#404040'}}>
                Ingredients
              </Text>
              <View style={{marginTop:8,marginLeft:12}}>
                {
                  ingredientsIndexes(meals).map(i=>{
                    return(
                      <View key={i} style={{flexDirection:'row',marginLeft:16,paddingVertical:4}}>
                        <View style={{height:hp(1.5),width:hp(1.2),borderRadius:999,backgroundColor:'#fcd34d'}} />
                        <View style={{flexDirection:'row',marginLeft:8}}>
                          <Text style={{fontWeight:'bold',color:'#404040',fontSize:hp(1.7)}}>{meals["strMeasure"+i]} </Text>
                          <Text style={{fontWeight:'600',color:'#525252',fontSize:hp(1.7)}}> {meals["strIngredient"+i]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>

            {/* instructions */}
            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={{marginTop:16}}>
              <Text style={{fontSize:hp(2.5),fontWeight:'bold',color:'#404040'}}>
                Instructions
              </Text>
              <Text style={{fontSize:hp(1.6),color:'#404040'}} >
                {
                  meals?.strInstructions
                }
              </Text>
            </Animated.View>

            {/* recipe video */}
            {
              meals.strYoutube && (
                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} style={{marginTop:16}}>
                  <Text style={{fontSize:hp(2.5),fontWeight:'bold',color:'#404040'}}>
                    Recipe Video
                  </Text>
                  <View>
                    <YouTubeIframe
                      videoId={getYoutubeVideoId(meals.strYoutube)}
                      height={hp(30)}
                    />
                  </View>
                </Animated.View>
              )
            }
          </View>
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({})