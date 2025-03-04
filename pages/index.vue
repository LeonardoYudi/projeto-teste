<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <div class="grid min-h-svh lg:grid-cols-2">
      <div class="flex flex-col gap-4 p-6 md:p-10">
        <div class="flex justify-center gap-2 md:justify-start">
          <a
            href="https://www.eldoradobrasil.com.br/pb/"
            target="_blank"
            class="flex items-center gap-2 font-medium"
          >
            <img
              src="@/assets/img/logo-eldorado2.svg"
              alt="logo-eldorado"
              class="h-10"
            />
          </a>
        </div>
        <div class="flex flex-1 items-center justify-center">
          <div class="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div class="relative w-full h-full hidden bg-muted lg:block">
        <img
          src="@/assets/img/eldorado.webp"
          alt="Image"
          class="absolute w-full h-full inset-0"
        />
      </div>
    </div>
  </div>
</template>
