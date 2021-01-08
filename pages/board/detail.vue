<template>
  <div>
    <!--    <v-container>-->
    <!--      <h2>about</h2>-->
    <!--      <v-layout>lorem </v-layout>-->
    <!--    </v-container>-->
    <v-app>
      <tiptap-vuetify v-model="content" :extensions="extensions" />

      <template #placeholder> Loading... </template>
    </v-app>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
export default {
  name: 'Detail',
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
    // starting editor's content
    content: `
      <h1>Yay Headlines!</h1>
      <p>All these <strong>cool tags</strong> are working now.</p>
    `,
  }),
}
</script>

<style scoped>
.tiptap-vuetify-editor .ProseMirror {
  max-height: 200px;
}
</style>
