<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

import clsx from "clsx";
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

onBeforeMount(async () => {
  await buscarTipos();
});

const tipos = ref<any[] | undefined>(undefined);
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
  tipos.value = [];
  isLoadingTable.value = true;
  try {
    await executeAtivos();
    await executeInativos();
    if (!errorAtivos.value && !errorInativos.value) {
      tipos.value = [...dataAtivos.value, ...dataInativos.value];
    }
  } catch (e) {
    toast({
      title: "Erro",
      description: String(e),
      variant: "destructive",
      duration: 3000,
    });
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
    if (!error.value && data.value) {
      toast({
        title: "Sucesso",
        description: data.value.message,
        variant: "success",
        duration: 3000,
      });
      await buscarTipos();
    }
  } catch (e) {
    toast({
      title: "Erro",
      description: String(e),
      variant: "destructive",
      duration: 3000,
    });
  } finally {
  }
}
</script>

<template>
  <div class="flex flex-col max-w-full">
    <div class="flex">
      <LazyFeaturesModalCreate
        :dialog-title="'Criar Tipo'"
        :dialog-description="'Preencha o campo para criar um novo tipo'"
        :type-create="'tipo'"
        :schema="createTipoScheama"
        :field-config="fields"
        @submit="buscarTipos"
      />
    </div>
    <div class="border rounded-md my-1 shadow-sm w-full">
      <FeaturesTabelaGenerica
        :columns="columsTable"
        :rows="tipos"
        :loading="isLoadingTable"
      >
        <template #status-cell="{ row }">
          <p
            :class="
              clsx({
                'text-white bg-green-400 rounded text-center px-1 select-none':
                  row.status === true,
                'text-white bg-red-400 rounded text-center px-1 select-none':
                  row.status === false,
              })
            "
          >
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
            <AlertDialogContent class="p-4">
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  {{
                    `${
                      row.status === true
                        ? "Deseja desativar o tipo:"
                        : "Deseja ativar o tipo:"
                    }`
                  }}{{ row.descricao }}
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
