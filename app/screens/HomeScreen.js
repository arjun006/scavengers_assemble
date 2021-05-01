import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as Permissions from "expo-permissions";

export default function HomeScreen() {
  const [permission, askForPermission] = usePermissions(Permissions.CAMERA, {
    ask: true,
  });

  // if (!permission || permission.status !== "granted") {
  //   return (
  //     <View>
  //       <Text>Permission is not granted</Text>
  //       <Button title="Grant permission" onPress={askForPermission} />
  //     </View>
  //   );
  // }
  return (
    <View>
      <Text>
        bdeb
      </Text>
    </View>
  );
}
