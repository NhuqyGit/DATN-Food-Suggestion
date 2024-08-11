import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PopularItem from "../../../components/PopularItem/PopularItem";
import DishItem from "../../../components/DishItem/DishItem";
import { ScrollView } from "react-native";
import HistoryItem from "../../../components/HistoryItem/HistoryItem";
import SearchResultItem from "../../../components/SearchResultItem/SearchResultItem";
import SearchHeader from "../components/SearchHeader";
import { AntDesign } from "@expo/vector-icons";
import Filter from "../components/Filter/Filter";
import CameraScreen from "../CameraScreen/CameraScreen";
import { AsyncStorageService } from "../../../utils/AsynStorage";
import { HOST } from "../../../config";
import LatestDishSkeleton from "../ViewImageScreen/LatestDishSkeleton";
import IngredientSkeleton from "../ViewImageScreen/IngredientSkeleton";
import {
  selectCookingTime,
  selectIngredientIds,
  selectIngredientNames,
  selectStep,
  setSearchStep,
} from "../../../slices/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchValueSkeleton from "../ViewImageScreen/SearchValueSkeleton";
import { theme } from "../../../theme";
import RecipeCard from "../../../components/CategoryList/components/RecipeCard";

const SearchScreen = ({ navigation, route }) => {
  const [isFilter, setIsFilter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  // const [step, setStep] = useState(1)

  const step = useSelector(selectStep);

  const setStep = (value) => {
    dispatch(setSearchStep(value));
  };

  const [ingredients, setIngredients] = useState([]);
  const [dish, setDish] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingDish, setLoadingDish] = useState(true);
  const [loadingDishBySearchText, setLoadingDishBySearchText] = useState(true);
  const [dishBySearchText, setDishBySearchText] = useState([]);
  const [showAllPopular, setShowAllPopular] = useState(false);

  const ingredientIds = useSelector(selectIngredientIds);
  const cookingTime = useSelector(selectCookingTime);
  const ingredientNames = useSelector(selectIngredientNames);

  const LIMIT = 5;

  useEffect(() => {
    const getIngredients = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorageService.getAccessToken();
        const response = await fetch(`${HOST}/ingredient`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await response.json();
        setIngredients(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const getAllDish = async () => {
      setLoadingDish(true);
      try {
        const token = await AsyncStorageService.getAccessToken();
        const response = await fetch(`${HOST}/dish/latest?sort=desc&limit=20`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await response.json();

        setDish(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDish(false);
      }
    };

    getAllDish();
    getIngredients();
  }, []);

  const getDishBySearchText = async (searchText) => {
    setLoadingDishBySearchText(true);
    try {
      const token = await AsyncStorageService.getAccessToken();

      let query = "?";

      if (searchText) {
        query += "text=" + searchText;
      }

      if (cookingTime) {
        query += "&cookingTime=" + cookingTime;
      }

      if (ingredientIds && ingredientIds.length > 0) {
        ingredientIds.forEach((id) => {
          if (searchText) {
            query += "&ingredientIds=" + id;
          } else {
            query += "ingredientIds=" + id + "&";
          }
        });
      }

      if (ingredientNames && ingredientNames.length > 0) {
        ingredientNames.forEach((name) => {
          if (searchText) {
            query += `&limit=${LIMIT}&ingredientNames=` + name;
          } else {
            query += `limit=${LIMIT}&ingredientNames=` + name + "&";
          }
        });
      }

      const response = await fetch(`${HOST}/dish/search${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      setDishBySearchText(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDishBySearchText(false);
    }
  };

  useEffect(() => {
    if (
      searchText ||
      ingredientNames?.length > 0 ||
      ingredientIds?.length > 0
    ) {
      getDishBySearchText(searchText);
    } else {
      setDishBySearchText([]);
    }
  }, [searchText, cookingTime, ingredientIds, ingredientNames]);

  const handleSeeIngredients = () => {
    setShowAllPopular(!showAllPopular);
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
      <ScrollView style={styles.wrapper} scrollEnabled vertical>
        <SearchHeader
          navigation={navigation}
          route={route}
          setVisible={setIsVisible}
          setStep={setStep}
          setSearchText={setSearchText}
          searchText={searchText}
          getDishBySearchText={getDishBySearchText}
          step={step}
        />

        {step === 2 && (
          <View style={styles.popularWrapper}>
            <View style={styles.titleContainer}>
              <Text
                style={styles.titleResult}
              >{`${dishBySearchText?.length} RESULT`}</Text>
              {searchText && (
                <TouchableOpacity
                  style={styles.filterContainer}
                  onPress={() => {
                    setIsFilter(!isFilter);
                  }}
                >
                  <Text style={styles.filter}>{"Filter"}</Text>
                  <AntDesign
                    style={styles.searchIcon}
                    name={isFilter ? "up" : "down"}
                    size={22}
                    color={"#BDBDBD"}
                  />
                </TouchableOpacity>
              )}
            </View>

            {isFilter && searchText && (
              <Filter
                hasButton
                ingredients={ingredients}
                setIsFilter={setIsFilter}
                isFilter={isFilter}
              />
            )}

            {loadingDishBySearchText ? (
              <View
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <SearchValueSkeleton total={2} />
              </View>
            ) : (
              <>
                {dishBySearchText &&
                  dishBySearchText.length > 0 &&
                  dishBySearchText?.map((item) => (
                    <SearchResultItem key={item.id} item={item} />
                  ))}
              </>
            )}
          </View>
        )}

        {step === 1 && (
          <View>
            <View style={styles.popularWrapper}>
              <View style={styles.padding}>
                <Text style={styles.title}>The most common ingredients</Text>
                {loading ? (
                  <View
                    style={{
                      flexDirection: "column",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <IngredientSkeleton total={2} />
                  </View>
                ) : (
                  <View>
                    <View style={styles.popularList}>
                      {ingredients
                        ?.slice(0, showAllPopular ? ingredients.length : 4)
                        .map((item) => (
                          <PopularItem key={item.id} item={item} />
                        ))}
                    </View>

                    {ingredients?.length > 4 && (
                      <TouchableOpacity
                        onPress={handleSeeIngredients}
                        style={styles.seeMoreButton}
                        disabled={loading}
                      >
                        <Text style={styles.seeMoreText}>
                          {showAllPopular ? "See Less" : "See More"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
              <View style={styles.popularWrapper}>
                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                  <Text style={styles.title}>Lastest dish</Text>
                  {loadingDish ? (
                    <View
                      style={{
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <LatestDishSkeleton total={5} />
                    </View>
                  ) : (
                    <View style={styles.dishList}>
                      {dish?.map((item) => (
                        <DishItem key={item.id} item={item} />
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={isVisible}>
        <CameraScreen setVisible={setIsVisible} navigation={navigation} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  wrapper: {
    flex: 1,
    paddingTop: 20,
  },

  popularWrapper: {
    // padding: 16,
    gap: 5,
    // paddingBottom: 10,
  },

  historyList: {
    flexDirection: "column",
    gap: 16,
  },

  removeHistoryButton: {
    marginTop: 32,
    textAlign: "center",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },

  popularList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  dishList: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
    // gap: 8,
    display: "flex",
    gap: 20,
    // width: '90%',
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2E2E30",
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 16,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  titleResult: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: "#BDBDBD",
  },

  filter: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: "#BDBDBD",
  },

  padding: {
    padding: 16,
  },

  seeMoreButton: {
    padding: 8,
    alignSelf: "flex-end",
  },

  seeMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: `${theme.colors.secondary}`,
  },
});

export default SearchScreen;
