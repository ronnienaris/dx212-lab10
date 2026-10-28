import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useMenus } from "../../lib/MenuContext";
import { COLORS, SPACING } from "../../lib/theme";

export default function MenuDetail() {
  const { id } = useLocalSearchParams();
  const { menus, loading } = useMenus();

  const menu = menus.find((m) => String(m.id) === String(id));

  if (loading && !menu) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  if (!menu) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>ไม่พบเมนูนี้</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{menu.emoji}</Text>
      <Text style={styles.name}>{menu.name}</Text>
      <Text style={styles.price}>{menu.price} บาท</Text>
      <Text style={styles.category}>หมวดหมู่: {menu.category}</Text>
      {menu.spicy && <Text style={styles.spicy}>🌶️ เผ็ด</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.bg,
  },
  emoji: { fontSize: 64, marginBottom: SPACING.md },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: SPACING.md,
  },
  category: { fontSize: 16, color: COLORS.muted, marginBottom: SPACING.xs },
  spicy: {
    fontSize: 16,
    color: COLORS.danger,
    fontWeight: "bold",
    marginTop: SPACING.xs,
  },
  error: { fontSize: 18, color: COLORS.danger, fontWeight: "bold" },
});
