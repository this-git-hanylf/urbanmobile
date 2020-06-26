import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "./index";
// import { Fonts, Metrics, Colors } from '../../Themes/';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.45;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(4);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
    position: "absolute",
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    // backgroundColor: colors.gold,
    // backgroundColor: colors.gold,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.gold
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "contain",
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius
    // backgroundColor: colors.gold
  },
  radiusMaskEven: {
    // backgroundColor: colors.gold
  },
  textContainer: {
    justifyContent: "center",

    paddingTop: 10 - entryBorderRadius,
    paddingBottom: 10,
    paddingHorizontal: 16,
    // backgroundColor: colors.gold,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    // backgroundColor: colors.gold
  },
  title: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5,
    alignItems: "center",
    textAlign: "center"
  },
  titleEven: {
    color: "white"
  },
  subtitle: {
    marginTop: 6,
    color: "white",
    fontSize: 14,
    // fontStyle: 'italic',
    alignItems: "center",
    textAlign: "center"
  },
  subtitleEven: {
    color: "rgba(255, 255, 255, 0.7)"
  }
});
