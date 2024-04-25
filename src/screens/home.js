import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Animated,
  Dimensions,
  TextInput,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import useLocalizedStrings from '../translations/useLocalizedStrings';


const MIN_HEADER_HEIGHT = 70;
const MAX_HEADER_HEIGHT = 150;

const windowWidth = Dimensions.get('window').width;

function Home() {
  const localizedStrings = useLocalizedStrings();

  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  const animateHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const animateBalanceLabelOpacity = scrollOffsetY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animateBalanceFontSize = scrollOffsetY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  });

  const floatingHeaderScale = scrollOffsetY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [1, 0.75],
    extrapolate: 'clamp',
  });

  const floatingHeaderTop = scrollOffsetY.interpolate({
    inputRange: [0, MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT],
    outputRange: [120, 8],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.floatingHeader,
          {
            transform: [{scale: floatingHeaderScale}],
            top: floatingHeaderTop,
          },
        ]}>
        <View style={styles.circle} />
        <View style={styles.surveyContainer}>
          <Text style={styles.surveyStep}>1/5</Text>
          <Text style={styles.surveyLabel}>{localizedStrings.surveys}</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
          },
        ]}>
        <Text style={styles.headerTitle}>PoC</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceValue}>123.45</Text>
          <Animated.Text
            style={[
              styles.balanceLabel,
              {
                opacity: animateBalanceLabelOpacity,
                fontSize: animateBalanceFontSize,
              },
            ]}>
            {localizedStrings.my_balance}
          </Animated.Text>
        </View>
      </Animated.View>
      <ScrollView
        style={styles.scroll}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollOffsetY}}}],
          {useNativeDriver: false},
        )}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{localizedStrings.name}: </Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{localizedStrings.email}: </Text>
          <TextInput style={styles.input} keyboardType="email-address" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{localizedStrings.phone}: </Text>
          <TextInput style={styles.input} keyboardType="phone-pad" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{localizedStrings.priority}: </Text>
          <View style={{flex: 1}}>
            <RNPickerSelect
              placeholder={{
                label: localizedStrings.select_priority,
                value: undefined,
                color: 'grey',
              }}
              onValueChange={value => console.log(value)}
              items={[
                {label: localizedStrings.item1, value: 'item1'},
                {label: localizedStrings.item2, value: 'item2'},
                {label: localizedStrings.item3, value: 'item3'},
              ]}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
              textInputProps={{multiline: true}}
            />
          </View>
        </View>

        <Text style={styles.scrollText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
          consectetur libero id faucibus. Ac turpis egestas integer eget
          aliquet. Ut tellus elementum sagittis vitae et leo duis ut. Varius
          quam quisque id diam vel quam elementum. {'\n\n'} Tempor id eu nisl
          nunc mi. Tortor id aliquet lectus proin nibh nisl condimentum id
          venenatis. Magna eget est lorem ipsum dolor sit.{'\n\n'} Hac habitasse
          platea dictumst vestibulum rhoncus est pellentesque. Morbi tristique
          senectus et netus et malesuada fames ac turpis. Nulla aliquet
          porttitor lacus luctus accumsan tortor posuere ac ut.{'\n\n'}
          In iaculis nunc sed augue. Diam sollicitudin tempor id eu nisl nunc mi
          ipsum. Gravida neque convallis a cras semper auctor neque. Etiam
          dignissim diam quis enim lobortis scelerisque fermentum dui faucibus.
          Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt
          ornare massa. Ultricies mi eget mauris pharetra et ultrices. Faucibus
          ornare suspendisse sed nisi lacus sed.{'\n\n'} Lectus magna fringilla
          urna porttitor rhoncus dolor purus. Tortor condimentum lacinia quis
          vel eros donec. Maecenas sed enim ut sem. Amet massa vitae tortor
          condimentum lacinia quis vel. Ultricies integer quis auctor elit sed.
          Pulvinar neque laoreet suspendisse interdum.{'\n\n'} Dis parturient
          montes nascetur ridiculus mus mauris vitae ultricies leo. Pharetra
          convallis posuere morbi leo urna molestie at. Massa sapien faucibus et
          molestie ac feugiat sed lectus.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7aa74c',
  },
  floatingHeader: {
    position: 'absolute',
    top: 120,
    left: (windowWidth - 120) / 2,
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    elevation: 4,
    zIndex: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  surveyContainer: {
    paddingRight: 5,
    alignItems: 'center',
  },
  surveyStep: {
    fontWeight: 'bold',
    fontSize: 14,
    color: "black"
  },
  surveyLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: "black"
  },
  scroll: {
    backgroundColor: 'white',
    paddingTop: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scrollText: {
    fontSize: 16,
    padding: 20,
    lineHeight: 24,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  balanceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  balanceValue: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  inputLabel: {
    width: 60,
    color: "black"
  },
  input: {
    height: 30,
    paddingVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flex: 1,
    color: "black"
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default Home;
