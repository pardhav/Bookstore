import admin from "firebase-admin";

// to avoid re-initialization during re-renders
if (!admin.app.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "bookstore-103c6",
      privateKey:
        "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDHAOekGXIB1HUo\nIYV90/rDt7PsCqyaPr7vOoPgsDw/li4E02F8fG1xgmik7iqZ9gsP88MwF2e0yTg+\nlQeZmbUtVu86+apv40fXwF2tP4CTwyPKTLKGX3WuwhpUv04M3BWAlsmFljFHBKXP\nWjQgJr1nSEVk8rx1kjEZwvOP4h/zFQDR3KJ8mDMpj6YY7QHFiPZQAFN9CSab1vRx\nibZBwcYR4WFk5PSqIdYrVv73yVFbYTZqcXuMrp7aOZofLTbBkd1iPU3JUkOahkSc\n2q8vfxWZ2y8dSyJvIwb1CywEmuBIBEpHJz+3WVawlhtjSeheX+dSVpiw0o7wu6Mw\nOA6KEM6pAgMBAAECggEAAc7oy+1tQ0X+cIhpcZzA/RFIwb7RFa+3RW43L436ZiuD\nrIiNLLfmuK7SK5l8apy5OgJhhijYSOTBLZRmFse2RTyyfMsy+MRMbVHyp/XZQb52\nr0pmHuF0LMvXuGhqmaRQT7RPDXcxaG9K4Gj160re0rbt5n5sJvdWmeDTHL4Vwzws\nAArn2gdFFVRrrA+XquJEDYVz0isgt1/H2YkEs2RsYca25qRZU2JKXomcMe3KqBM1\njtbA7yqezzSAtXZrTTNJY7yhr9LPM+h1LhmaQbti/c5WrWiaWM3+RbxlhH7At718\nvEUDhun5pGa8Hju5kKjRWfN3VEu7S7NQeD7F5S6A5wKBgQD5HAk9qu9DCS627AoJ\n392jTQan6D/i3SppV1AHlQbYxIh949jV9fpk4bh8dpwInDSfqnnWOJhejLomTrAn\nSupsi9U7Gnqf2+dof84flu0Wkjr3Msm7hXY7FmhDbl4Hqvef/sm8OprIbhtslr9E\niZWZ83dZtWLVR13wX+t4cPrLVwKBgQDMghB72LNsG27nqQLloxCXPacy8eEsUJ+M\n5rHzR94PZIUXXh5neFlqe7XWvxY/j7qcUVn5MQcAG+0cj7wkDADRxI6Uvoj1VJVd\nRVZZSTGayEo/VTZ9vJrsOlhtr0UjM9pg4Dl9f/e1AMJAVKtl+gayfowoFdk5Xk2B\nIrveH8r1/wKBgQC/z/2xlVA8PvLQePnV1qHT3ziTy3p91iyVBl0iKXcnLFWpEeth\n/NB8I24psC6/VoASvXKpJ9TzYMrpOkfbSY0uXZGnu+DV/L63sUlm+5C9g4WR2HKL\nSN3b64oG+hG/N78KXGa74ChU0qudNoo6XPJro5Ov6MIcVaKYt1MZ32zNawKBgQCB\nAFpdhOhI/VUMFHSbXi0M+fsKC8G6LnE2dB80EtVkaEf74YbURfpBTR/7AjaKiaNx\nD2/t3JtJ2lPLfG91XYz2xUIbWcUS2/QMDbzWPXFo7YbIRHxG/D3NXVCCf9jgx8is\n60PYgmxCZOQjqEUl4n1vApxufLm1kmLZXoubJfrlCQKBgQDbfLFUm89rSqKAyGUV\n3mOqRLzxUhH6094X1xDMXB9NXVLquy7/auE7+0CVmnwWr4JajgFdd2LYPc6IpTIF\n1JPUA2Ey+wE8MavVmeDjB6qdYVwNqKs1dgQ7Yxf3SHrqURj8Bc7onW1be5nqM2L0\nvQYyPSH04/EUm9XI6EhgVAGE6A==\n-----END PRIVATE KEY-----\n",
      clientEmail:
        "firebase-adminsdk-sytyf@bookstore-103c6.iam.gserviceaccount.com",
    }),
    databaseURL: "https://bookstore-103c6-default-rtdb.firebaseio.com",
  });
}

export { admin as FIREBASE_ADMIN };
