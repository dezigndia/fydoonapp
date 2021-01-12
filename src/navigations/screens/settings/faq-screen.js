import React, {useState} from 'react';
import {styles} from '../../../styles/setting-component-styles';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon, Image, Button} from 'react-native-elements';
import SettingComponentHeader from '../../../components/settings/setting-component-header';
import SettingsAccordian from '../../../components/accordion/accordion';

const FAQScreen = ({navigation}) => {
  const menu = [
    {
      title: 'Non Veg Biryanis',
      data:
        'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    },
    {
      title: 'Pizzas',
      data:
        'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.',
    },
    {
      title: 'Drinks',
      data:
        'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.',
    },
    {
      title: 'Deserts',
      data:
        'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    },
  ];

  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.mainContainer}>
        <SettingComponentHeader title="FAQs" navigation={navigation} />
        <ScrollView
          style={[styles.mainContainer, {paddingBottom: 20}]}
          showsVerticalScrollIndicator={false}>
          <Image
            resizeMode={'stretch'}
            source={{
              uri: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
            }}
            style={styles.image}
          />
          <Text style={styles.para}>
            When you give a feedback, It means you offer a helpful response to
            someone's work or idea. Feedback is almost offered or requested with
            the intention of improving the final product. Another meaning of
            feedback is a kind of sound disortion from an ampilifier microphone.
          </Text>
          <View style={styles.hrLine} />

          {menu.map((item, index) => (
            <SettingsAccordian
              key={index}
              title={item.title}
              data={item.data}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FAQScreen;
