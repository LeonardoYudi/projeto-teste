<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});
import clsx from "clsx";
import { createUserScheama } from "@/utils/schemas/createUser";
import type { FieldConfig } from "~/utils/types/AutoForm";
import type { TableColumnInterface } from "~/types/components/Table";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

const isLoadingTable = ref<boolean>(false);
const users = ref<any[] | undefined>(undefined);

const {
  execute: executeAtivos,
  data: dataAtivos,
  error: errorAtivos,
  loading: loadingAtivos,
} = useApiAxios({
  method: "get",
  route: "/usuarios/ativos",
});

const {
  execute: executeInativos,
  data: dataInativos,
  error: errorInativos,
  loading: loadingInativos,
} = useApiAxios({
  method: "get",
  route: "/usuarios/inativos",
});

async function toggleStatusUser(id: number) {
  const { execute, error, data, loading } = useApiAxios({
    method: "put",
    route: `/usuario/${id}/status`,
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
      await buscarUsuarios();
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

async function buscarUsuarios() {
  users.value = [];
  isLoadingTable.value = true;
  try {
    await executeAtivos();
    await executeInativos();
    if (!errorAtivos.value && !errorInativos.value) {
      users.value = [...dataAtivos.value, ...dataInativos.value];
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

onBeforeMount(async () => {
  await buscarUsuarios();
});

const fields = ref<Record<string, FieldConfig>>({
  username: {
    label: "Nome de usuário",
  },
  senha: {
    label: "Senha",
    inputProps: {
      type: "password",
    },
  },
});

const columsTable: TableColumnInterface[] = [
  { key: "id", label: "ID" },
  { key: "status", label: "Status" },
  { key: "nome", label: "Nome" },
  { key: "email", label: "Email" },
  { key: "actions", label: "Ações" },
];
</script>

<template>
  <div class="max-h-full w-full overflow-auto">
    <div class="flex">
      <LazyFeaturesModalCreate
        :dialog-title="'Criar Usuário'"
        :dialog-description="'Preencha os campos para criar um novo usuário'"
        :type-create="'usuario'"
        :schema="createUserScheama"
        :field-config="fields"
        @submit="buscarUsuarios"
      />
    </div>
    <div class="border rounded-md my-1 shadow-sm">
      <FeaturesTabelaGenerica
        :columns="columsTable"
        :rows="users"
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
                  `${
                    row.status === true ? "Desativar Usuário" : "Ativar Usuário"
                  }`
                }}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  {{
                    `${
                      row.status === true
                        ? "Deseja desativar o usuário:"
                        : "Deseja ativar o usuário:"
                    }`
                  }}
                  {{ row.nome }}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction @click="toggleStatusUser(row.id)"
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
