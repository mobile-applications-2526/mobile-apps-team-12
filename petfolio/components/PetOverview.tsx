import React, { useState } from "react";
import { Pet } from "../types";
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
import PetService from "../services/PetService";
import ImagePicker from "./ImagePicker";

type Props = {
  petData: Pet;
};

export default function PetOverview({ petData }: Props) {
  // petData.medication.forEach(med => {
  //     medications.push(med.name)
  // })

  // petData.vaccins.forEach(vac => {
  //     vaccins.push(vac.name)
  // })

  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);

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

  const tableData = [
    ["Birthday", petData.birthdate],
    [
      "Current weight",
      <TouchableOpacity
        onPress={() => router.push(`/pet/weights/${petData.id}`)}
      >
        <View style={styles.rowContent}>
          <Text>{getCurrentWeight()}</Text>
          <Text style={styles.arrow}>&rsaquo;</Text>
        </View>
      </TouchableOpacity>,
    ],
    [
      "Food",
      <TouchableOpacity onPress={() => router.push(`/pet/foods/${petData.id}`)}>
        <Text style={styles.arrow}>&rsaquo;</Text>
      </TouchableOpacity>,
    ],
    [
      "Medication",
      <TouchableOpacity
        onPress={() => router.push(`/pet/medications/${petData.id}`)}
      >
        <Text style={styles.arrow}>&rsaquo;</Text>
      </TouchableOpacity>,
    ],
    [
      "Vaccinations",
      <TouchableOpacity
        onPress={() => router.push(`/pet/vaccinations/${petData.id}`)}
      >
        <Text style={styles.arrow}>&rsaquo;</Text>
      </TouchableOpacity>,
    ],
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 160, paddingHorizontal: 10 }}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/bengel-pf.png")}
          style={styles.profilePic}
        />
        <View style={styles.profile}>
          <Text style={styles.profileName}>{petData.name}</Text>
          <Text style={styles.petType}>{petData.type}</Text>
          <Text onPress={() => setShowImagePickerModal(true)}>Edit Photo</Text>
          <Modal visible={showImagePickerModal}>
            <ImagePicker />
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
  profilePic: {
    position: "absolute",
    top: -75,
    width: 150,
    height: 150,
    borderRadius: 75,
    zIndex: 2,
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
