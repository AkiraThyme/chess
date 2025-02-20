<template>
    <div class="tooltip-container">
      <!-- Icon to trigger the popup -->
      <button @click="togglePopup" ref="iconButton" class="icon-button" aria-label="Toggle Popup">
        ⓘ
      </button>
  
      <!-- Popup List -->
      <div v-if="isPopupVisible" class="popup-list" ref="popupList" @dragover.prevent @drop="handleDrop">
        <ul>
          <li v-for="(item, index) in items" :key="index">{{ item }}</li>
          <li v-if="items.length === 0">Drag a Piece Here!</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted, watch } from "vue";
  
  export default {
    props: {
      modelValue: {
        type: Array,
        default: () => [], // Default list
      },
    },
    setup(props, { emit }) {
      const isPopupVisible = ref(false);
      const iconButton = ref(null);
      const popupList = ref(null);
      const isDragging = ref(false);
  
      const togglePopup = () => {
        isPopupVisible.value = !isPopupVisible.value;
      };
  
      // Hide popup when clicking outside, but not during a drag operation
      const handleClickOutside = (event) => {
        if (
          !isDragging.value &&
          iconButton.value &&
          !iconButton.value.contains(event.target) &&
          popupList.value &&
          !popupList.value.contains(event.target)
        ) {
          isPopupVisible.value = false;
        }
      };
  
      const handleDragStart = () => {
        isDragging.value = true;
      };
  
      const handleDragEnd = () => {
        isDragging.value = false;
      };
  
      onMounted(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("dragstart", handleDragStart);
        document.addEventListener("dragend", handleDragEnd);
      });
  
      onUnmounted(() => {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("dragstart", handleDragStart);
        document.removeEventListener("dragend", handleDragEnd);
      });
  
      // Watch for changes in modelValue and update items
      const items = ref([...props.modelValue]);
      watch(() => props.modelValue, (newVal) => {
        items.value = [...newVal];
      });
  
      const handleDrop = (event) => {
        try {
          const piece = JSON.parse(event.dataTransfer.getData("piece"));
          items.value.push(piece);  // Add the piece to the items array
          emit('update:modelValue', items.value);  // Emit update to parent
        } catch (error) {
          console.error("Failed to parse dropped data:", error);
        }
      };
  
      return { isPopupVisible, togglePopup, iconButton, popupList, items, handleDrop };
    },
  };
  </script>
  
  <style scoped>
  .tooltip-container {
    position: relative;
    display: inline-block;
  }
  
  .icon-button {
    border: none;
    background: transparent;
    font-size: 18px;
    cursor: pointer;
  }
  
  .popup-list {
    position: absolute;
    top: 5%; /* Position below the button */
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border: 1px solid #ccc;
    padding: 8px 12px;
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000; /* Ensure it appears above other elements */
    white-space: nowrap;
  }
  
  .popup-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .popup-list li {
    padding: 4px 8px;
    cursor: pointer;
  }
  
  .popup-list li:hover {
    background-color: #f0f0f0;
  }
  </style>
  