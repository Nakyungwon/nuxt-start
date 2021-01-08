<template>
  <v-container>
    <v-app>
      <no-ssr placeholder="loading...">
        <button @click.prevent="focusEditor">Focus Editor</button>
        <vue-editor
          v-model="content"
          style="height: 350px"
          placeholder="Write Something..."
          use-custom-image-handler
          @imageAdded="handleImageAdded"
        ></vue-editor>
      </no-ssr>
    </v-app>
  </v-container>
</template>

<script>
export default {
  asyncData() {
    return {
      content: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'code-block'],
      ],
      // pageIsMounted: false,
      // isSSR: !!process.server,
    }
  },
  data() {
    return {
      content: '',
    }
  },

  // components: { VueEditor },

  methods: {
    reloadWindow() {
      window.location.reload(true)
    },
    saveContent() {
      // alert('a')
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      alert(1)

      const formData = new FormData()
      formData.append('image', file)

      console.log(formData)
      // const res = await this.$axios.post('/board/imageUpload', {
      //   data: formData,
      // })
      // const url = res.data.url // Get url from response
      // Editor.insertEmbed(cursorLocation, 'image', url)
      // resetUploader()
      this.$axios({
        url: '/board/imageUpload',
        method: 'POST',
        data: formData,
      })
        .then((result) => {
          const url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    focusEditor() {
      this.$refs.editor.quill.focus()
    },
  },
}
</script>

<style scoped>
button {
  cursor: pointer;
}
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
h1 {
  font-weight: 400;
  margin-bottom: -0.5em;
}
.name {
  color: #3b8070;
}
p {
  margin-top: 20px;
}
.top {
  margin-bottom: 2.5em;
  text-align: center;
}
button {
  font-size: 16px;
  font-weight: 900;
}
</style>
