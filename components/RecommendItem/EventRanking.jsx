import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { HOST } from '../../config';
import { AsyncStorageService } from '../../utils/AsynStorage';

const EventRanking = ({ eventId }) => {
  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken();
        const response = await fetch(
          `${HOST}/events/${eventId}/top-dishes`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setRankingData(data);
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <View style={styles.rankingContainer}>
      <View style={styles.top2}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.avatarImage, { width: 60, height: 60 }]}
            source={
              rankingData[1]?.userImage
                ? { uri: rankingData[1].userImage }
                : require('../../assets/images/Profile/user.png')
            }
          />
        </View>
        <Text style={[styles.username]}>
          {rankingData[1]?.dish.author}
        </Text>
        <View style={styles.likeContainer}>
          <Entypo name="heart" color={"tomato"} size={18} />
          <Text style={{ color: "#bfbfbf" }}>{rankingData[1]?.filteredCollectionsCount}</Text>
        </View>
        <View style={[styles.numberOne, { width: 20, height: 20, backgroundColor: 'powderblue' }]}>
          <Text style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>2</Text>
        </View>
      </View>

      <View style={styles.top2}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.avatarImage, { width: 80, height: 80 }]}
            source={
              rankingData[0]?.userImage
                ? { uri: rankingData[0].userImage }
                : require('../../assets/images/Profile/user.png')
            }
          />
        </View>
        <Text style={[styles.username]}>
          {rankingData[0]?.dish.author}
        </Text>
        <View style={styles.likeContainer}>
          <Entypo name="heart" color={"tomato"} size={18} />
          <Text style={{ color: "#bfbfbf" }}>{rankingData[0]?.filteredCollectionsCount}</Text>
        </View>
        <View style={styles.numberOne}>
          <Text style={{ fontWeight: 700, fontSize: 16, color: 'white' }}>1</Text>
        </View>
      </View>

      <View style={styles.top2}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.avatarImage, { width: 60, height: 60 }]}
            source={
              rankingData[2]?.userImage
                ? { uri: rankingData[2].userImage }
                : require('../../assets/images/Profile/user.png')
            }
          />
        </View>
        <Text style={[styles.username]}>
          {rankingData[2]?.dish.author}
        </Text>
        <View style={styles.likeContainer}>
          <Entypo name="heart" color={"tomato"} size={18} />
          <Text style={{ color: "#bfbfbf" }}>{rankingData[2]?.filteredCollectionsCount}</Text>
        </View>
        <View style={[styles.numberOne, { width: 20, height: 20, backgroundColor: 'skyblue' }]}>
          <Text style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>3</Text>
        </View>
      </View>
    </View>
  );
};

export default EventRanking;

const styles = StyleSheet.create({
  rankingContainer: {
    width: "100%",
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  avatarImage: {
    borderRadius: 200,
  },
  top2: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },
  imageContainer: {
    padding: 3,
    backgroundColor: "#bfbfbf",
    borderRadius: 200,
  },
  likeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: "#5e5e5e",
    fontWeight: 500,
    fontSize: 15,
  },
  numberOne: {
    position: 'absolute',
    right: 3,
    top: -3,
    width: 25,
    height: 25,
    backgroundColor: 'tomato',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
