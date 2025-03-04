<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

import clsx from "clsx";
import { createContatoSchema } from "@/utils/schemas/createContato";
import type { FieldConfig } from "~/utils/types/AutoForm";
import type { TableColumnInterface } from "~/types/components/Table";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();

interface Contatos {
  id: number;
  nome: string;
  status: boolean;
  idusuario: number;
  idtipo: number;
  valor: string;
}

const isLoadingTable = ref<boolean>(false);
const contatos = ref<Contatos[] | undefined>(undefined);

const {
  execute: executeAtivos,
  data: dataAtivos,
  error: errorAtivos,
  loading: loadingAtivos,
} = useApiAxios({
  method: "get",
  route: "/contatos/ativos",
});

const {
  execute: executeInativos,
  data: dataInativos,
  error: errorInativos,
  loading: loadingInativos,
} = useApiAxios({
  method: "get",
  route: "/contatos/inaltivos",
});

onBeforeMount(async () => {
  await buscarContatos();
});

async function buscarContatos() {
  contatos.value = [];
  isLoadingTable.value = true;
  try {
    await executeAtivos();
    await executeInativos();

    if (!errorAtivos.value && !errorInativos.value) {
      contatos.value = [...dataAtivos.value, ...dataInativos.value];
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

async function toggleStatusContatos(id: number) {
  const { execute, error, data, loading } = useApiAxios({
    method: "put",
    route: `/contato/${id}/status`,
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
      await buscarContatos();
    } else {
      toast({
        title: "Erro",
        description: error.value?.detail,
        variant: "destructive",
        duration: 3000,
      });
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

const fields = ref<Record<string, FieldConfig>>({
  idtipo: {
    label: "Id tipo Contato",
  },
  idusuario: {
    label: "Usuário Id",
  },
  nome: {
    label: "Nome",
  },
  valor: {
    label: "Valor",
  },
});

const columsTable: TableColumnInterface[] = [
  { key: "id", label: "Id" },
  { key: "status", label: "Status" },
  { key: "nome", label: "Nome" },
  { key: "idusuario", label: "Usuario Id" },
  { key: "idtipo", label: "Tipo Id" },
  { key: "valor", label: "Valor" },
  { key: "actions", label: "Ações" },
];
</script>

<template>
  <div>
    <div>
      <LazyFeaturesModalCreate
        :dialog-title="'Criar Contato'"
        :dialog-description="'Preencha os campos para criar um novo contato'"
        :type-create="'contato'"
        :schema="createContatoSchema"
        :field-config="fields"
        @submit="buscarContatos"
      />
    </div>
    <div class="border rounded-md my-1 shadow-sm">
      <FeaturesTabelaGenerica
        :columns="columsTable"
        :rows="contatos"
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
              <Button variant="outline" class="w-36 text-start">
                {{
                  `${
                    row.status === true ? "Desativar Contato" : "Ativar Contato"
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
                        ? "Deseja desativar o contato: "
                        : "Deseja ativar o contato: "
                    }`
                  }}
                  {{ row.nome }}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction @click="toggleStatusContatos(row.id)"
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
