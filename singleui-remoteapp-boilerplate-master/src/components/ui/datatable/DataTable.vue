<template>
  <div class="p-4">
    <!-- Filter Panel -->
    <div v-if="filterPanel" class="mb-4 flex gap-2">
      <input
        v-model="globalFilter"
        placeholder="Cari..."
        class="flex-grow border rounded px-3 py-2"
      />
      <button
        @click="table.setGlobalFilter(globalFilter)"
        class="px-4 py-2 rounded text-white bg-[#00441F] hover:opacity-50"
      >
        Cari
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-[#00441F] text-white">
          <tr v-for="(headerGroup, rowIndex) in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colspan="header.colSpan"
              :rowspan="header.isPlaceholder || header.subHeaders?.length ? 1 : 2"
              class="px-6 py-3 text-left text-sm font-semibold align-middle"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="hover:bg-gray-100"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-6 py-4 text-sm text-gray-800"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="100%" class="px-6 py-3 text-sm font-semibold">
              <div class="flex justify-between">
                <div>Menampilkan {{ table.getRowModel().rows.length }} dari {{ data.length }}</div>
                <div>Total: {{ data.length }}</div>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Export Button -->
    <div v-if="exportData" class="mt-4 text-right">
      <Button size="default" variant="outline">Export to Excel</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRef } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  FlexRender,
  type ColumnDef,
} from '@tanstack/vue-table'
import Button from '@/components/ui/button/Button.vue'

// Generic loosely-typed row
type GenericRow = Record<string, any>

// Props definition
const props = defineProps<{
  data: GenericRow[]
  columns?: ColumnDef<GenericRow, any>[]
  filterPanel?: boolean
  exportData?: boolean
}>()

// Reactive references
const data = toRef(props, 'data')
const filterPanel = props.filterPanel ?? true
const exportData = props.exportData ?? false
const globalFilter = ref('')

// Helper to extract accessor keys from grouped columns
function extractAccessorKeys(col: any): string[] {
  if ('accessorKey' in col) return [col.accessorKey]
  if ('columns' in col && Array.isArray(col.columns)) {
    return col.columns.flatMap(extractAccessorKeys)
  }
  return []
}

// Compute final columns: use props.columns or auto-generate with deduplication
const columnsComputed = computed<ColumnDef<GenericRow, any>[]>(() => {
  const grouped = props.columns || []
  const groupedKeys = new Set<string>(grouped.flatMap(extractAccessorKeys))

  if (data.value && data.value.length > 0) {
    const keys = Object.keys(data.value[0])
    const autoCols = keys
      .filter(key => !groupedKeys.has(key))
      .map(key => {
        const helper = createColumnHelper<GenericRow>()
        return helper.accessor(key, {
          header: key.charAt(0).toUpperCase() + key.slice(1),
          cell: info => info.getValue(),
        })
      })
    return [...grouped, ...autoCols]
  }
  return grouped
})

// Initialize table
const table = useVueTable<GenericRow>({
  get data() {
    return data.value
  },
  get columns() {
    return columnsComputed.value
  },
  state: {
    globalFilter: globalFilter.value,
  },
  onGlobalFilterChange: updater => {
    globalFilter.value = typeof updater === 'function' ? updater(globalFilter.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
})

// // Watch for data prop changes to update table
// watch(
//   data,
//   newData => {
//     table.setRowData(newData || [])
//   },
//   { immediate: true }
// )
</script>

<style scoped>
/* Tambahkan styling kustom jika diperlukan */
</style>
