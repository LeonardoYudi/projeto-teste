<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast/use-toast";
import { loginSchema } from "~/utils/schemas/auth";
import { LoaderCircleIcon } from "lucide-vue-next";

const { toast } = useToast();

interface formAuth {
  email: string;
  emailError?: string;
  password: string;
  passwordError?: string;
}

const formAuth = ref<formAuth>({
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
});

const authStore = useAuthStore();
const isLoading = ref<boolean>(false);

const clearErrors = () => {
  Object.assign(formAuth.value, { emailError: "", passwordError: "" });
};

const { execute, data, error, loading } = useApiAxios({
  method: "POST",
  route: "/token",
});

async function handleLogin() {
  formAuth.value.emailError = "";
  formAuth.value.passwordError = "";

  isLoading.value = true;
  const result = loginSchema.safeParse({
    email: formAuth.value.email,
    password: formAuth.value.password,
  });

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      if (issue.path[0] === "email") {
        formAuth.value.emailError = issue.message;
      }
      if (issue.path[0] === "password") {
        formAuth.value.passwordError = issue.message;
      }
    });
    isLoading.value = false;
    return;
  }

  try {
    await execute(
      {
        username: formAuth.value.email,
        password: formAuth.value.password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (error.value && !data.value) {
      toast({
        title: "Error",
        variant: "destructive",
        description: String(error.value?.detail || "Erro desconhecido"),
        duration: 3000,
      });
    }

    if (!error.value && data.value) {
      if (data.value) {
        authStore.setToken(data.value);
        window?.localStorage.setItem(
          "token",
          JSON.stringify({ token: data.value, email: formAuth.value.email })
        );

        navigateTo("/usuarios");
      }
    }
  } catch (e) {
    toast({
      title: "Error",
      duration: 3000,
      variant: "destructive",
      description: String(e),
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div :class="'flex flex-col gap-6'">
    <div class="flex flex-col items-center gap-2 text-center">
      <h1 class="text-2xl font-bold">Faça login na sua conta</h1>
      <p class="text-balance text-sm text-muted-foreground">
        Insira seu e-mail abaixo para fazer login na sua conta
      </p>
    </div>
    <div class="grid gap-6">
      <div class="grid gap-2">
        <Label for="email">Email</Label>
        <Input
          v-model="formAuth.email"
          @input="clearErrors()"
          id="email"
          type="email"
          placeholder="m@exemplo.com"
        />
        <p v-if="formAuth.emailError" class="text-sm text-red-600">
          {{ formAuth.emailError }}
        </p>
      </div>
      <div class="grid gap-2">
        <div class="flex flex-col gap-2">
          <Label for="password">Senha</Label>
          <Input
            v-model="formAuth.password"
            @input="clearErrors()"
            id="password"
            type="password"
          />
          <p v-if="formAuth.passwordError" class="text-sm text-red-600">
            {{ formAuth.passwordError }}
          </p>
        </div>
      </div>
      <Button @click="handleLogin()" type="submit" class="w-full">
        <p v-if="!loading">Entrar</p>
        <LoaderCircleIcon v-else class="animate-spin" />
      </Button>
    </div>
    <!-- <div class="text-center text-sm">
      Não tem uma conta?
      <a href="#" class="underline underline-offset-4"> Cadastre-se </a>
    </div> -->
  </div>
</template>
