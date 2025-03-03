<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  TableColumnInterface,
  TableRowInterface,
} from "~/types/components/Table";
import { Skeleton } from "@/components/ui/skeleton";
interface TabelaGenericaProps {
  title: string;
  tableCaption?: string;
  columns: string[];
  data: any[];
}
import { LoaderCircle, Database } from "lucide-vue-next";
const props = defineProps({
  rows: {
    type: (Array as PropType<any[]>) || null,
    default: () => [],
  },
  columns: {
    type: Array as PropType<TableColumnInterface[]>,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingState: {
    type: Object as PropType<{ label: string }>,
    default: () => ({ label: "Carregando ..." }),
  },
  emptyState: {
    type: Object as PropType<{ label: string }>,
    default: () => ({
      label: "Nenhum registro encontrado",
    }),
  },
});
</script>

<template>
  <!-- Wrapper que limita a largura máxima e permite rolagem -->
  <div class="relative w-full max-w-full overflow-hidden">
    <div class="overflow-x-auto w-full">
      <Table class="w-full">
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="column in props.columns"
              :key="column.key"
              class="px-4 py-2 border-b bg-gray-100 text-left"
            >
              {{ column.label }}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="props.loading">
            <TableCell :colspan="props.columns.length" class="text-center py-4">
              <div class="flex flex-col items-center justify-center">
                <LoaderCircle class="animate-spin" />
                <span class="mt-2">{{ props.loadingState.label }}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow
            v-if="!props.loading && props.rows && props.rows.length === 0"
          >
            <TableCell :colspan="props.columns.length" class="text-center py-4">
              <div class="flex flex-col items-center justify-center">
                <Database class="" />
                <span class="mt-2">{{ props.emptyState.label }}</span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow v-if="!props.loading && !props.rows">
            <TableCell
              :colspan="props.columns.length"
              class="text-center py-4 space-y-2"
            >
              <Skeleton class="w-full h-5 rounded" />
            </TableCell>
          </TableRow>
          <TableRow v-else v-for="row in props.rows" :key="row.id">
            <TableCell
              v-for="column in props.columns"
              :key="column.key"
              class="px-4 py-2 border-b whitespace-nowrap"
            >
              <slot :name="`${column.key}-cell`" :row="row">
                <div>
                  {{ row[column.key] }}
                </div>
              </slot>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
