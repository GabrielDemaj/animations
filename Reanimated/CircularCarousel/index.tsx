import { useRef, useState } from "react";
import { ImageProps } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CircularCarouselListItem, ListItemWidth } from "./list-item";

type CircularCarouselProps = {
  data: ImageProps["source"][];
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data }) => {
  const contentOffset = useSharedValue(0);
  const flatListRef = useRef<Animated.FlatList<ImageProps["source"]>>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = (index: number) => {
    const flatListInstance = flatListRef.current as any;

    if (flatListInstance) {
      const offset = index * ListItemWidth;
      flatListInstance.scrollToOffset({ offset, animated: true });
    }
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentIndex = Math.round(event.contentOffset.x / ListItemWidth);
    runOnJS(setActiveIndex)(currentIndex);
    contentOffset.value = event.contentOffset.x;
  });
  return (
    <Animated.FlatList
      data={data}
      ref={flatListRef}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16} // 60fps -> 16ms (1000ms / 60fps)
      onScroll={scrollHandler}
      pagingEnabled
      snapToInterval={ListItemWidth}
      style={{
        position: "absolute",
        bottom: 0,
        height: 300,
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 1.5 * ListItemWidth,
      }}
      horizontal
      renderItem={({ item, index }) => {
        return (
          <CircularCarouselListItem
            contentOffset={contentOffset}
            imageSrc={item}
            index={index}
            onPress={() => handlePress(index)}
            activeIndex={activeIndex}
          />
        );
      }}
    />
  );
};

export { CircularCarousel };
