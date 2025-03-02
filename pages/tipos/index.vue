<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

import { createTipoScheama } from "@/utils/schemas/createTipo";
import type { TableColumnInterface } from "~/types/components/Table";
import type { FieldConfig } from "~/utils/types/AutoForm";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const fields = ref<Record<string, FieldConfig>>({
  descricao: {
    label: "Descrição",
  },
});

onMounted(async () => {
  await buscarTipos();
});

const users = ref<any[]>([]);
const isLoadingTable = ref<boolean>(false);

const columsTable: TableColumnInterface[] = [
  { key: "id", label: "Id" },
  { key: "status", label: "Status" },
  { key: "descricao", label: "Descrição" },
  { key: "actions", label: "Ações" },
];

const {
  execute: executeAtivos,
  data: dataAtivos,
  error: errorAtivos,
  loading: loadingAtivos,
} = useApiAxios({
  method: "get",
  route: "/tipos/ativos",
});

const {
  execute: executeInativos,
  data: dataInativos,
  error: errorInativos,
  loading: loadingInativos,
} = useApiAxios({
  method: "get",
  route: "/tipos/inativos",
});

async function buscarTipos() {
  users.value = [];
  isLoadingTable.value = true;
  try {
    await executeAtivos();
    await executeInativos();
    if (!errorAtivos.value && !errorInativos.value) {
      users.value = [...dataAtivos.value, ...dataInativos.value];
    }
  } catch (e) {
    console.log(e);
  } finally {
    isLoadingTable.value = false;
  }
}

async function toggleStatusType(id: number) {
  const { execute, error, data, loading } = useApiAxios({
    method: "put",
    route: `/tipo/${id}/status`,
  });

  try {
    await execute();
    if (!error.value) {
      toast({
        title: "Sucesso",
        description: "Tipo atualizado com sucesso",
        variant: "success",
        duration: 3000,
      });
      await buscarTipos();
    }
  } catch (e) {
    console.log(e);
  } finally {
  }
}
</script>

<template>
  <div>
    <div class="flex justify-end">
      <LazyFeaturesModalCreate
        :dialog-title="'Criar Tipo'"
        :type-create="'tipo'"
        :schema="createTipoScheama"
        :field-config="fields"
      />
    </div>
    <div class="border rounded-md my-1 shadow-sm">
      <FeaturesTabelaGenerica
        :columns="columsTable"
        :rows="users || []"
        :loading="isLoadingTable"
      >
        <template #status-cell="{ row }">
          <p>
            {{ row.status === true ? "Ativo" : "Inativo" }}
          </p>
        </template>
        <template #actions-cell="{ row }">
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="outline">
                {{
                  `${row.status === true ? "Desativar Tipo" : "Ativar Tipo"}`
                }}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação desativará o tipo: {{ row.descricao }}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction @click="toggleStatusType(row.id)"
                  >Confirmar</AlertDialogAction
                >
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </template>
      </FeaturesTabelaGenerica>
    </div>
  </div>
</template>
