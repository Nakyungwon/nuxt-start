<template>
  <div>
    <v-app>
      <tiptap-vuetify v-model="content" :extensions="extensions" />
      <!--      <template #placeholder> Loading... </template>-->
    </v-app>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  // Heading,
  // Bold,
  Italic,
  Strike,
  Underline,
  Code,
  // Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
} from 'tiptap-vuetify'
export default {
  name: 'Detail',
  components: { TiptapVuetify },
  props: {
    edit_contents: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
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
      // [
      //   Heading,
      //   {
      //     options: {
      //       levels: [1, 2, 3],
      //     },
      //   },
      // ],
      // Bold,
      Link,
      Code,
      HorizontalRule,
      // Paragraph,
      HardBreak,
      Image,
    ],
    // starting editor's content
    content: ``,
  }),
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      const content = document.getElementsByClassName(
        'tiptap-vuetify-editor__content'
      )
      content[0].setAttribute('style', 'height: 800px')
      this.$nextTick(() => {
        const mirror = document.getElementsByClassName('ProseMirror')
        mirror[0].setAttribute('style', 'height: 750px')
      })
    })
  },
}
</script>

<style lang="scss" scoped>
.tiptap-vuetify-editor__content .ProseMirror {
  height: 400px !important;
  max-height: 400px !important;
  min-height: 400px !important;
}
</style>
