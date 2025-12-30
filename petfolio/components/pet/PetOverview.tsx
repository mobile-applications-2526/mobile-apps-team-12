import React, { useEffect, useState } from "react";
import { Pet } from "../../types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Table, Rows } from "react-native-table-component";
import { useRouter } from "expo-router";
import PetService from "../../services/PetService";
import ImagePicker from "../imagepickers/ImagePickerPets";
import { supabase } from "../../utils/supabase";
import Ionicons from "@react-native-vector-icons/ionicons";

type Props = {
  petData: Pet;
};

export default function PetOverview({ petData }: Props) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getUserId();
  }, []);
  useEffect(() => {
    if (petData.id && userId) {
      loadProfileImage();
    }
  }, [petData.id, userId]);

  const loadProfileImage = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("picture")
        .eq("id", Number(petData.id))
        .eq("owner_id", userId)
        .single();
      console.log("image data:", data);

      if (error) {
        console.error("Error fetching profile image:", error);
        return;
      }

      if (data?.picture) {
        setProfileImageUrl(data.picture);
      }
    } catch (error) {
      console.error("Error loading profile image:", error);
    }
  };

  const getCurrentWeight = () => {
    if (!petData.weight || petData.weight.length === 0) return "N/A";

    const sortedWeights = [...petData.weight].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return `${sortedWeights[0].value} kg`;
  };

  const handleDelete = async () => {
    try {
      if (!petData || !petData.id) {
        throw new Error("No pet information available");
      }
      setShowDeleteModal(false);
      await PetService.deletePetAndExtras(petData);
      router.navigate("/petOverview");
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };
  const getUserId = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
    } else {
      console.log("something went wrong with fetching userId", userError);
    }
  };

  const tableData = [
    ["Birthday", petData.birthdate.toLocaleDateString()],
    [
      "Current weight",
      <TouchableOpacity
        onPress={() => router.push(`/pet/weights/${petData.id}`)}
      testID="weight-arrow">
        <View style={styles.rowContent}>
          <Text>{getCurrentWeight()}</Text>
          <Text style={styles.arrow} >&rsaquo;</Text>
        </View>
      </TouchableOpacity>,
    ],
    [
      "Food",
      <TouchableOpacity onPress={() => router.push(`/pet/foods/${petData.id}`)}testID="food-arrow">
        <Text style={styles.arrow} >&rsaquo;</Text>
      </TouchableOpacity>,
    ],
    [
      "Medication",
      <TouchableOpacity
        onPress={() => router.push(`/pet/medications/${petData.id}`)}
       testID="medication-arrow">
        <Text style={styles.arrow}>&rsaquo;</Text>
      </TouchableOpacity>,
    ],
    [
      "Vaccinations",
      <TouchableOpacity
        onPress={() => router.push(`/pet/vaccinations/${petData.id}`)}
      testID="vaccin-arrow">
        <Text style={styles.arrow} >&rsaquo;</Text>
      </TouchableOpacity>,
    ],
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 160, paddingHorizontal: 10 } }
    testID="pet-scrollview">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            testID="image"
            source={
              profileImageUrl
                ? { uri: profileImageUrl }
                : require("../../assets/anon-user.png")
            }
            style={styles.profilePic}
          />
          <TouchableOpacity
            testID="edit-icon-button"
            style={styles.editIconButton}
            onPress={() => setShowImagePickerModal(true)}
          >
            <Ionicons name="pencil-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <Text style={styles.profileName}>{petData.name}</Text>
          <Text style={styles.petType}>{petData.type}</Text>
          <Modal visible={showImagePickerModal}>
            <ImagePicker petId={petData.id} userId={userId} />
          </Modal>
          <Table>
            <Rows style={styles.row} data={tableData} />
          </Table>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowDeleteModal(true)}
          >
            <Text style={styles.deleteButtonText}>Delete Pet</Text>
          </TouchableOpacity>

          <Modal
            visible={showDeleteModal}
            transparent={true}
            animationType="fade"
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setShowDeleteModal(false)}
            >
              <View
                style={styles.modalContent}
                onStartShouldSetResponder={() => true}
              >
                <Text style={styles.modalTitle}>Delete Pet</Text>
                <Text style={styles.confirmText}>
                  Are you sure you want to delete {petData.name}? This action
                  cannot be undone.
                </Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowDeleteModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.deleteModalButton]}
                    onPress={handleDelete}  testID="delete-pet-button"
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 50,
  },

  profile: {
    width: "100%",
    backgroundColor: "#E2866E",
    borderRadius: 30,
    alignItems: "stretch",
    padding: 20,
    paddingTop: 80,
    height: 700,
  },
  imageContainer: {
    position: "absolute",
    top: -75,
    zIndex: 2,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIconButton: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#E2866E",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileName: {
    fontSize: 40,
    textAlign: "center",
  },

  petType: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    borderTopWidth: 2,
    borderTopColor: "#d56e54ff",
    paddingTop: 20,
    paddingBottom: 20,
  },

  rowContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },

  arrow: {
    fontSize: 20,
    textAlign: "right",
    marginRight: 30,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    maxWidth: 340,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },

  confirmText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },

  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  deleteModalButton: {
    backgroundColor: "#dc3545",
  },
});
