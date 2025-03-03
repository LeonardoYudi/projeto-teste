<script setup lang="ts">
import { AutoForm } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import { LoaderCircle } from "lucide-vue-next";
import type { FieldConfig } from "~/utils/types/AutoForm";

type TypeCreate = "usuario" | "tipo" | "contato";

interface Props {
  schema: z.ZodObject<any>;
  fieldConfig: Record<string, FieldConfig>;
  typeCreate: TypeCreate;
  dialogTitle?: string;
  dialogDescription?: string;
}

const routesMap: Record<TypeCreate, string> = {
  usuario: "/usuario",
  tipo: "/tipo",
  contato: "/contato",
};

const props = defineProps<Props>();
const emit = defineEmits(["submit"]);

const isOpen = ref<boolean>(false);
const isLoading = ref<boolean>(false);

async function onSubmit(typeCreate: TypeCreate, body?: Record<string, any>) {
  let route = routesMap[typeCreate];
  const { execute, data, error, loading } = useApiAxios({
    method: "POST",
    route: route,
  });

  try {
    isLoading.value = true;

    if (typeCreate === "contato") {
      let newBody;
      if (body?.usuario && body?.tipo) {
        const usuario = dataAtivos.value.find(
          (item: any) => item.nome === body?.usuario
        );
        const tipo = dataAtivosTiposAtivos.value.find(
          (item: any) => item.descricao === body?.tipo
        );

        if (usuario && tipo) {
          newBody = {
            nome: body.nome,
            valor: body.valor,
            idusuario: usuario.id,
            idtipo: tipo.id,
          };
        }
        await execute(newBody);
      }
    } else {
      await execute(body);
    }

    if (!error.value && data.value) {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "Registro criado com sucesso",
        duration: 3000,
      });
      isOpen.value = false;
      emit("submit");
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao criar registro",
        duration: 3000,
      });
    }
  } catch (e) {
    toast({
      variant: "destructive",
      title: "Erro",
      description: String(e),
      duration: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

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
  execute: executeTiposAtivos,
  data: dataAtivosTiposAtivos,
  error: errorAtivosTiposAtivos,
  loading: loadingAtivosTiposAtivos,
} = useApiAxios({
  method: "get",
  route: "/tipos/ativos",
});

onBeforeMount(async () => {
  if (props.typeCreate === "contato") {
    try {
      await executeAtivos();
      await executeTiposAtivos();
    } catch {
    } finally {
    }
  }
});

const schema = computed(() => {
  let updatedSchema = props.schema;

  if (props.typeCreate === "contato") {
    if (dataAtivos.value) {
      const enumValuesUsuarios = dataAtivos.value.map((item: any) => item.nome);
      updatedSchema = updatedSchema.extend({
        usuario: z.enum(enumValuesUsuarios, {
          required_error: "Campo obrigatório",
        }),
      });
    }

    if (dataAtivosTiposAtivos.value) {
      const enumValuesTipos = dataAtivosTiposAtivos.value.map(
        (item: any) => item.descricao
      );
      updatedSchema = updatedSchema.extend({
        tipo: z.enum(enumValuesTipos, {
          required_error: "Campo obrigatório",
        }),
      });
    }
  }

  return updatedSchema;
});

const fields = computed(() => {
  let updatedFields = props.fieldConfig;

  if (props.typeCreate === "contato") {
    updatedFields = {
      ...updatedFields,
      valor: {
        label: "Informação para contato",
      },
      usuario: {
        type: "select",
        label: "Usuário",
        options: dataAtivos.value.map((item: any) => item.nome),
      },
      tipo: {
        type: "select",
        label: "Tipo Contato",
        options: dataAtivosTiposAtivos.value.map((item: any) => item.descricao),
      },
    };
  }

  return updatedFields;
});
</script>

<template>
  <div>
    <Button @click="isOpen = true" variant="outline" class="w-28">
      Criar
    </Button>
    <Dialog v-model:open="isOpen">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{{ props.dialogTitle }}</DialogTitle>
          <DialogDescription> {{ props.dialogDescription }}</DialogDescription>
        </DialogHeader>
        <AutoForm
          class="space-2-6"
          :schema="schema"
          :field-config="fields"
          @submit="onSubmit(props.typeCreate, $event)"
        >
          <DialogFooter class="mt-6">
            <Button type="submit">
              <LoaderCircle v-if="isLoading" class="animate-spin" />
              <p v-else>Salvar</p>
            </Button>
          </DialogFooter>
        </AutoForm>
      </DialogContent>
    </Dialog>
  </div>
</template>
