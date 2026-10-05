<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
    users: Array,
    selectedIds: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(["update:selectedIds"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

function toggleDropdown() {
    isOpen.value = !isOpen.value;
}

function toggleUser(userId) {
    const current = [...props.selectedIds];
    const idx = current.indexOf(userId);
    if (idx === -1) {
        current.push(userId);
    } else {
        current.splice(idx, 1);
    }
    emit("update:selectedIds", current);
}

function isSelected(userId) {
    return props.selectedIds.includes(userId);
}

function handleClickOutside(event) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isOpen.value = false;
    }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));

const label = computed(() => {
    if (props.selectedIds.length === 0) return "Filter by User";
    return `${props.selectedIds.length} user(s) selected`;
});
</script>

<template>
    <div class="filter-wrapper" ref="dropdownRef">
        <button class="filter-btn" @click.stop="toggleDropdown">
            {{ label }} ▾
        </button>

        <div v-show="isOpen" class="filter-dropdown">
            <label v-for="user in users" :key="user.id" class="filter-option">
                <input type="checkbox" :checked="isSelected(user.id)" @change="toggleUser(user.id)" />
                {{ user.name }}
            </label>
        </div>
    </div>
</template>

<style scoped>
.filter-wrapper {
    position: relative;
    display: inline-block;
}

.filter-btn {
    padding: 6px 12px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
}

.filter-btn:hover {
    background: #f5f5f5;
}

.filter-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 100;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 8px;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    max-height: 260px;
    overflow-y: auto;
}

.filter-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 4px;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 4px;
}

.filter-option:hover {
    background: #f5f5f5;
}

.filter-option input[type="checkbox"] {
    cursor: pointer;
}
</style>