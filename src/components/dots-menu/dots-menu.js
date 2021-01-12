import React from 'react';
import {
  View,
  Text,
  Button as RNButton,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Icon} from 'react-native-elements';
// import {
//   Menu,
//   MenuItem,
//   MenuDivider,
//   Position,
// } from 'react-native-enhanced-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const ElementToStick = React.forwardRef(({style}, ref) => {
  return (
    <View
      ref={ref}
      style={[
        {
          padding: 16,
          borderColor: 'grey',
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      <Text>Element to which menu is sticked</Text>
    </View>
  );
});

const Button = ({title, style, onPress}) => {
  return <View style={style} />;
};

const DotMenu = props => {
  let elementRef = React.createRef();
  let menuRef = null;
  const setMenuRef = ref => (menuRef = ref);
  const hideMenu = () => menuRef?.hide();
  const showMenu = () => {
    menuRef?.show(elementRef.current, Position.BOTTOM_LEFT);
  };

  const onPress = () => showMenu();
  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Menu>
          <MenuTrigger>
            <Icon
              name="dots-vertical"
              color={'red'}
              type="material-community"
              size={35}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
            <MenuOption onSelect={() => alert(`Delete`)}>
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => alert(`Not called`)}
              disabled={true}
              text="Disabled"
            />
          </MenuOptions>
        </Menu>
      </View>
    </>
  );
};

export default DotMenu;
