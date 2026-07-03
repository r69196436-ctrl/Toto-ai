import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@utils/colors';
import { TimezoneService } from '@services/timezoneService';
import { TimeZone } from '@types/clock';

interface TimeZoneSelectorProps {
  selectedTimeZones: string[];
  onAddTimeZone: (timezoneId: string) => void;
  onRemoveTimeZone: (timezoneId: string) => void;
}

export const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({
  selectedTimeZones,
  onAddTimeZone,
  onRemoveTimeZone,
}) => {
  const scheme = useColorScheme() || 'light';
  const themeColors = colors[scheme as keyof typeof colors];
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const allTimezones = TimezoneService.getAllTimezones();
  const filteredTimezones = searchQuery
    ? TimezoneService.searchTimezones(searchQuery)
    : allTimezones;

  const handleAddTimeZone = (timezoneId: string) => {
    onAddTimeZone(timezoneId);
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: themeColors.surface }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Add Time Zone
          </Text>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={[
              styles.addButton,
              { backgroundColor: themeColors.primary },
            ]}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedList}
        >
          {selectedTimeZones.map((tzId) => {
            const tz = TimezoneService.getTimezoneById(tzId);
            return (
              <TouchableOpacity
                key={tzId}
                style={[
                  styles.tag,
                  { backgroundColor: themeColors.primary },
                ]}
                onPress={() => onRemoveTimeZone(tzId)}
              >
                <Text style={styles.tagText}>{tz?.city}</Text>
                <Ionicons name="close" size={14} color="white" />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: themeColors.background },
          ]}
        >
          <View
            style={[
              styles.modalHeader,
              { borderBottomColor: themeColors.border },
            ]}
          >
            <Text style={[styles.modalTitle, { color: themeColors.text }]}>
              Select Time Zone
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Ionicons name="close" size={24} color={themeColors.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.searchInput,
              {
                backgroundColor: themeColors.surface,
                color: themeColors.text,
                borderColor: themeColors.border,
              },
            ]}
            placeholder="Search time zones..."
            placeholderTextColor={themeColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <FlatList
            data={filteredTimezones}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.timezoneItem,
                  {
                    backgroundColor: selectedTimeZones.includes(item.id)
                      ? themeColors.primary + '20'
                      : 'transparent',
                    borderBottomColor: themeColors.border,
                  },
                ]}
                onPress={() => {
                  if (selectedTimeZones.includes(item.id)) {
                    onRemoveTimeZone(item.id);
                  } else {
                    handleAddTimeZone(item.id);
                  }
                }}
              >
                <View style={styles.timezoneInfo}>
                  <Text style={[styles.tzCity, { color: themeColors.text }]}>
                    {item.city}
                  </Text>
                  <Text
                    style={[styles.tzName, { color: themeColors.textSecondary }]}
                  >
                    {item.name} • {item.offset}
                  </Text>
                </View>
                {selectedTimeZones.includes(item.id) && (
                  <Ionicons name="checkmark-circle" size={24} color={themeColors.primary} />
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedList: {
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    gap: 6,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchInput: {
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
  },
  timezoneItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  timezoneInfo: {
    flex: 1,
  },
  tzCity: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  tzName: {
    fontSize: 12,
  },
});
