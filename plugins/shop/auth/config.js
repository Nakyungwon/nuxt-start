// const isDev = process.env.NODE_ENV === 'development'
// const host = process.client ? location.origin : process.env.baseUrl
// // const protocol = isDev ? 'http://' : 'https://'
// export default {
//   Auth: {
//     mandatorySignIn: true,
//     region: process.env.AWS_REGION,
//     userPoolId: process.env.AWS_COGNITO_POOL_ID,
//     userPoolWebClientId: process.env.AWS_COGNITO_CLIENT_ID,
//     storage: process.client ? sessionStorage : null,
//     oauth: {
//       domain: process.env.AWS_COGNITO_DOMAIN,
//       scope: ['email', 'openid', 'name'],
//       redirectSignIn: `${host}/login/signin/redirect`,
//       redirectSignOut: `${host}/login/signout/redirect`,
//       responseType: 'code',
//       options: {
//         AdvancedSecurityDataCollectionFlag: true,
//       },
//     },
//     authenticationFlowType: 'USER_SRP_AUTH',
//   },
// }
