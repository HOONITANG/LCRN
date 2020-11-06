import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { COLORS, SIZES, icons, images, FONTS } from '../constants';

const Home = ({navigation}) => {

    //Dummy Data
    const [newPlants, setNewPlants] = React.useState([
        {
            id: 0,
            name: "Plant 1",
            img: images.plant1,
            favourite: false
        },
        {
            id: 1,
            name: "Plant 2",
            img: images.plant2,
            favourite: true
        },
        {
            id: 0,
            name: "Plant 3",
            img: images.plant3,
            favourite: false
        },
        {
            id: 0,
            name: "Plant 4",
            img: images.plant4,
            favourite: false
        }
    ])

    const [ friendList, setFriendList ] = React.useState([
        {
            id: 0,
            img: images.profile1,
        },
        {
            id: 1,
            img: images.profile2,
        },
        {
            id: 2,
            img: images.profile3,
        },
        {
            id: 3,
            img: images.profile4,
        },
        {
            id: 4,
            img: images.profile5,
        },
    ])

    // Render
    function renderNewPlants(item, index) {
        return (
            // 아이템의 양쪽 여백과 FlatList를 감싸고 있는 View의 상단 여백과 동일하군!
            // 길이를 %로 주어서 어떤 기종이든 크기가 동일하겠다.
            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: SIZES.base }}>
                <Image 
                    source={item.img}
                    resizeMode="cover"
                    style={{
                        // 여기왜 height는 %고 width는 dimension이냐
                        // width: SIZES.width * 0.23,
                        // ScrollView는 %를 지정 할 수 없어서 그랫구나.
                        width: SIZES.width * 0.23,
                        height: "82%",
                        borderRadius: 15 
                    }}
                />
                <View style={{
                    position: "absolute",
                    bottom: "17%",
                    right: 0,
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: SIZES.base,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,

                }}>
                    <Text style={{ color: COLORS.white}}>{item.name}</Text>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: 7,
                    }}
                >
                    <Image
                        source={item.favourite ? icons.heartRed : icons.heartGreenOutline }
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                        }}
                    >
                    </Image>
                </View>
            </View>
        )
    }
    function renderFriendComponent() {
        if(friendList.length == 0) {
            return (
                <View></View>
            )
        } else if(friendList.length <= 3) {
            return (
                friendList.map((item, index) => (
                    <View
                        key={`friend-${index}`}
                        style={index == 0 ? {} : { marginLeft: -20 }}
                    >
                        <Image
                            source={item.img}
                            resizeMode="cover"
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                borderWidth: 3,
                                borderColor: COLORS.primary
                            }}
                        />
                    </View>
                ))
            )
        } else {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    {friendList.map((item, index) => {
                        if (index <= 2) {
                            return (
                                <View 
                                    key={`friend-${index}`}
                                    style={index == 0 ? {} : { marginLeft: -20 }}
                                >
                                    <Image
                                        source={item.img}
                                        resizeMode="cover"
                                        style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            borderWidth: 3,
                                            borderColor: COLORS.primary
                                        }}
                                    />
                                </View>
                            )
                        }
                    })}
                    <Text style={{ marginLeft: 5, color: COLORS.secondary, ...FONTS.body3 }}>+{friendList.length - 3} More</Text>
                </View>
            )

        }
    }
    return (
        <View style={styles.container}>
            {/* New Plants */}
            {/* 상단 화면 그릴 전체 틀 크기와 뒷 배경 색 */}
            <View style={{ height: "30%", backgroundColor: COLORS.white}}>
                {/* 화면의 Radius와 배경색 */}
                <View
                    style={{
                        flex: 1,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: COLORS.primary,
                    }}
                >
                     {/* 화면내부의 영역, 상단 여백 * 2, 좌우 여백  */}
                    <View style={{ marginTop: SIZES.padding * 2, marginHorizontal: SIZES.padding }}>
                        
                        {/* Header 제목영역 */}
                        <View style={{ height:'18%',flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                            <Text style={{ color:COLORS.white, ...FONTS.h2 }}>New Plants</Text>
                            <TouchableOpacity
                                onPress={() => { console.log("Focus on password") }}
                            >
                                <Image 
                                    source={icons.focus}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        {/* 하단 이미지 영역 */}
                        <View style={{ marginTop: SIZES.base }}>
                            <FlatList 
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={newPlants}
                                keyExtractor={item => item.id.toString()}
                                renderItem= { ({ item, index}) => renderNewPlants(item, index) }

                            />
                        </View>
                    </View>
                </View>
            </View>
            
            {/* Today's Share */}
            <View style={{ height: "50%", backgroundColor: COLORS.lightGray }}>
                <View
                    style={{
                        flex: 1,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: COLORS.white,
                    }}>
                    <View style={{ marginTop: SIZES.font, marginHorizontal: SIZES.padding}}>
                        {/* 제목 영역 */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text style={{ color: COLORS.secondary, ...FONTS.h2}}>Today's Share</Text>
                            <TouchableOpacity
                                onPress={()=>{ console.log("See All on pressed")}}
                            >
                                <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        {/* 하단 이미지 영역  */}
                        <View style={{ flexDirection: 'row', height: '88%', marginTop: SIZES.base}}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ flex: 1}}
                                    onPress={() => { navigation.navigate("PlantDetail")}}
                                >
                                    {/*flex를 통해 1, 1.3비율로 구역을 나눠 버리고, 100%로 두개 채우니까 깔끔하다. */}
                                    <Image
                                        source={images.plant5}
                                        resizeMode="cover"
                                        style={{
                                            width:'100%',
                                            height:'100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flex: 1, marginTop: SIZES.font}}
                                    onPress={() => { navigation.navigate("PlantDetail")}}
                                >
                                    <Image
                                        source={images.plant6}
                                        resizeMode="cover"
                                        style={{
                                            width:'100%',
                                            height:'100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>
                                
                            </View>
                            <View style={{ flex: 1.3 }}>
                                <TouchableOpacity
                                    style={{ flex: 1, marginLeft: SIZES.font }}
                                    onPress={ () => { navigation.navigate("PlantDetail")}}
                                >
                                    <Image
                                        source={images.plant7}
                                        resizeMode="cover"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20,
                                        }}
                                    />
                                </TouchableOpacity>     
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {/* Added Friend */}
            <View style={{ height: "20%", backgroundColor: COLORS.lightGray }} >
                <View style={{ flex: 1, backgroundColor: COLORS.lightGray }}>
                    <View style ={{ marginTop: SIZES.radius, marginHorizontal: SIZES.padding }}>
                        <Text style={{ color: COLORS.secondary, ...FONTS.h2 }}>Added Friends </Text>
                        <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>{friendList.length} Total </Text>
                        
                        <View style={{ flexDirection: 'row', height: '60%'}}>
                            {/* Friends */}
                            <View style={{ flex: 1.3, flexDirection: 'row', alignItems:'center', }}>
                                {renderFriendComponent()}
                            </View>
                            {/* Add Friend */}
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>
                                <Text style={{ color: COLORS.secondary, ...FONTS.body3 }}>Add NEW</Text>
                                <TouchableOpacity
                                    style={{
                                        marginLeft: SIZES.base,
                                        width: 40,
                                        height: 40,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: COLORS.gray
                                    }}
                                    onPress={()=> { console.log("Add friend on pressed")}}
                                >
                                    <Image
                                        source={icons.plus}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 20,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Home;