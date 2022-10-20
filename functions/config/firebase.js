const admin = require("firebase-admin");
const functions = require("firebase-functions");

const private_key =
  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDHMRI4hjFfWqNe\n+hjcZjnzQXoJop20ij04hEQyM62ocpOsYV29TqzN/10l3hR+y2JZZnRGrxzgUHNE\n6NFkCKvACZEHS0aYIfEADBXjKjF2SvqaU5FYp9triKIFdhMsb6wJXFSLauB31slP\nCTrwAP9CusIVGeLmXRrTAHdtPEdS0nSfewrSkgP7hPeRhX6fa4mboXyJ+91ug9s2\nqpaPq14M/YcFS0X+YzGTWKYMh5YiM/+DaaAqyoGyjc6BFW34PDTCOy/W/21ZLhnC\nqvov/2MqH9GBfnKQM9XU5tHrRiiB/QlYzsI6bOP5ik5D23TGXXwihS+AD7QMGQQK\noZqFSP9hAgMBAAECggEAA9aNwsik06ZTUsw39ao4wwz0+ScjdF68CIEK79qH+yCP\nDiGiUjhy0wrQ5zQuOgBjqh7pDhIdI4japGj7MjsKX9TyBj1p9C/mPQbJQViXKKUl\nSvCMiB7pjFBEX/LQcoPJ1rSAiAmvNCaaN9Nw6b45LOvckMEa5URav5apFnH0hV4y\nSy4n8mGS2LBTqOtp42c2Z+SrWBdHb5AeccjA5Oh47sJAT0CjiN7O9yaDK+1C2Sc6\niMqpwKMxqZRMZsvQLjLsdmKS3uxX1swjTOoxhPyois/tt+bQplVhhGkk05Sq65rs\neh33MVOUML8ShYetd4WoWABxx+EKSD5OhEw5+TnU2QKBgQDwXRqq5+b/tMyxch1Y\ndelXn5KsyapyMSxSvs1mUwjrhuQeDHBCQnFwaOw1xy5lRHhQDaydkggmxs499BoI\noKkGwQDEpnCJTNMPzGuGWSTneTUHpuOb8Pre/64HiKsuI5uv4SddIMbcVL3+bgGR\nuSlQ/XDrvemzcZXtmnfEzzU6uQKBgQDUJk8mqh8FvlW/CmsV1nAzKaFo8SiJ+eHk\nRZTua3DFCXHpQ0Qna6EaZgmuBYU6WBIgbK96S7wAXY+stdrwb0OlE8MFS6Ebt/V8\nxz381AV/TcpSJSrQTq8BiP1gscEDnzDsdd3H4vNXQeHj2K7EI0AScparcANr/784\nEcMmagB16QKBgHX9jji1K/z8GLtGhEdHYmtEBvFQ8Z2qq9JWnWeMfUV46wQhIP41\ntY/zwXhItWq6qMDLZZ/X7q5ySw24hQsVKsQI/EKMXZPYpYcM1v+VRPtn0XNXJkYH\njm7nXduO6FD249b7lKIvk87WvolmINkS5sg+ES94A3+1015WxFJVURDpAoGBAMQE\nFXPrEbjT0RQvwxutQ4PyPiHhWIyLpmys4ducx9g2Ttqw/SLTLkpe5yi0DxIGV9E/\nuq7rlOxdhieU65LlqwG2jaWx6EzdHuRIj3ywRdgG/x4BG1rWqJppgXs7IdR/3MtO\naDmM9zuzMsy741Z0H3osCAyk9XRvG7Xpq38tx/kpAoGBALqbLlAB+9ze2SV66Kl4\nx1S236mLm6mGS/a1kgrF1b/924FMAvHVo00zxIIGbNfA7QuAFuvERNCoyIDcvAIB\n9qHUZHSxtUpoWr+KLUVLJAqDI9qjOnDzKZtgAaojUV8pT2M+gMo4+6VKeptLZMen\nYJ71kjrquSmGjbsbtLL7MxmG\n-----END PRIVATE KEY-----\n";

const project_id = "api-plants-b6153";
const clientemail =
  "firebase-adminsdk-7js87@api-plants-b6153.iam.gserviceaccount.com";
admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: private_key.replace(/\\n/g, "\n"),
    projectId: project_id,
    clientEmail: clientemail,
  }),
  databaseURL: "https://api-plants-b6153.firebaseio.com",
});

const db = admin.firestore();
//COMENTARIO DE PRUEBA

module.exports = { admin, db };
