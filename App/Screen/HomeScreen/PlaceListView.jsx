import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlaceItem from "./PlaceItem";
import { SelectMarkerContext } from "../../Context/SelectMarkerContext";
import { getFirestore } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function PlaceListView({ placeList }) {
  console.log("***", placeList);
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(SelectMarkerContext);
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  // Debugging: Log the selectedMarker value
  console.log("Selected Marker:", selectedMarker);

  useEffect(() => {
    // Ensure selectedMarker is not null and is a valid index
    if (
      selectedMarker !== null &&
      selectedMarker >= 0 &&
      selectedMarker < placeList.length
    ) {
      scrollToIndex(selectedMarker);
    }
  }, [selectedMarker]); // Add placeList as dependency

  const scrollToIndex = (index) => {
    // Debugging: Log the index being scrolled to
    console.log("Scrolling to index:", index);
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });
  const db = getFirestore(app);
  useEffect(() => {
    user && getFav();
  }, [user]);
  const getFav = async () => {
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFavList((favList) => [...favList, doc.data()]);
    });
  };
  const isFav = (place) => {
    const result = favList.find((item) => item.place.id == place.id);
    console.log(result);
    return result ? true : false;
  };
  return (
    <View>
      <FlatList
        horizontal={true}
        data={placeList}
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem
              place={item}
              isFav={isFav(item)}
              markedFav={() => getFav()}
            />
          </View>
        )}
      />
    </View>
  );
}
