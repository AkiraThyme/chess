<template>
    <div class="dropdown-container">
      <button @click="toggleList" class="dropdown-button">
        <span v-if="isListVisible">Hide List</span>
        <span v-else>Show List</span>
      </button>
      <div v-if="isListVisible" class="dropdown-list" @dragover.prevent @drop="handleDrop">
        <ul>
          <li v-for="pieceId in pieceIds" :key="pieceId">
            <img :src="getPieceImage(pieceId)" alt="Piece Image" class="piece-image" />
            {{ pieceId }}
          </li>
          <li v-if="pieceIds.length === 0">Drag a Piece Here!</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pieceIds: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        isListVisible: false
      };
    },
    methods: {
      toggleList() {
        this.isListVisible = !this.isListVisible;
      },
      getPieceImage(pieceId) {
        return `/src/assets/images/pieces/${pieceId}.png`;
      },
      handleDrop(event) {
        try {
          const piece = JSON.parse(event.dataTransfer.getData("piece"));
          this.$emit('update:pieceIds', [...this.pieceIds, piece]);
        } catch (error) {
          console.error("Failed to parse dropped data:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .dropdown-container {
    position: relative;
    display: inline-block;
  }
  
  .dropdown-button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .dropdown-list {
    position: absolute;
    top: 20%; /* Position below the button */
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    width: 100%;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 5px;
    background-color: #f0f0f0;
    margin: 5px 0;
    display: flex;
    align-items: center;
  }
  
  .piece-image {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  </style>
  