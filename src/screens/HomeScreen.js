import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
//import components screens
import Categories from '../components/categories';
import Recipes from '../components/recipes';

export default function HomeScreen() {

  const [activeCategory,setActiveCategory] = useState('Beef');
  const [categories,setCategories] = useState([]);
  const [meals,setMeals] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async() =>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      //console.log('got categories: ',response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }

  const getRecipes = async(category="Beef") =>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      //console.log('got recipes: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  

  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <StatusBar style='dark'/>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:50}}
        style={{marginTop:24,paddingTop:56}}
      >
        {/* avatar and bell icon */}
        <View style={{marginHorizontal:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <Image source={require('../../assets/images/avatar.png')} style={{height:hp(5),width:hp(5.5)}}/>
          <BellIcon size={hp(4)} color="gray"/>
        </View>

        {/* greetings and punchline */}
        <View style={{marginHorizontal:16,marginTop:8,marginBottom:8}}>
          <Text style={{fontSize:hp(1.7),color:'#546E7A'}}>Hello, Mert!</Text>
          <View>
            <Text style={{fontSize:hp(3.8),fontWeight:'600',color:'#546E7A'}}>Make your own food,</Text>
          </View>
          <Text style={{fontSize:hp(3.8),fontWeight:'600',color:'#546E7A'}}>
            stay at <Text style={{color:'#f59e0b'}}>home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View style={{marginHorizontal:16,flexDirection:'row',alignItems:'center',borderRadius:999,padding:8,backgroundColor:'#0000001a'}}>
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize:hp(1.7), flex:1,marginBottom:4,paddingLeft:12,letterSpacing:0.8}}/>
            <View style={{backgroundColor:'#fff',borderRadius:999,padding:12}}>
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray"/>
            </View>
        </View>

        {/* categories */}
        <View>
          {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories}/>
        </View>
      </ScrollView>  
    </View>
  )
}

const styles = StyleSheet.create({})