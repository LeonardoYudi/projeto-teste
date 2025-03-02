<script setup lang="ts">
import { ref } from "vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Define as propriedades recebidas pela coluna
const props = defineProps<{
  row: Record<string, any>; // Defina a tipagem correta aqui
  payment: Record<string, any>; // Defina a tipagem correta aqui
  onExpand?: () => void; // Omitir se não for usado
}>();

const isLoading = ref(false);

function handleEdit() {
  console.log("Editar", props.row);
}

function handleDelete() {
  console.log("Excluir", props.row);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">⋮</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="handleEdit">✏️ Editar</DropdownMenuItem>
      <DropdownMenuItem class="text-red-500" @click="handleDelete"
        >🗑️ Excluir</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>
