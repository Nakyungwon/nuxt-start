<template>
  <div>
    <div class="board_main">
      <div class="container">
        <editorComp />
      </div>
    </div>
  </div>
</template>

<script>
import editorComp from '@/components/input/editorComp'
export default {
  name: 'Regist',
  components: { editorComp },
}
</script>

<style lang="scss" scoped></style>
