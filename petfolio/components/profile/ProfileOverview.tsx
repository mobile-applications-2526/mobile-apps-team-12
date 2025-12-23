import React, { useEffect, useState } from "react";
import { Profile } from "../../types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Table, Rows } from "react-native-table-component";
import { useRouter } from "expo-router";
import { supabase } from "../../utils/supabase";
import ImagePickerUser from "../imagepickers/ImagePickerUser";
import Ionicons from "@react-native-vector-icons/ionicons";
import Button from "../Button";
import EditProfileModal from "./EditProfileModal";
import UserService from "../../services/UserService";

type Props = {
  profileData: Profile;
};

export default function ProfileOverview({ profileData }: Props) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profileData.user_id) {
      loadProfileImage();
      setError("");
    }
  }, []);

  const tableData = [
    ["Name", profileData.firstname + " " + profileData.lastname],
    ["Email", profileData.email ?? "No email known"], //if email is not know, there is still something written
    ["Phone Number", profileData.phonenumber ?? "No phone number known"], //if phone number is not know, there is still something to written
  ];
  const handleDelete = async () => {
    try {
      if (!profileData || !profileData.id) {
        throw new Error("No pet information available");
      }
      setShowDeleteModal(false);
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.log("Error", "You must be logged in to delete your account");
        return;
      }

      // Call the edge function
      const { data, error } = await supabase.functions.invoke(
        "self-delete-account",
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();

      console.log("Success", "Your account has been deleted successfully");

      router.navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      throw new Error("Failed to delete account. Please try again.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const loadProfileImage = async () => {
    setError("");
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("pictures")
        .eq("user_id", profileData.user_id)
        .single();
      console.log("image data:", data);

      if (error) {
        console.error("Error fetching profile image:", error);
        setError(error.message);
        return;
      }

      if (data?.pictures) {
        setProfileImageUrl(data.pictures);
      }
    } catch (error) {
      console.error("Error loading profile image:", error);
      setError(error);
    }
  };

  const handleEditProfile = async (firstName: string, lastName: string, email: string, phonenumber: string) => {
    setError("");
    if (!profileData || !profileData.user_id) return;

    try {
        await UserService.updateUserInformation(profileData.user_id, firstName, lastName, email, phonenumber);
        if (profileData.email != email ) {
          UserService.updateAuthEmail(profileData.user_id, email);
        }
        setEditProfileModalVisible(false);
    } catch (error) {
        console.error("Failed to update user profile", error);
        setError(error);
    }
};

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.imageContainer}>
        <Image
          source={
            profileImageUrl
              ? { uri: profileImageUrl }
              : require("../../assets/anon-user.png")
          }
          style={styles.profilePic}
        />
        <TouchableOpacity
          style={styles.editIconButton}
          onPress={() => setShowImagePickerModal(true)}
        >
          <Ionicons name="pencil-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.profile}>
        <Modal visible={showImagePickerModal}>
          <ImagePickerUser userId={profileData.user_id} />
        </Modal>
        <Text style={styles.profileName}>{profileData.firstname}</Text>
        <Table>
          <Rows style={styles.row} data={tableData} />
        </Table>
        <Button label="Edit User Profile" onPress={() => setEditProfileModalVisible(true)} />
          <EditProfileModal
                              oldProfileData={profileData}
                              visible={editProfileModalVisible}
                              onClose={() => setEditProfileModalVisible(false)}
                              onSubmit={handleEditProfile}
                          />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.deleteButtonText}>Delete Account</Text>
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
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Text style={styles.confirmText}>
                Are you sure you want to delete the user {profileData.firstname}{" "}
                {profileData.lastname} ? This action cannot be undone.
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
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
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
    marginBottom: 20,
  },

  row: {
    borderTopWidth: 2,
    borderTopColor: "#d56e54ff",
    paddingTop: 20,
    paddingBottom: 20,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 16,
    borderRadius: 12,
    width: "75%",
    alignSelf: "center",
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
    error: {
      color: "#d20202ff",
  },
});
