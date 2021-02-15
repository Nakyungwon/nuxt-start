<template>
  <div>
    <div class="board_main">
      <v-app>
        <v-container fluid class="pa-0">
          <div class="my-2">
            <v-btn small color="primary" dark @click="regist"> 등록하기 </v-btn>
          </div>
          <div class="my-2">
            <v-btn small color="primary" dark @click="registMultipart">
              multi등록하기
            </v-btn>
          </div>
          <!--          <editorComp :content.sync="content" @toParentChange="parentConfirm" />-->
          <editorComp :content.sync="content" />
        </v-container>
      </v-app>
    </div>
  </div>
</template>

<script>
import editorComp from '@/components/input/editorComp'
export default {
  name: 'Regist',
  components: { editorComp },
  data() {
    return {
      content: '',
      FILE: '',
    }
  },
  methods: {
    async regist() {
      const res = await this.$axios.post(
        '/board/regist',
        // {
        //   content: this.content,
        // },
        {
          content: this.content,
        },
        {
          headers: {
            // 'Content-type': 'application/x-www-form-urlencoded',
            // 'Content-type': 'multipart/form-data',
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
      console.log(res)
    },
    registMultipart() {
      const formData = new FormData()
      formData.append('content', this.content)
      // formData.append('avatar', this.FILE, this.FILE.name)
      // formData.append(
      //   'avatar',
      //   new Blob(['test payload'], { type: 'text/csv' })
      // )
      this.$axios
        .post('/board/regist_multipart', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onFileUpload(event) {
      this.FILE = event.target.files[0]
      console.log(this.FILE.name)
    },
    parentConfirm(text) {
      console.log(text)
    },
  },
}
</script>

<style lang="scss" scoped></style>
