import React, {useState} from 'react';
import {styles} from '../../styles/live-chat-styles';
import {Avatar, Badge, Icon} from 'react-native-elements';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {BaseBackgroundColors} from '../../styles/constants';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const {Popover} = renderers;
const LiveMembersStickyBar = props => {
  const image = 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY';
  const [onlineMemebes, setOnlineMembers] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  return (
    <>
      {onlineMemebes.length > 0 && (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <FlatList
            contentContainerStyle={{
              flexDirection: 'row',
              backgroundColor: 'white',
            }}
            showsHorizontalScrollIndicator={false}
            data={onlineMemebes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <StickyBarItem image={image} key={index} />
            )}
          />
        </ScrollView>
      )}
    </>
  );
};
const StickyBarItem = ({image}) => {
  return (
    <Menu renderer={Popover} rendererProps={{preferredPlacement: 'bottom'}}>
      <MenuTrigger style={styles.stickBarItem}>
        <Avatar
          rounded
          source={
            image != ''
              ? {
                  uri: image,
                }
              : null
          }
          icon={{
            name: 'person',
            type: 'material',
            size: 28,
            color: 'white',
          }}
          avatarStyle={{borderRadius: 150}}
          titleStyle={{fontSize: 40}}
          containerStyle={{
            backgroundColor: 'lightgrey',
          }}
          size="medium"
        />
        <Badge
          status="success"
          containerStyle={{
            position: 'absolute',
            bottom: 6,
            right: 8,
            zIndex: 1,
          }}
          badgeStyle={{
            height: 12,
            width: 12,
            borderRadius: 150,
          }}
        />
      </MenuTrigger>
      <MenuOptions style={styles.menu}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'left',
              fontSize: 14,
              marginLeft: 5,
              maxWidth: 100,
            }}>
            Vishal kapoor
          </Text>
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'right',
              maxWidth: 100,
              fontSize: 12,
              color: 'grey',
              marginHorizontal: 5,
            }}>
            12m away
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MenuOption
            onSelect={() => alert(`SwitchIn`, 'Comming soon')}
            style={styles.menuitem}>
            <Icon
              name={'person'}
              type="material"
              size={24}
              color={BaseBackgroundColors.profileColor}
            />
          </MenuOption>
          <MenuOption
            onSelect={() => alert(`SwitchIn`, 'Comming soon')}
            style={styles.menuitem}>
            <Icon
              name={'person-add'}
              type="material"
              size={24}
              color={BaseBackgroundColors.profileColor}
            />
          </MenuOption>

          <MenuOption
            onSelect={() => alert(`SwitchIn`, 'Comming soon')}
            style={styles.menuitem}>
            <Icon
              name={'message-circle'}
              type="feather"
              size={24}
              color={BaseBackgroundColors.profileColor}
            />
          </MenuOption>

          <MenuOption
            onSelect={() => alert(`SwitchIn`, 'Comming soon')}
            style={styles.menuitem}>
            <Icon
              name={'gift-outline'}
              type="material-community"
              size={24}
              color={BaseBackgroundColors.profileColor}
            />
          </MenuOption>

          <MenuOption
            onSelect={() => alert(`SwitchIn`, 'Comming soon')}
            style={styles.menuitem}>
            <Icon
              name={'block'}
              type="material"
              size={24}
              color={BaseBackgroundColors.profileColor}
            />
          </MenuOption>
        </View>
      </MenuOptions>
    </Menu>
  );
};
export default LiveMembersStickyBar;
