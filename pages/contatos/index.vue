<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

import { toast } from "@/components/ui/toast";
import { h } from "vue";

import { createContatoSchema } from "@/utils/schemas/createContato";
import type { FieldConfig } from "~/utils/types/AutoForm";
const fields = ref<Record<string, FieldConfig>>({
  username: {
    label: "Nome de usuário",
  },
  password: {
    label: "Senha",
    inputProps: {
      type: "password",
      placeholder: "••••••••",
    },
  },
});

function onSubmit(values: Record<string, any>) {
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<template>
  <div>
    <LazyFeaturesModalCreate
      :dialog-title="'Criar Contato'"
      :type-create="'contato'"
      :schema="createContatoSchema"
      :field-config="fields"
    />
  </div>
</template>
