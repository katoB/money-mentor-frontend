import React from "react";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../common/styles";
import {
  Text,
  View,
  Switch,
  Animated,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Button } from "react-native-elements";
import { transactionIconType } from "../../common/index";
import { connect } from "react-redux";
import { updateTrans, fetchAcctTransData } from "../../store";
import CategoryPicker from './CategoryPicker'

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;

    this.state = {
      expanded: false,
      picker: false
    };
    this.toggleInfo = this.toggleInfo.bind(this);
    this.includedToggle = this.includedToggle.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
    this.changeCategory = this.changeCategory.bind(this);

  }

  toggleInfo() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  togglePicker() {
    this.setState({
      picker: !this.state.picker
    });
  }


  includedToggle() {
    this.props.updateTrans({
        ...this.props.transaction,
        included: !this.props.transaction.included,
      });
  }

  changeCategory(event) {
    this.props.updateTrans({
        ...this.props.transaction,
        category1: event
      });
  }

  render() {
    const icons = {
      up: "chevron-up",
      down: "chevron-down"
    };

    let icon = icons.down;

    if (this.state.expanded) {
      icon = icons.up;
    } else {
      icon = icons.down;
    }

    const transaction = this.props.transaction;
    console.log('transaction======', transaction)
    const info = (
      <View style={styles.transBody}>
        <View style={{paddingRight: 20}}>
          <View style={{paddingBottom: 20}}>
            <Text style={{ fontWeight: "bold" }}> Date: </Text>
            <Text>{transaction.date}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}> Included in Budget: </Text>
            <Switch
              value={this.props.transaction.included}
              onValueChange={this.includedToggle}
            />
          </View>
        </View>
        <View style={{borderWidth: 1, borderColor: '#000000'}}>
          <Text style={{ fontWeight: "bold" }}> Category: </Text>
          <Text>{transaction.category1}</Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={
              this.togglePicker}
          >
            <Text style={styles.buttonText}>EDIT</Text>
          </TouchableHighlight>

{this.state.picker && <CategoryPicker transactionId={transaction.id} changeCategory={this.changeCategory}/>}


        </View>

      </View>
    );

    return (
      <View>
        <ListItem
          key={transaction.id}
          title={transaction.name}
          subtitle={transaction.category1}
          rightTitle={`$ ${transaction.amount}`}
          onPress={() => this.toggleInfo()}
          rightIcon={<Icon name={icon} />}
          leftIcon={{
            name: transactionIconType[transaction.category2]
          }}
        />

        {this.state.expanded && info}
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    updateTrans: trans => dispatch(updateTrans(trans)),
    fetchAcctTransData: () => dispatch(fetchAcctTransData())
  };
};

export default connect(
  null,
  mapDispatch
)(Transaction);
