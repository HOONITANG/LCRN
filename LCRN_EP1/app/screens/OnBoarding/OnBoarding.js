import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Animated,
    Image,
    TouchableOpacity
} from 'react-native';

// Constants
import { images, theme } from '../../constans';
const { onboarding1, onboarding2, onboarding3 } = images;
// Theme
const { COLORS, FONTS, SIZES } = theme;

// Dummy Data
const onBoardings = [
    {
        title: "Let's Travelling",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding1
    },
    {
        title: "Navigation",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding2
    },
    {
        title: "Destination",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
        img: onboarding3
    }
];


const OnBoarding = () => {
    
    const [completed, setCompleted] = React.useState(false);
    const scrollX = new Animated.Value(0);

    React.useEffect(() => {
        // To check if user has finished scrolling the onboarding pages
        scrollX.addListener(({ value }) => {
            // dimensions window가 현재 화면이고 
            // 사진들 모두 100% width 를가지니
            // scroll의 길이가 3개 사진 * 100%이고, value 화면 가장 왼쪽 값.
            // 2이랑 동일 할 때 setState를 하겠다... 싓..
            console.log("value::" + value)
            console.log("SIZES.width::" + SIZES.width)
            if(Math.floor((value+10) / SIZES.width) === onBoardings.length - 1) {
                setCompleted(true)
            }
        })
        return () => scrollX.removeListener()
    },[])


    //Render
    function renderContent() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEnabled
                decelerationRate={0}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX}}}
                ], { useNativeDriver: false })}
            > 
                {onBoardings.map(( item, index )=>(
                    <View 
                        key={index}
                        style={{ width: SIZES.width }}
                    >
                        {/* Image */}
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={item.img} 
                                resizeMode="cover"
                                style={{
                                    width:'100%',
                                    height:'100%',
                                }}
                            />
                        </View>
                        {/* Text */}
                        <View 
                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                left: 40,
                                right: 40,
                            }}>
                            {/* textAlign은 부모의 width 크기기준으로 정렬 */}
                            <Text
                                style={{
                                    ...FONTS.h1,
                                    color: COLORS.gray,
                                    textAlign:'center'
                                }}>
                                {item.title}
                            </Text>
                            <Text
                                style={{
                                    ...FONTS.body3,
                                    color: COLORS.gray,
                                    marginTop: SIZES.base,
                                    textAlign:'center'
                                }}>
                                {item.description}
                            </Text>
                        </View>
                        {/* Button */}
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: 150,
                                height: 60,
                                paddingLeft:20,
                                justifyContent: 'center',
                                borderTopLeftRadius: 30,
                                borderBottomLeftRadius: 30,
                                backgroundColor: COLORS.blue
                            }}
                            onPress={() => console.log("Button on pressed")}
                        >
                            <Text style={{ ...FONTS.h1, color: COLORS.white}}>{completed ? "Let's Go" : "Skip"}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </Animated.ScrollView>
        )
    }

    function renderDots() {
        const dotPosition = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={styles.dotContainer}>
                {onBoardings.map((item, index)=>{
                    // 어떤 상수를 선언 할 일이 있으면 map => { }이구나 바로 리턴이면 () 이고 
                    
                    
                    // Animated.divide 이게 뭔지 알아야하긴 하는데
                    // 슬라이드에서 scrollX 값 0 일때 index = 0
                    // 다음슬라이드 scrollX 값 1 일때 index = 1 
                    // 다음슬라이드 scrollX 값 2 일때 index = 2
                    // 기존 기준이 되는 값도 1 씩 증가하고  보간 하는 입력값도 1씩증가하고있음
                    // 개쩐다..
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1 ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17, SIZES.base],
                        extrapolate: 'clamp'
                    })
                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={[styles.dot, { width: dotSize, height: dotSize}]}
                        >
                        
                        </Animated.View>
                    )
                })}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
            {/* 글자는 map에 넣어서 사진에 있는거 마냥 지정하고
                dot 부분은 화면위에 fix 한 느낌이구나
            */}
            <View style={styles.dotRootContainer}>
                {renderDots()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: COLORS.white
    },
    dotRootContainer: {
        position:'absolute',
        bottom: SIZES.height > 700 ? '30%': '20%',
    },  
    dotContainer:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection: 'row',
        height: SIZES.padding,
    },
    dot: {
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.blue,
        marginHorizontal: SIZES.radius / 2
    }
})

export default OnBoarding;