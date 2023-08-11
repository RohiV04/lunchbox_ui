// import React, { useState } from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// import ScooterIcon from '../assets/motorcycle.png';
// const Location= () => {
//   const initialRegion = {
//     latitude: 16.544893,
//     longitude: 81.521240,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const [mapRegion, setMapRegion] = useState(initialRegion);
//   const [pointedLocation, setPointedLocation] = useState({
//     latitude:  16.543326924404386,
//     longitude: 81.49641838256808,
//   });
 

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         region={mapRegion}
//         showsUserLocation
//         followsUserLocation
//       >
//         <Marker
//           coordinate={pointedLocation}
//           title="Pointed Location"
//           image={ScooterIcon}
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });

// export default Location;
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import ScooterIcon from '../assets/motorcycle.png';

const Location = () => {
  const initialRegion = {
    latitude: 16.544893,
    longitude: 81.521240,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [mapRegion, setMapRegion] = useState(initialRegion);
  const [pointedLocation, setPointedLocation] = useState({
    latitude: 16.543326924404386,
    longitude: 81.49641838256808,
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        showsUserLocation
        followsUserLocation
      >
        <Marker
          coordinate={pointedLocation}
          title="Pointed Location"
          image={ScooterIcon}
          anchor={{ x: 0.5, y: 0.5 }} // Set the anchor to center of the image
        
          
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Location;

