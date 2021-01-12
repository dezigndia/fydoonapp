import React, {Component, useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import {Icon} from 'react-native-elements';

const SettingsAccordian = props => {
  const accordian = useRef();
  const data = props.data;
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  return (
    <View style={styles.accordianContainer}>
      <TouchableOpacity
        ref={accordian}
        style={styles.row}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded(!expanded);
        }}>
        <Icon
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          type="material"
          size={30}
          color={'grey'}
        />
        <Text style={[styles.title, styles.font]}>{props.title}</Text>
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <Text style={styles.data}>{data}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  parentHr: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  child: {
    backgroundColor: 'white',
    padding: 16,
  },
  accordianContainer: {
    marginHorizontal: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  data: {
    color: 'grey',
    fontSize: 14,
  },
});

export default SettingsAccordian;
