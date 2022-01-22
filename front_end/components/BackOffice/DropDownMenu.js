import React, {useState} from 'react';
import {TouchableOpacity, View} from "react-native";
import {ListItem, Icon} from 'react-native-elements'
import ChangePasswordForm from "./ChangePasswordForm";

const DropDownMenu = () => {

    const [showForm, setShowForm] = useState(false);


    const isPasswordForm = () => {

    }

    return (
        <View>
            <TouchableOpacity>
                <ListItem key='change-pass' bottomDivider onPress={() => setShowForm(!showForm)}>
                    <Icon name="vpn-key"/>
                    <ListItem.Content>
                        <ListItem.Title>Сменить пароль</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            </TouchableOpacity>
            {/*<TouchableOpacity>
                <ListItem key='Еще что-то' bottomDivider>
                    <Icon name="flag"/>
                    <ListItem.Content>
                        <ListItem.Title>Еще что-то</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron/>
                </ListItem>
            </TouchableOpacity>*/}
            {showForm ? <ChangePasswordForm/> : null}
        </View>
    );
};

export default DropDownMenu;