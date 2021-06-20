<template>
  <div class="table" :class="{ 'table--flip': flip }">
    <table :style="{ minWidth: minWidth ? `${minWidth}px` : false }">
      <thead>
        <tr>
          <th v-for="(column, c) in tableData.columns" :key="c">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, r) in tableData.rows" :key="r">
          <td v-for="(column, c) in row" :key="c" :data-label="tableData.columns[c]">{{ column }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Object,
      default: () => {
        return {
          columns: [],
          rows: [],
        }
      },
    },
    flip: {
      type: Boolean,
      default: true,
    },
    minWidth: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.table {
  overflow-x: auto;
}
table {
  width: 100%;
  thead {
    text-align: left;
  }
}
@media (max-width: 900px) {
  .table--flip {
    thead {
      display: none;
    }

    tr {
      display: block;
      padding: 8px;
      margin-bottom: 16px;
      border-radius: 4px;
      background-color: #fafafa;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
    }

    td {
      display: flex;
      margin-bottom: 4px;
      &:before {
        content: attr(data-label);
        margin-right: auto;
        font-weight: bold;
      }
    }
  }
}
</style>
