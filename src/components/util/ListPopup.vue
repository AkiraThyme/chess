<template>
    <div class="tooltip-container">
      <!-- Icon to trigger the popup -->
      <button @click="togglePopup" ref="iconButton" class="icon-button" @dragover.prevent @drop="handleDrop">
        ⓘ
      </button>
  
      <!-- Popup List -->
      <div v-if="isPopupVisible" class="popup-list" ref="popupList">
        <ul>
          <li v-for="(item, index) in items" :key="index">{{ item }}</li>
          <li v-if="items.length === 0">Drag a Piece Here!</li>
        </ul>
      </div>
    </div>
</template>
  
<script>
  import { ref, onMounted, onUnmounted } from "vue";
  
  export default {
    props: {
      items: {
        type: Array,
        default: () => [], // Default list
      },
    },
    setup() {
      const isPopupVisible = ref(false);
      const iconButton = ref(null);
      const popupList = ref(null);
  
      const togglePopup = () => {
        isPopupVisible.value = !isPopupVisible.value;
      };
  
      // Hide popup when clicking outside
      const handleClickOutside = (event) => {
        if (
          iconButton.value &&
          !iconButton.value.contains(event.target) &&
          popupList.value &&
          !popupList.value.contains(event.target)
        ) {
          isPopupVisible.value = false;
        }
      };
  
      onMounted(() => {
        document.addEventListener("click", handleClickOutside);
      });
  
      onUnmounted(() => {
        document.removeEventListener("click", handleClickOutside);
      });
  
      return { isPopupVisible, togglePopup, iconButton, popupList };
    },
    methods: {
        handleDrop(event) {
            const piece = JSON.parse(event.dataTransfer.getData("piece"));
            this.items.push(piece);  // Add the piece to the items array
            this.$emit('update:items', this.items);  // If items is a prop, emit update
        },
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
    top: 5%;
    left: 59%;
    transform: translateX(-50%);
    background: white;
    border: 1px solid #ccc;
    padding: 8px 12px;
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
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
  