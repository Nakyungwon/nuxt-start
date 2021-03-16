<template>
  <div></div>
</template>

<script>
export default {
  name: 'LoginCallback',
  mounted() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: 'lLQJ4RNgbF5KTgqpqiLO',
      isPopup: false,
    })
    naverLogin.init()
    naverLogin.getLoginStatus(function (status) {
      console.log(status)
      if (status) {
        const email = naverLogin.user.getEmail()
        const name = naverLogin.user.getName()
        const nickName = naverLogin.user.getNickName()
        const profileImage = naverLogin.user.getProfileImage()
        const birthday = naverLogin.user.getBirthday()
        const uniqId = naverLogin.user.getId()
        const age = naverLogin.user.getAge()
        if (email === undefined || email === null) {
          alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.')
          naverLogin.reprompt()
          return
        }
        console.log('--------------------------------')
        console.log(email)
        console.log(name)
        console.log(nickName)
        console.log(profileImage)
        console.log(birthday)
        console.log(uniqId)
        console.log(age)
        console.log('--------------------------------')
        // window.location.replace("http://127.0.0.1/test2.html");
      } else {
        console.log('callback 처리에 실패하였습니다.')
      }
    })
  },
}
</script>

<style scoped></style>
