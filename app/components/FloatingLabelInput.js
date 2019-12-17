import React, { Component } from 'react';
import { View, Text, TextInput} from 'react-native';

export default class FloatingLabelInput extends Component {
    state = {
      isFocused: false,
    };
  
    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });
  
    render() {
      const { label, ...props } = this.props;
      const { isFocused } = this.state;
      const labelStyle = {
        position: 'absolute',
        left: 0,
        top: !isFocused ? 10 : 0,
        fontSize: !isFocused ? 20 : 14,
        color: !isFocused ? '#aaa' : '#000',
      };
      return (
        <View style={{ paddingTop: 18 }}>
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
            {...props}
            style={{ height: 50, fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      );
    }
  }