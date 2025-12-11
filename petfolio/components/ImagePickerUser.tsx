import { useState } from "react";
import { Alert, Image, View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../utils/supabase";
import { decode } from 'base64-arraybuffer'
import { useRouter } from "expo-router";

export default function ImagePickerUser({ userId }: { userId: string }) {
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [1, 1], 
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      const imageraw = result.assets[0];
      setImage(imageraw.uri);
      try {
      setUploading(true);

      // Generate a unique file name
      const fileExt = imageraw.fileName.split(".").pop();
      const fileName = `${userId}.${fileExt}`;
      const filePath = `${fileName}`;

      if (!imageraw.base64) {
        throw new Error("Failed to get image data");
      }

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(`profilepictures`)
        .upload(filePath, decode(imageraw.base64), {
          contentType: imageraw.mimeType, upsert:true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get the url
      const { data: publicUrlData } = supabase.storage
        .from(`profilepictures`)
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;
            const { error: updateError } = await supabase
        .from("profiles")
        .update({ pictures: publicUrl })
        .eq("user_id", userId);
      if (updateError) {
        throw updateError;
      }

      console.log("Profile picture updated!");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      router.push(`/profile`);
    }
    }
  };


  return (
     <View style={styles.container}>
            <TouchableOpacity
          style={styles.button}
          onPress={pickImage}
          disabled={uploading}
          >
          <Text style={styles.buttonLabel}>Pick an image from camera roll</Text>
          </TouchableOpacity>
    
          <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => router.push(`/profile`)}
          >
          <Text style={styles.buttonLabel}>Cancel</Text>
          </TouchableOpacity>
      
      {uploading && <ActivityIndicator size="large" style={styles.loader} />}
      
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Make it circular
    marginTop: 20,
  },
  loader: {
    marginTop: 20,
  },
   button: {
    borderRadius: 10,
    width: "75%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#507e62",
    padding: 5,
    marginBottom: 10,
  },
    buttonCancel: {
    borderRadius: 10,
    width: "75%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#6d6d6dff",
    padding: 5
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
