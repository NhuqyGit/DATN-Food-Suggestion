import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import Splash1 from "../../assets/svgs/Spash1";
import Splash2 from "../../assets/svgs/Splash2";
import Splash3 from "../../assets/svgs/Splash3";
import Splash4 from "../../assets/svgs/Splash4";
import { useNavigation } from "@react-navigation/native";

function Splash() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="flex flex-col w-full">
        <View className="h-4/5  w-full flex bg-[#FF6321] items-center">
          <View className="">
            <Swiper>
              <View className="flex items-center justify-center">
                <Text className=" text-[#FFFFFF] text-[20px] font-medium leading-normal text-center mt-[20px]">
                  Welcome to
                </Text>
                <View className="flex flex-row mt-[18px]">
                  <View className="bg-[#FFFFFF] w-[56px] h-[56px] rounded-lg flex justify-center items-center">
                    <Text className="text-[#FF6321] text-[42px] font-bold leading-normal ">
                      I
                    </Text>
                  </View>
                  <Text className="text-[#FFFFFF] font-bold text-[42px] leading-normal ">
                    ntelliTaste
                  </Text>
                </View>
                <View className=" justify-center items-center mt-3  bg-[#FF6321] ">
                  <Splash1 />
                  <Image
                    source={require("../../assets/images/Spash/sp1.png")}
                    className="absolute top-[18%]  "
                  />
                </View>
              </View>

              <View className="flex items-center justify-center">
                <Text className=" text-[#FFFFFF] text-[20px] font-medium leading-normal text-center mt-[20px]">
                  Welcome to
                </Text>
                <View className="flex flex-row mt-[18px]">
                  <View className="bg-[#FFFFFF] w-[56px] h-[56px] rounded-lg flex justify-center items-center">
                    <Text className="text-[#FF6321] text-[42px] font-bold leading-normal ">
                      I
                    </Text>
                  </View>
                  <Text className="text-[#FFFFFF] font-bold text-[42px] leading-normal ">
                    ntelliTaste
                  </Text>
                </View>
                <View className=" justify-center items-center mt-3  bg-[#FF6321] ">
                  <Splash2 />
                  <Image
                    source={require("../../assets/images/Spash/sp2.png")}
                    className="absolute top-[18%]  "
                  />
                </View>
              </View>
              <View className="flex items-center justify-center">
                <Text className=" text-[#FFFFFF] text-[20px] font-medium leading-normal text-center mt-[20px]">
                  Welcome to
                </Text>
                <View className="flex flex-row mt-[18px]">
                  <View className="bg-[#FFFFFF] w-[56px] h-[56px] rounded-lg flex justify-center items-center">
                    <Text className="text-[#FF6321] text-[42px] font-bold leading-normal ">
                      I
                    </Text>
                  </View>
                  <Text className="text-[#FFFFFF] font-bold text-[42px] leading-normal ">
                    ntelliTaste
                  </Text>
                </View>
                <View className=" justify-center items-center mt-3  bg-[#FF6321] ">
                  <Splash3 />
                  <Image
                    source={require("../../assets/images/Spash/sp3.png")}
                    className="absolute top-[18%]  "
                  />
                </View>
              </View>
              <View className="flex items-center justify-center">
                <Text className=" text-[#FFFFFF] text-[20px] font-medium leading-normal text-center mt-[20px]">
                  Welcome to
                </Text>
                <View className="flex flex-row mt-[18px]">
                  <View className="bg-[#FFFFFF] w-[56px] h-[56px] rounded-lg flex justify-center items-center">
                    <Text className="text-[#FF6321] text-[42px] font-bold leading-normal ">
                      I
                    </Text>
                  </View>
                  <Text className="text-[#FFFFFF] font-bold text-[42px] leading-normal ">
                    ntelliTaste
                  </Text>
                </View>
                <View className=" justify-center items-center mt-3  bg-[#FF6321] ">
                  <Splash4 />
                  <Image
                    source={require("../../assets/images/Spash/sp4.png")}
                    className="absolute top-[18%]  "
                  />
                </View>
              </View>
            </Swiper>
          </View>
        </View>
        <View className="h-1/5 bg-white flex items-center">
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("SignUpScreen");
          // }}
          >
            <View className=" mt-3 bg-[#FF6321] w-[350px] h-[57px] flex items-center justify-center rounded-[40px]">
              <Text className="text-center text-[#FFFFFF] text-[16px] font-normal leading-none italic  ">
                Sign-up
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("SignUpScreen");
          // }}
          >
            <View className=" mt-3 bg-[#FF6321] w-[350px] h-[57px] flex items-center justify-center rounded-[40px]">
              <Text className="mt-3 text-[15px] italic">Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Splash;
