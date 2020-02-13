import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  Dimensions,
  LayoutAnimation,
  UIManager
} from 'react-native';

const width = Dimensions.get('window').width;

class Item extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);

    if( Platform.OS === 'android' ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.item.id !== this.props.item.id) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.afterAnimationComplete();
    });
  }

  removeItem = () => {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }
    ).start(() => {
      this.props.removeItem(this.props.item.id);
    });
  }

  render() {
    const translateAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-width, 0, width]
    });

    const opacityAnimation = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    });

    return (
      <Animated.View style={[
        styles.viewHolder, {
          transform: [{ translateX: translateAnimation}],
          opacity: opacityAnimation
        }]}
      >
        <Text
          style={styles.text}>
            Row {this.props.item.text}
        </Text>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={this.removeItem}
        >
          <Image
            source={require('./assets/images/add.png')}
            style={styles.removeIcon}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = { valueArray: [], disabled: false }
    this.addNewEle = false;
    this.index = 0;
  }

  afterAnimationComplete = () => {
    this.index += 1;
    this.setState({ disabled: false });
  }

  addMore = () => {
    this.addNewEle = true;
    const newlyAddedValue = { id: "id_" + this.index, text: this.index + 1 };

    this.setState({
      disabled: true,
      valueArray: [...this.state.valueArray, newlyAddedValue]
    });
  }

  remove(id) {
    this.addNewEle = false;
    const newArray = [...this.state.valueArray];
    newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

    this.setState(() => {
      return {
        valueArray: newArray
      }
    }, () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollView => this.scrollView = scrollView}
          onContentSizeChange={()=> {        
            this.addNewEle && this.scrollView.scrollToEnd();
          }}
        >
          <View style={{ flex: 1, padding: 4 }}>
            {this.state.valueArray.map(ele => {
              return (
                <Item
                  key={ele.id}
                  item={ele}
                  removeItem={(id) => this.remove(id)}
                  afterAnimationComplete={this.afterAnimationComplete}
                />
              )
            })}
          </View>
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          disabled={this.state.disabled}
          onPress={this.addMore}
        >
          <Image source = { require('./assets/images/add.png') } style = { styles.btnImage }/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingTop: (Platform.OS == 'ios') ? 20 : 0
  },

  viewHolder: {
    paddingVertical: 15,
    backgroundColor: '#B00020',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: 4,
    paddingLeft: 15,
    borderRadius: 10
  },

  text: {
    color: 'white',
    fontSize: 25,
    paddingRight: 17
  },

  btn: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15
  },

  btnImage: {
    resizeMode: 'contain',
    width: '100%',
    tintColor: 'white'
  },

  removeBtn: {
    position: 'absolute',
    right: 13,
    width: 25,
    height: 25,
    borderRadius: 15,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  removeIcon: {
    width: '100%',
    transform: [{ rotate: '45deg' }],
    resizeMode: 'contain'
  }
});