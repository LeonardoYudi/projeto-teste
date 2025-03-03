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
    await execute(body);
    if (!error.value && data.value) {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "Registro criado com sucesso",
        duration: 3000,
      });
      isOpen.value = false;
      emit("submit");
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
          :schema="props.schema"
          :field-config="props.fieldConfig"
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
