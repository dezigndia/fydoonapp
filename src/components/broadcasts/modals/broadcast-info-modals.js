import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from '../../../styles/group-details-styles';
const BroadcastinfoModals = props => {
  return (
    <>{props.currentModal === 'edit-name' && <EditNameModal {...props} />}</>
  );
};
export default BroadcastinfoModals;
const EditNameModal = props => {
  const [name, setName] = useState(props.name);

  return (
    <View style={styles.overlay}>
      <Text style={styles.overlayTitle}>Edit Broadcast Name</Text>
      <TextInput
        placeholder="Enter broadcast name"
        style={styles.overlayInput}
        value={name}
        maxLength={30}
        onChangeText={text => {
          setName(text);
        }}
      />
      <View style={styles.overlayButtonContainer}>
        <Button
          title="Cancel"
          titleStyle={styles.cancelBtnTxt}
          buttonStyle={styles.cancelBtnBgClr}
          containerStyle={styles.cancelBtn}
          onPress={() => {
            props.onCancel();
          }}
        />
        <Button
          title="Submit"
          buttonStyle={styles.addBtnBgClr}
          containerStyle={styles.addBtn}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};
