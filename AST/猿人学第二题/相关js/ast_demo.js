const parse = require('@babel/parser').parse
const generator = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const types = require('@babel/types')
const fs = require('fs');
const { exit } = require('process');

// 自行将后面讲的三个特征的代码放到这
var $dbsm_0x4efb=['SsO2w50=','fsOKw5c=','EG0q','w48lNg==','wqzDnsOr','XWcV','w7EcTw==','wq15SQ==','w61wwoo=','WcKXFw==','bUgp','cmkt','w6Y/woI=','CsKpwqU=','dl8z','w4tkKA==','JmMP','QsKZJQ==','FMKIbw==','w6PDi1U=','b8KFag==','w6sQwqQ=','w4tPwqk=','wo1+wrs=','d2vCmQ==','w4Bqwqo=','wqbCixU=','w4XDtnA=','ZcK7cw==','w6F5woU=','w6gvwos=','RcOgw6Q=','w5dswrw=','V8KuHw==','woHCqRY=','FcK4bA==','cCUR','wpPDtQI=','a8KyaA==','w5lIwq0=','cGPCvw==','M8K/Ug==','WjEP','w63Cujc=','w58rdw==','MBMU','Z3rCjg==','cl3CsA==','wonDr8OP','BsKYwp4=','Vx7Chw==','w4JeFQ==','YsKQNQ==','TlXCtw==','woXDoQA=','EU8/','wpjDuwc=','w4QTBQ==','w4Aowq8=','w6nDklU=','wrnDjV8=','wofCoRQ=','wo/Ci8O5','wrpZwpE=','w6rCmDs=','woEQQQ==','EVIR','EsKiYw==','TlE9','w7AUPw==','w7vCkhw=','wq/CmRg=','TG7CrA==','w4UEIQ==','O2Qr','BsKgwrY=','w6ZAwr4=','w55qwpc=','w6TDonk=','w77Dry4=','dHHDgw==','woLCuSI=','IsKnwps=','wpPDocOI','w7tFwpo=','wpwrPg==','eFIq','RMK3Mw==','TH8P','wqjCvMOM','OsKaVg==','esKAaQ==','UsKwBQ==','w6gkag==','GVQ2','wpMXaA==','ZMOFw4w=','I8OPZw==','w5JCAA==','w70qZQ==','wqTCvjo=','O8KHdw==','dGrDow==','wonDjV8=','wq5gYg==','w5fCnQY=','ImIs','w5wEwpo=','w6YsSg==','EcK2UA==','wq4baQ==','wqbCuRc=','wpXCrDw=','wqTDmsON','YEnDlw==','wpvCrMOV','PcKIwok=','wopOwrA=','fH48','wozCuFE=','FcK1eg==','EcKiew==','a8KOfw==','w4YSYQ==','wrHCusOW','wpTCtjg=','wq/Cugo=','ekPCnQ==','wqEQDQ==','woTCtjE=','NTM7','UhLCnw==','wpPDrMOo','JnIW','Jmsy','SsK7QA==','w6Ftwro=','w54uwro=','w4BNwq8=','dAzChA==','w7YiGg==','GcK8fQ==','wo7DklA=','LEom','wpjCjyg=','FsK2wrE=','JsKQw6w=','LcK5cg==','wr3DpsO+','KMOGTg==','w5IKLw==','w5QFwrk=','LsK3ZQ==','d8K+Yg==','AcO9fg==','w7gCJQ==','ScOYw5Q=','TXwS','ScKqSg==','OcKDbw==','Qn7CvA==','wq3DoiI=','Q0jCug==','w4N5Bw==','CcKpw4k=','VAU4','w4EQwpg=','F8KmwrA=','w7wowpg=','fhY7','GsKTwoU=','XMKAfA==','wrPDqEY=','w79Qwr8=','UXnCkg==','FsKpWg==','RcKhVg==','woo9Rw==','AsKAYQ==','aSHCgw==','wozCjj4=','w7w2fQ==','wrLDnsOk','f8KObw==','wrAbSg==','w7QTwoU=','wrnCusOa','ATUB','QcK3Sw==','XDYa','wo3CkcOL','wp7Dp8Oe','w51tFg==','w6cfQw==','N8K8wqk=','Ml4v','w5EXwoM=','w7jCliA=','w5VDDQ==','w502Ww==','wrPCoR8=','ZsKCAQ==','EcOVRw==','w7w6woc=','dREu','JsKHw7A=','N8KewqY=','acKrSA==','w5xDIA==','wo7DuS8=','ZU7CrA==','wrHDl1I=','Yi7CkQ==','Z8Oyw5k=','w6xYwo0=','wqjCino=','b3/Cug==','bcOqw5U=','wrXCuWs=','akrDgQ==','ZGrDnw==','w55iDQ==','wobCvh0=','wrBmwoY=','w67Dq2Y=','bUHCgg==','U8KADw==','eSkv','JsKrfA==','LGAR','Hkc/','fXY7','w6w0wpU=','w4goQg==','P8KZwp0=','csO4w5s=','bcOrw5w=','UMKXKQ==','WsKwbg==','wrQaXw==','w6TCrD0=','w7EOwoA=','wqYzBw==','wrrCrwk=','VAgu','bcK1bQ==','w43DqcK5','IcKHwoY=','FhU7','Q8KlLA==','w6TDhcKE','w4DDmX4=','CFk1','CsKxcA==','XcKxKQ==','wpzCnAs=','wrwjPw==','aCYd','UF7CnA==','wonCsis=','w6QhwoI=','w6N7wpA=','wrl5wro=','wr3Cvgg=','w7fDknY=','w6Q8aw==','esKMVg==','w4sJwo8=','wqnCg3w=','wqtbwqk=','VH0r','C8KGbQ==','w5YwVg==','BsKwwp8=','wovDnMOv','w7ASDw==','w4bDi8Kd','acOhw4I=','QnkV','ZWjCuw==','w6bDgEQ=','QmHCtA==','G0Q3','w5hUwps=','CsKbwoE=','A8K6wrg=','bnEi','w6PCqxU=','SGws','VVXCkg==','GU8G','bAcZ','KMK1wqo=','wrzDhA0=','XUky','w7pcwrQ=','w7fDlF8=','woLCjjg=','w7I5Zw==','JcKjTQ==','dcK1AA==','w7TDmHQ=','wrAsTw==','JmU2','w7QJCQ==','RA/CoQ==','VRLCnw==','bmjCtg==','wqjClsOU','URTCgw==','Oxcn','woEwXQ==','a2rDlg==','BsKRwqY=','wpI7Sg==','wocPIQ==','flrCrA==','ecKYVA==','SSUo','RcK9QA==','bCnCpg==','w7bCuB4=','QcKcYQ==','wrkOWg==','wrzCnhQ=','w5Z9FA==','En8/','wrA4ag==','wqTCgDY=','NsOXeA==','w7Bbwro=','fsKFKQ==','QmzCmw==','wrwTXA==','w5BBDg==','wqTDqMOS','w5AEwqc=','TxAr','cjk5','wqXCiRA=','woxhwqY=','O8KifA==','R8KrTg==','TCQK','w40AbQ==','wq7CpSo=','wrvDu8Oy','w5rCpiE=','acKfZw==','OMKAwrs=','wp9gQg==','woljwo4=','bG3CtQ==','w5rCnQM=','QFfCtg==','wqTCuRQ=','w7vDsFI=','w68jwpk=','S0LDvw==','eMK2GA==','D8OrWg==','FUEg','w5tgwoU=','S3YT','woU6wq4=','FcK4ew==','QH09','McKofQ==','w4nDvm4=','UGnCiQ==','w47DsDM=','IsK4QA==','w7hKwoY=','CsK7Rg==','wo3Dlzs=','w7Mxwps=','ZgvCjA==','wolVwok=','wqbCnU8=','a0bCuw==','SFTCkg==','w5IJwrg=','JR86','wobDsWU=','OcKnVA==','aSE7','fMKIMw==','Zj4m','wrnCgGg=','wqrDkmU=','wpM5cw==','QBXCvA==','5b+MfcKs','PsKowrE=','C8KWXQ==','w4kCwr0=','w50WwqY=','w7TCkio=','eG8C','wp1fwo0=','w4xJKw==','wo7Chh8=','QgLCvg==','w5nDqGE=','wqTDrBk=','O002','M8KcZA==','w6LDlW0=','wqvDuMON','QXXCjQ==','aH/Dlw==','w5fDsXw=','w7osFA==','EMKRw5M=','w5AXwoA=','w7NTwoU=','CMOoWQ==','KMKBw7c=','cFQf','G1YX','VMOaXg==','UzoT','wok0w6I=','w5YWwpQ=','aGTDlQ==','VWPCgA==','bsKbaA==','Gw4s','YUzClw==','w4Qhwro=','w78VwoQ=','MMKXw7o=','U2XChw==','MMO8eA==','BcKhw6A=','H8KSwqo=','w7bDlWU=','w63CuhA=','EF0J','wpJLwoY=','wrgPOQ==','TsKTGQ==','woTCoAc=','w70rwqM=','wovDlMOE','wqJ2wrE=','B8K+wq4=','wrTCmRQ=','bsOIw7U=','NXA6','S2/Cpw==','QcKiRA==','wo5Hwoc=','LcKvYA==','Q8KufA==','wpXCsD4=','wqR3RA==','NiMA','w7/DniU=','PBc0','w7UCfA==','R8KGLw==','w7kpwr4=','EsKiw5E=','wpDDqsOD','YMKNLA==','w5FRwrY=','w5fDicKN','w55Iwrs=','IAQW','EWwE','TsKqZg==','awAJ','bF8z','L8KlSw==','ScKQVQ==','T2HCtw==','TzbCvA==','Z0rCvA==','QCQa','woHCoSU=','w5vDmF0=','w47Cmxw=','RVXCug==','FcK9ew==','wq/CnxA=','w6UxEg==','wrnCsEw=','aMOqw7E=','HsKfw4M=','w5Akwr0=','w4EVZw==','w4wlwqU=','wpLCoD0=','K8K5wq0=','OcKVwps=','wo7DhcOA','w7ItBg==','wpzDuiA=','w7ZHHQ==','DMKEwoI=','fnrCpg==','w7PDsHw=','BMOcQw==','wqzDunI=','PcKqwrk=','wr3DoRM=','w6TCiTQ=','w7vDmX0=','f8KDdg==','C8KMwpg=','w5ISwr8=','XcKgcQ==','fTos','bnw2','wojCuRc=','w4cPwqQ=','EBwY','UMKfew==','UR4l','PlQP','Tx7Cpw==','OMK1wok=','w6ICQg==','RsK4PA==','wpzChsO/','wrLChcOV','dV44','woDCjy4=','wqfDjXI=','w4k+cQ==','wq/Dpyw=','w6PDrWY=','JWwK','wofCm2w=','EF8K','wqXDjGA=','eSUv','w5QDw6Q=','w7YnWA==','dFTCqw==','wonCvDo=','wpPDhFI=','NW0E','OGo0','aWw6','SwMr','C2ML','e07Ctw==','FMKZwow=','wqXCn30=','MWYq','A8K1wrw=','wrkZNA==','EAAh','SHLCnA==','5Lm755el6Iu5','fV18','M8KTw4A=','A3EC','aijCjw==','w7bDrlw=','wqx5TA==','w4YIwr0=','wpjDvjI=','w6RhwqM=','cMKJYQ==','worCqsO9','w70uwoU=','wr5gwpo=','MsKrwro=','CMKWw5E=','w5XDtcKi','Q8KpTw==','JMKJSQ==','wr/CuCs=','NcKJcA==','WcKMEw==','AcK0VQ==','w68AwqM=','w69owps=','acKHEQ==','wqrCsWw=','wqFBwow=','BsKfZQ==','cgon','wpvCt8O6','SVXClQ==','wpnCvBU=','wrfCoGs=','MsOZUw==','w6DCtDc=','OcK7wp4=','w6Qqeg==','Ek0l','NsO1Tw==','wojDggc=','wrnCgx4=','w4TDnm8=','DMO2UQ==','wqF4wq4=','wqJNZA==','w50WIg==','w7fDjMKm','fwEQ','w6Itwpk=','AsKDRA==','w5vDoFg=','EiAP','W8ODw4U=','w47Dn8KH','w6Ipwrk=','w6zClTA=','F8KiwqI=','N8KUwpk=','KsKUwrs=','fjkQ','KX8E','wqh8aA==','D8Kdew==','fGHChg==','W2s/','w4bDlSo=','f14N','JsOIXA==','S2nCvg==','SFrCig==','wo3CtXI=','C8Kpw4g=','w4cUwqI=','w7vCpjw=','CMKewoA=','w4Zxw6I=','wqbCnhA=','f0PDoQ==','HnAZ','NsKRw5E=','wpjDrMOy','wqDCvls=','A8KuYQ==','w5bCmgI=','BAxa','AcKVWg==','c13Cug==','woPCkDU=','DR8x','w6Vawow=','WTI5','X0vDiQ==','Q102','wrzDiTo=','ZMKgNQ==','a8KxEw==','N000','wrrCjAw=','NwAG','XMK4HA==','w7M3woM=','w7FRwro=','AMKgwrw=','wqPCoEc=','woDClCU=','wrjCrh8=','wq7DoR0=','UF4P','wpTCq2w=','IC9g','w67Dl3k=','Vx7Cug==','cXgs','IMKxVw==','w5fCpAM=','UMO4w7k=','w4FTQQ==','JsKDcQ==','w6J3wow=','AcKORw==','w5nDsn8=','w4nCkx8=','wrBMYA==','wq7Ckx0=','w4fDq1Y=','e8OJw7o=','wqsVSQ==','Dl48','w7IVAg==','w7bDhMKa','w6J9woU=','RMKgNQ==','woTDqxA=','JlwK','PmMO','UsKZPA==','w5bDk0c=','w4kAQA==','wqPCkHo=','AMKzw40=','wr1Owp4=','w41dwoQ=','ekPCrA==','VMOqw4Y=','V8K7Pg==','KcKHw4M=','wp/DosO2','wrPDv8O2','CMKafA==','w7bCuyE=','a3zDvQ==','cl3CsQ==','woF2SQ==','wqfDm1k=','wpJLLg==','w4TDn1g=','wqcaUw==','w6cjwpk=','wqfCgD8=','fsKiZA==','fcK0Yw==','Yjkj','wofCmTw=','w4MywoU=','w67DqFU=','wps4Jw==','w4DDqMKW','Zy3Ckw==','w67DhMKR','Kmwc','LnUv','w64fHQ==','worDpTA=','ZnDDtg==','wpJIRg==','eTfCuA==','MmYY','w5APwps=','STkE','eEXCgQ==','Om4V','w5sCwrw=','wpJqwrA=','fUTCnA==','HFA0','w4Y+RA==','W8KbUg==','EB4M','wrdOwqY=','wpDCncO2','QUXCiA==','b0DChA==','w54Nwp8=','w4Mtwo4=','w4vDhEI=','w6N7wow=','wozDux0=','S0DDvw==','Y2o4','cMKLdQ==','X2sk','EsKcwqU=','bsKpTA==','wqDDt8OM','SnjCvw==','wrIBOw==','ZsKQVQ==','woXCqXA=','RggD','wpTCqWc=','SsOnw7g=','wofCmiQ=','w6tEHw==','wrfCv2U=','w6UtwoI=','aTcs','M8K/w6E=','wo7Cjz8=','csODw5I=','VBPCoA==','MEEB','w79cwp8=','w4kywp8=','wrFOwq4=','wrjDhsOl','w7bDoMKP','w4gscQ==','wp/DmcO0','w4NwwoA=','c2DDgg==','wozCkko=','wpLCsMOb','b8KzWw==','w4nDtcKc','GlIA','w4B2wro=','w4x3wqc=','wqXCrsON','Yhs9','w4oYwqY=','w5kvIQ==','TcOsw4U=','w4FjMQ==','w6nDtcKa','w7g8Cg==','wonCrBM=','bDQ8','DcKuRg==','wpZHUQ==','DMKpRg==','w4loNA==','woE2HQ==','w6bCvgg=','IcKBdw==','dVHCkw==','w6PDlcKd','OcK8bQ==','JFYH','Zm/DtA==','IMKcfQ==','wprCjio=','Q1vCrA==','wq/CjzY=','VA7CnA==','w7wRNA==','wrMtTw==','wovCuj8=','w4BXwoM=','wpDClMOB','DBAS','IcKjQQ==','HMO2SA==','w4vDjl8=','YU/CkQ==','w7DCjDQ=','wqfCihY=','w4kYeA==','w5EIQw==','w4DDtXo=','VGvCuw==','w7QtwqA=','wpotGg==','aRct','wqUSFA==','wrnDrsOw','w7QSwqs=','JxwW','wrsZDg==','WHQ0','EsKqw40=','w6ZRwqU=','w70lwqk=','wovDo8Ok','wr/DgRs=','w73DhsKB','ISAw','w7oHw6A=','ZcKyag==','TEwb','w7zDs8KU','HMKpwqM=','wpJAUQ==','dsK0SA==','bWPCnA==','w5HDonU=','w7DCtyc=','w5M9wqc=','LsK2bA==','bBTCqg==','wr0FOQ==','QG7DmA==','VsKhXw==','CcOFQg==','DWww','WMKnSA==','w7B7Ng==','w4oiYg==','GMKWeQ==','YRnChQ==','S8KxAA==','asK6cQ==','b1Yl','wpHCmiU=','bRod','UMKkNw==','D8K9wo8=','EFAD','f2Ma','W8KKPQ==','MsKWUQ==','wr7CsMOW','w7EQVQ==','w4XDo8Kn','J8KYYA==','wpHCiCY=','wpnDlX0=','asKZdQ==','B8KRwqQ=','wpnCnFg=','wpnDow8=','d3MN','wrHCk3M=','aD8h','Z8KJKA==','w67CpCI=','wpLDiBc=','w755wpk=','woMtRg==','En0t','w5bCqCU=','a8KebA==','QBrCpQ==','SsKcSg==','wqzCryw=','wq/DoQM=','wobCjQg=','IXgk','woVvcQ==','DMKUUw==','AcK/aA==','w6Nmwow=','w548XA==','w55bJw==','S1Mx','w5LCkCE=','w50swoA=','KsKCwrA=','w6tfwpw=','wpkhAw==','UsOBw5o=','ZMKLEw==','wo5jwo8=','wrLCjm0=','wpjCji8=','wqrCi8OK','w5zCv0w=','wp/DqcOe','MX8U','woXCjGs=','w7towqo=','w6FaPA==','CcK+Tw==','wqnDvcOl','w6gXwqQ=','eWXCtg==','552s776x5L2Z','UiQ/','GVIW','wrbCjWw=','w49owog=','a3vClw==','I2kP','wrjDqVs=','e8K7MQ==','wqTCozM=','wrfCixQ=','eMKBWA==','N8KUw68=','wrEYQA==','XQQF','w7pTwp0=','NMKqwqA=','fngb','AV4U','w613woY=','BxtA','c8K1LA==','wpl+wqo=','w4sPwoQ=','XRQ/','O8KWw5c=','w4TDkUQ=','w7lNwqM=','Qlwa','RFMp','w5YAwo0=','w4Eyag==','BsKBXw==','w7EHwrM=','wqPCtkU=','N8KEwpw=','KMKWw4k=','QgvCuQ==','wqnClMOO','w4bCtB8=','dMOMw5E=','esK4Jg==','TGTDsA==','P8KGZw==','wq/CnsOM','X8KxIw==','woLDn8OU','w74XWw==','aMKuOg==','w7bChMOm','JWQp','Imgi','REbCvA==','OsKFwr0=','w6XCqjo=','A2AL','w6nDkMKT','w41hCQ==','w7EmSA==','wqbDoX0=','d8KrRw==','w4xswqc=','YsKwEw==','w6wtwqQ=','wo/DoAc=','U8K4Cg==','OzoP','wpfCryQ=','Q8KXKA==','RycF','UMKlMw==','w5AuwoM=','fsKPHg==','w69bwo8=','UVU4','AcOKfQ==','wr/ChcOg','w4koeg==','wovDh8OD','XcKtCw==','w6gVQw==','cHfDhQ==','woplfw==','wozDl8Oe','w78Uew==','wqPDocOz','wqLCvCM=','UwvCkA==','wq/DpsOD','w63DmCw=','wrYXYg==','BcKQw5c=','woA5PA==','GhrCqw==','wqcKYw==','Y3/Cmw==','I8OcYw==','w7hOLA==','F8Kcwrk=','B8KSwo8=','w6gqwrg=','AGwi','FXcD','DMK0dA==','wqzDqsOE','w5cwwq4=','Xkk6','EcKOwos=','wpRgwqI=','w70IJQ==','AMK8wq4=','wrctBg==','w6UDEw==','IcKldQ==','AyEB','R3rCng==','XR0Q','EsKbYA==','wrQ5EA==','w65iNA==','Ym8D','w6k6XA==','MMKywoY=','O8KOwqE=','NsOMdQ==','wonCujw=','FMKfUg==','wqHDm10=','wrLDusOx','w6EuBA==','wonClTg=','JcKAw4o=','JXwJ','OBM7','R2DCjQ==','a1QM','wpI9Rg==','K8KowqY=','wpLDtg8=','US/Cow==','FRcC','aMKPGQ==','w45YFg==','wqRIwpc=','wq/DjsO/','CE0G','w6zDr8KU','DmAg','F8KVwrk=','J8KkwoE=','w7QITA==','wq/CiAs=','Sn/CvA==','wop7wok=','HTQd','dW/CkQ==','f2LCvg==','SmDCkA==','Rxca','w6wKWQ==','w7fClhU=','ZQku','NUw7','w65vEQ==','TsKoVQ==','w4c4fQ==','woM2aQ==','XUPCuw==','bCsG','KsKZfA==','w7EzZQ==','BBsF','w7rDkUc=','wrsTOQ==','RcKWAw==','J8KEwqY=','UhUO','c3bDkw==','CsKeZQ==','w5rCnMK0','NsK4fA==','GWcf','wrFgUA==','MMOreQ==','wqEpYA==','fcKCBQ==','w4UeUA==','EsKBwrM=','MMKRwqU=','wqPDimA=','R8OSw44=','wqjDjDw=','wprDicO3','woM0Xg==','bWnCmg==','w7fDtGM=','wqPCsXE=','C8Kpwqc=','cFfClA==','w5XDuXA=','w6xZwp0=','wqcXLw==','Z8OFw4A=','w7Acdw==','wopjwoM=','wpXCqj4=','w4PCkhM=','IcKVwoY=','woh8wpk=','A8Kbwo8=','wq3CjEY=','wr99UQ==','IcKVfw==','QGgX','w5UOwr8=','GsKfw6w=','LMK0wrE=','w67DvsK3','wpxHwpE=','w5vDgH0=','M8Kuwpg=','PsKkw7E=','w5fDhmQ=','RmPChQ==','w7UyLw==','w4g/Rw==','w5jDm2Y=','CcKLwoA=','XRgB','w4glwog=','w6h4Fw==','Zn0y','w74Fwr0=','FcKAwrQ=','wqTDmHM=','RGfCrQ==','wqLCpR0=','w5Ehwp8=','fMKAJQ==','wpvDvy8=','w4kFZA==','aCgK','FMO6bQ==','OAAM','QXE1','fmHDvw==','esOFw5M=','Y1QZ','w65PLQ==','w44AaA==','BcKTw44=','woHDvxo=','w6jCuxM=','wqDDtcO2','b1bCjw==','O0g4','VTMK','woLCjTQ=','w4QOaQ=='];(function(_0x14b0d7,_0x4efb97){var _0x4fb645=function(_0x4708a8){while(--_0x4708a8){_0x14b0d7['push'](_0x14b0d7['shift']())}};var _0x55d523=function(){var _0x1fa707={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x57760d,_0x9056ec,_0x3bdc16,_0x11077f){_0x11077f=_0x11077f||{};var _0x59aae6=_0x9056ec+'='+_0x3bdc16;var _0x4c3538=0;for(var _0x46ecb6=0,_0x17bfac=_0x57760d['length'];_0x46ecb6<_0x17bfac;_0x46ecb6++){var _0x35df71=_0x57760d[_0x46ecb6];_0x59aae6+='; '+_0x35df71;var _0x45c34f=_0x57760d[_0x35df71];_0x57760d['push'](_0x45c34f);_0x17bfac=_0x57760d['length'];if(_0x45c34f!==!![]){_0x59aae6+='='+_0x45c34f}}_0x11077f['cookie']=_0x59aae6},'removeCookie':function(){return'dev'},'getCookie':function(_0x2d5bb3,_0x4b37c9){_0x2d5bb3=_0x2d5bb3||function(_0x4bdfc0){return _0x4bdfc0};var _0x407bb9=_0x2d5bb3(new RegExp('(?:^|; )'+_0x4b37c9['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x44b88b=function(_0x5bad0f,_0x340af6){_0x5bad0f(++_0x340af6)};_0x44b88b(_0x4fb645,_0x4efb97);return _0x407bb9?decodeURIComponent(_0x407bb9[1]):undefined}};var _0x5c4831=function(){var _0x343507=new RegExp('\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}');return _0x343507['test'](_0x1fa707['removeCookie']['toString']())};_0x1fa707['updateCookie']=_0x5c4831;var _0x580292='';var _0x57cb35=_0x1fa707['updateCookie']();if(!_0x57cb35){_0x1fa707['setCookie'](['*'],'counter',1)}else if(_0x57cb35){_0x580292=_0x1fa707['getCookie'](null,'counter')}else{_0x1fa707['removeCookie']()}};_0x55d523()}($dbsm_0x4efb,186));var $dbsm_0x4fb6=function(_0x14b0d7,_0x4efb97){_0x14b0d7=_0x14b0d7-0;var _0x4fb645=$dbsm_0x4efb[_0x14b0d7];if($dbsm_0x4fb6['TwEgcS']===undefined){(function(){var _0x1fa707;try{var _0x580292=Function('return (function() {}.constructor("return this")( ));');_0x1fa707=_0x580292()}catch(_0x57cb35){_0x1fa707=window}var _0x5c4831='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1fa707['atob']||(_0x1fa707['atob']=function(_0x57760d){var _0x9056ec=String(_0x57760d)['replace'](/=+$/,'');var _0x3bdc16='';for(var _0x11077f=0,_0x59aae6,_0x4c3538,_0x46ecb6=0;_0x4c3538=_0x9056ec['charAt'](_0x46ecb6++);~_0x4c3538&&(_0x59aae6=_0x11077f%4?_0x59aae6*64+_0x4c3538:_0x4c3538,_0x11077f++%4)?_0x3bdc16+=String['fromCharCode'](255&_0x59aae6>>(-2*_0x11077f&6)):0){_0x4c3538=_0x5c4831['indexOf'](_0x4c3538)}return _0x3bdc16})}());var _0x4708a8=function(_0x17bfac,_0x35df71){var _0x45c34f=[],_0x2d5bb3=0,_0x4b37c9,_0x407bb9='',_0x44b88b='';_0x17bfac=atob(_0x17bfac);for(var _0x5bad0f=0,_0x340af6=_0x17bfac['length'];_0x5bad0f<_0x340af6;_0x5bad0f++){_0x44b88b+='%'+('00'+_0x17bfac['charCodeAt'](_0x5bad0f)['toString'](16))['slice'](-2)}_0x17bfac=decodeURIComponent(_0x44b88b);var _0x4bdfc0;for(_0x4bdfc0=0;_0x4bdfc0<256;_0x4bdfc0++){_0x45c34f[_0x4bdfc0]=_0x4bdfc0}for(_0x4bdfc0=0;_0x4bdfc0<256;_0x4bdfc0++){_0x2d5bb3=(_0x2d5bb3+_0x45c34f[_0x4bdfc0]+_0x35df71['charCodeAt'](_0x4bdfc0%_0x35df71['length']))%256;_0x4b37c9=_0x45c34f[_0x4bdfc0];_0x45c34f[_0x4bdfc0]=_0x45c34f[_0x2d5bb3];_0x45c34f[_0x2d5bb3]=_0x4b37c9}_0x4bdfc0=0;_0x2d5bb3=0;for(var _0x343507=0;_0x343507<_0x17bfac['length'];_0x343507++){_0x4bdfc0=(_0x4bdfc0+1)%256;_0x2d5bb3=(_0x2d5bb3+_0x45c34f[_0x4bdfc0])%256;_0x4b37c9=_0x45c34f[_0x4bdfc0];_0x45c34f[_0x4bdfc0]=_0x45c34f[_0x2d5bb3];_0x45c34f[_0x2d5bb3]=_0x4b37c9;_0x407bb9+=String['fromCharCode'](_0x17bfac['charCodeAt'](_0x343507)^_0x45c34f[(_0x45c34f[_0x4bdfc0]+_0x45c34f[_0x2d5bb3])%256])}return _0x407bb9};$dbsm_0x4fb6['BaeqHj']=_0x4708a8;$dbsm_0x4fb6['wSJloT']={};$dbsm_0x4fb6['TwEgcS']=!![]}var _0x55d523=$dbsm_0x4fb6['wSJloT'][_0x14b0d7];if(_0x55d523===undefined){if($dbsm_0x4fb6['Ruwbiq']===undefined){var _0x5de22e=function(_0x51f86e){this['YiuJnS']=_0x51f86e;this['TQPROV']=[1,0,0];this['HEUqxj']=function(){return'newState'};this['kXBwDJ']='\\w+ *\\(\\) *{\\w+ *';this['VuNlQz']='[\'|"].+[\'|"];? *}'};_0x5de22e['prototype']['SQqbWs']=function(){var _0x27f1e0=new RegExp(this['kXBwDJ']+this['VuNlQz']);var _0x2e919d=_0x27f1e0['test'](this['HEUqxj']['toString']())?--this['TQPROV'][1]:--this['TQPROV'][0];return this['hiMjYX'](_0x2e919d)};_0x5de22e['prototype']['hiMjYX']=function(_0x230111){if(!Boolean(~_0x230111)){return _0x230111}return this['SBjQRT'](this['YiuJnS'])};_0x5de22e['prototype']['SBjQRT']=function(_0x1d0a49){for(var _0x994bf7=0,_0x299889=this['TQPROV']['length'];_0x994bf7<_0x299889;_0x994bf7++){this['TQPROV']['push'](Math['round'](Math['random']()));_0x299889=this['TQPROV']['length']}return _0x1d0a49(this['TQPROV'][0])};new _0x5de22e($dbsm_0x4fb6)['SQqbWs']();$dbsm_0x4fb6['Ruwbiq']=!![]}_0x4fb645=$dbsm_0x4fb6['BaeqHj'](_0x4fb645,_0x4efb97);$dbsm_0x4fb6['wSJloT'][_0x14b0d7]=_0x4fb645}else{_0x4fb645=_0x55d523}return _0x4fb645};

console.log($dbsm_0x4efb);


// 待反混淆的文件
let jsCode = fs.readFileSync('./AST/yrx_2/input.js', { encoding: 'utf-8' })

let ast = parse(jsCode);

//////////////////
// 1. 还原字符串编码
// 解编码
const transform_literal = {
    NumericLiteral({node}){
        if (node.extra && /^0[obx]/i.test(node.extra.raw)){
            node.extra = undefined;
        }
    },
    StringLiteral({node}){
        if (node.extra && /\\[ux]/gi.test(node.extra.raw)){
            node.extra = undefined;
        }
    }
}
traverse(ast, transform_literal);


// 2. 解密函数
traverse(ast, {
    CallExpression : {
        exit:function(path){
            if (path.node.callee.name === '$dbsm_0x4fb6'){
                // console.log(path.toString());

                let args = path.node.arguments;
                path.replaceInline(types.stringLiteral($dbsm_0x4fb6(args[0].value, args[1].value)))
            }
        }
    }
});

// 3. 字符串拼接
traverse(ast, {
    BinaryExpression:{
        exit: function(path) {
        const { node } = path;
        if (node.operator === '+') {
            if (
            (types.isStringLiteral(node.left) || types.isNumericLiteral(node.left)) &&
            (types.isStringLiteral(node.right) || types.isNumericLiteral(node.right))
            ) {
            path.replaceWith(types.stringLiteral(path.evaluate().value))
            }
        }
        }
    }
})

// 4. 将动态赋值变为静态
traverse(ast, {
    AssignmentExpression(path) {
      const { node } = path;
      const left = node.left;
      if (
        types.isMemberExpression(left) &&
        types.isIdentifier(left.object) &&
        types.isStringLiteral(left.property)
      ) {
        const objName = left.object.name;

        const keyName = left.property.value;

        // 获取绑定信息
        const binding = path.scope.getBinding(objName);

        if (binding) {
          // 查找初始化或声明
          let objInit = null;

          if (binding.path.isVariableDeclarator()) {
            objInit = binding.path.node.init;
          } else if (
            binding.path.isAssignmentExpression() &&
            types.isObjectExpression(binding.path.node.right)
          ) {
            objInit = binding.path.node.right;
          }

          if (objInit && types.isObjectExpression(objInit)) {
            // 添加属性
            objInit.properties.push(
                types.objectProperty(types.stringLiteral(keyName), node.right)
            );

            // 删除原赋值语句
            path.remove();
          }
        }
      }
    },
  });


  // 4. 将object调用还原
  // 还原字符串返回
  traverse(ast,{
      MemberExpression:{
          exit: function(path) {
              if (path.node.object.name === "_0xc1401a") {
                  let properties = path.scope.getBinding("_0x19eac9").path.get("init.properties")
                  for (let index = 0; index < properties.length; index++) {
                      const element = properties[index];
                      if (element.node.key.value === path.node.property.value && types.isStringLiteral(element.node.value)
                      ) {
                          path.replaceInline(types.stringLiteral(element.node.value.value))
                          break;
                      }
                  }
              }
           }
      }
  })

  // 还原函数
  traverse(ast,{
      CallExpression:{
          exit: function(path) {
              if (path.node.callee.object && path.node.callee.object.name === "_0xc1401a") {
                  // console.log(path.toString());

                  let properties = path.scope.getBinding("_0x19eac9").path.get("init.properties")
                  for (let index = 0; index < properties.length; index++) {
                      const element = properties[index];
                      if (element.node.key.value === path.node.callee.property.value) {
                          const argument = element.get("value.body.body.0.argument")
                          if (types.isCallExpression(argument)) {
                              let origin_args = path.get('arguments')
                              origin_args = Array.from(origin_args)
                              let args
                              if (origin_args.length === 1) {
                                  args = []  // 没有参数
                              } else {
                                  args = origin_args.slice(1).map(arg => arg.node)
                              }
                              path.replaceInline(types.callExpression(path.get('arguments.0').node,args));
                              // console.log(path.toString());
                              break;
                          }else if (types.isBinaryExpression(argument)) {
                              let operator = argument.node.operator;
                              let left = path.node.arguments[0];
                              let right = path.node.arguments[1];

                              path.replaceWith(types.binaryExpression(operator, left, right))
                              // console.log(path.toString());
                              break;
                          }
                      }
                  }
              }
           }
      }
  })

  // 还原其余的引用 对象调用
  traverse(ast,{
      MemberExpression:{
          exit: function(path) {
              if (path.node.object.name && path.scope.getBinding(path.node.object.name) && types.isVariableDeclarator(path.scope.getBinding(path.node.object.name).path)) {

                  console.log(path.toString());
                  if (path.toString().includes("charAt")) {
                      // debugger;
                  }

                  if (!path.scope.getBinding(path.node.object.name).path.node.init.name) {
                      return;
                  }

                  let properties = path.scope.getBinding(path.scope.getBinding(path.node.object.name).path.node.init.name).path.get("init.properties")
                  for (let index = 0; index < properties.length; index++) {
                      const element = properties[index];
                      if (element.node.key.value === path.node.property.value && types.isStringLiteral(element.node.value)
                      ) {
                          path.replaceInline(types.stringLiteral(element.node.value.value))
                          break;
                      }
                  }
              }
           }
      }
  })

  // 对象函数
  traverse(ast,{
      CallExpression:{
          exit: function(path) {

              // console.log(path.toString());
              if (path.node.callee.object && path.node.callee.object.name && path.scope.getBinding(path.node.callee.object.name) && types.isVariableDeclarator(path.scope.getBinding(path.node.callee.object.name).path)) {

                  if (path.toString().includes("charAt")) {
                      // debugger;
                  }

                  if (!path.scope.getBinding(path.node.callee.object.name).path.node.init.name) {
                      return;
                  }

                  let properties = path.scope.getBinding(path.scope.getBinding(path.node.callee.object.name).path.node.init.name).path.get("init.properties")
                  for (let index = 0; index < properties.length; index++) {
                      const element = properties[index];
                      if (element.node.key.value === path.node.callee.property.value) {
                          const argument = element.get("value.body.body.0.argument")
                          if (types.isCallExpression(argument)) {
                              let origin_args = path.get('arguments')
                              origin_args = Array.from(origin_args)
                              let args
                              if (origin_args.length === 1) {
                                  args = []  // 没有参数
                              } else {
                                  args = origin_args.slice(1).map(arg => arg.node)
                              }
                              path.replaceInline(types.callExpression(path.get('arguments.0').node,args));
                              // console.log(path.toString());
                              break;
                          }else if (types.isBinaryExpression(argument)) {
                              let operator = argument.node.operator;
                              let left = path.node.arguments[0];
                              let right = path.node.arguments[1];

                              path.replaceWith(types.binaryExpression(operator, left, right))
                              // console.log(path.toString());
                              break;
                          }
                      }
                  }
              }
           }
      }
  })


  // 去除死代码
  traverse(ast, {
      IfStatement: {
          exit: function (path) {
              if (types.isBooleanLiteral(path.node.test)) {
                  // console.log(path.toString());
                  if (path.node.test.value) {
                      path.replaceWithMultiple(path.node.consequent.body)
                  } else {
                      path.replaceWithMultiple(path.node.alternate.body)
                  }
              } else if (types.isBinaryExpression(path.node.test) && types.isStringLiteral(path.node.test.left) && types.isStringLiteral(path.node.test.right)) {
                  // console.log(path.toString());
                  const res = eval(path.get("test").toString());
                  if (res) {
                      path.replaceWithMultiple(path.node.consequent.body)
                  } else {
                      path.replaceWithMultiple(path.node.alternate.body)
                  }
              }
          }
      }
  })

  // 控制流还原
  let controler_code = {}
  let controler = {}
  traverse(ast, {
      WhileStatement: {
          exit: function (path) {
              if (
                  path.get('test').isUnaryExpression() || (path.get('test').isArrayExpression() && path.get('test').toString() === '[]')
              ) {
                  if (path.get('body.body').length === 0) return  // while循环体为空，直接返回
                  if (path.get('body.body.0').isTryStatement()) return
                  console.log(path.toString())
                  let switch_condition
                  try {
                      switch_condition = path.get('body.body.0.discriminant.object.name').node  // 控制器名称
                  } catch (e) {
                      return
                  }
                  controler_code[switch_condition] = {}  // 整体代码有多个控制流，需要分开

                  if (!path.scope.getAllBindings()[switch_condition].path.get('init.callee.object').isStringLiteral()) return
                  // 取控制器，var _0x41a9c6 = "1|4|3|0|2"["split"]('|')
                  eval(`controler['${switch_condition}'] = ` + path.scope.getAllBindings()[switch_condition].path.get('init').toString())
                  let cases_path = path.get('body.body.0.cases')  // 拿到所有case节点，数组类型
                  for (var i = 0; i < cases_path.length; i++) {
                      let case_num = cases_path[i].get('test.value').node  // case的值
                      controler_code[switch_condition][case_num] = []  // 控制流的代码
                      let case_content = cases_path[i].get('consequent')  // case的内容
                      case_content = Array.from(case_content)
                      case_content.forEach(c => {
                          if (!c.isContinueStatement()) {
                              // 剔除case中的continue
                              controler_code[switch_condition][case_num].push(c)
                          }
                      })
                  }
                  let code_node = []
                  for (var i = 0; i < controler[switch_condition].length; i++) {
                      let index = controler[switch_condition][i]
                      controler_code[switch_condition][index].forEach(n => {
                          code_node.push(n.node)
                      })
                      // code_node.push(controler_code[switch_condition][index][0].node)
                  }
                  path.replaceWithMultiple(code_node)
              }
          }
      }
  })

  // 去除无用代码
  ast = parse(generator(ast, { compact: true }).code)
  traverse(ast, {
      VariableDeclarator: {
          exit(path) {
              let { init, id } = path.node;
              if (!types.isObjectExpression(init) && !types.isIdentifier(id)) return;
              let { scope } = path;
              let binding = scope.getBinding(id.name);

              if (binding && binding.referencePaths.length === 0) {
                  path.remove();
              }else if (binding && binding.referencePaths.length === 1) {
                  if (types.isVariableDeclarator(path) && types.isObjectExpression(binding.path.node.init)) {
                      // console.log(path.toString());
                      path.remove();
                  }

              }
          }
      }
  })


//////////////////

// 语法数转JS代码
let { code } = generator(ast, { compact: false  });

// 保存
fs.writeFile('./ast/yrx_2/output.js', code, (err) => {
});