import React, { useState } from "react";
import { Profile, User } from "../types";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabase";

type Props = {
  profileData: Profile;
};

export default function ProfileOverview({ profileData }: Props) {
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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
const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log('Error', 'You must be logged in to delete your account');
        return;
      }

      // Call the edge function
      const { data, error } = await supabase.functions.invoke('self-delete-account', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();

      console.log('Success', 'Your account has been deleted successfully');
      
      router.navigate("/");

    } catch (error) {
      console.error('Error deleting account:', error);
      throw new Error('Failed to delete account. Please try again.');
    } finally {
      setShowDeleteModal(false);
    }

  } 

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bengel-pf.png")}
        style={styles.profilePic}
      />
      <View style={styles.profile}>
        <Text style={styles.profileName}>{profileData.firstname}</Text>
        <Table>
          <Rows style={styles.row} data={tableData} />
        </Table>
                 <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={()=> setShowDeleteModal(true)}
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
                            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                                <Text style={styles.modalTitle}>Delete Account</Text>
                                <Text style={styles.confirmText}>
                                    Are you sure you want to delete the user {profileData.firstname} {profileData.lastname} ? This action cannot be undone.
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
    marginBottom: 20,
  },

  row: {
    borderTopWidth: 2,
    borderTopColor: "#d56e54ff",
    paddingTop: 20,
    paddingBottom: 20,
  },
  deleteButton: {
        backgroundColor: '#dc3545',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
     modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '80%',
        maxWidth: 340,
    },
    
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },

    confirmText: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
      cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
     modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
     deleteModalButton: {
        backgroundColor: '#dc3545',
    },
});
