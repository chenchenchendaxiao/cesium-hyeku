let cities = {
    center: {
      id: 0,
      lon: 116.401394,
      lat: 39.915378,
      size: 10,
      color: Cesium.Color.GOLD,
    },
    points: [
      {//曼谷
        id: 1,
        lon: 100.607055,
        lat: 13.908694,
        color: Cesium.Color.YELLOW,
        size: 15,
        people:1600
      },
      {//天津
        id: 2,
        lon: 117.219712,
        lat: 39.128982,
        color: Cesium.Color.RED,
        size: 15,
        people:1303
      },
      {//金奈
        id: 3,
        lon: 80.249842,
        lat: 13.072385,
        color: Cesium.Color.BLUE,
        size: 15,
        people:435
      },
      {//乌鲁木齐 
        id: 4,
        lon: 87.488183,
        lat: 43.912699,
        color: Cesium.Color.GREEN,
        size: 15,
        people:405
      },
      {//拉萨
        id: 5,
        lon: 90.931172,
        lat: 29.303762,
        color: Cesium.Color.BLUE,
        size: 15,
        people:86
      },
      {//东京
        id: 6,
        lon: 139.783284,
        lat: 35.550162,
        color: Cesium.Color.BLUE,
        size: 15,
        people:1394
      },
      {//新德里 
        id: 7,
        lon: 77.108275,
        lat: 28.554298,
        color: Cesium.Color.BLUE,
        size: 15,
        people:1337
      },
      {//兰州 
        id: 8,
        lon: 103.619924,
        lat: 36.52342,
        color: Cesium.Color.BLUE,
        size: 15,
        people:361
      },
      {//广州 
        id: 9,
        lon: 113.308737,
        lat: 23.403292,
        color: Cesium.Color.BLUE,
        size: 15,
        people:1867
      },
      {//巴塞罗那
        id: 10,
        lon: 2.083303,
        lat: 41.297374,
        color: Cesium.Color.BLUE,
        size: 15,
        people:163
      },
      {//贵阳
        id: 11,
        lon: 106.805266,
        lat: 26.549892,
        color: Cesium.Color.BLUE,
        size: 15,
        people:610
      },
      {//雅加达
        id: 12,
        lon: 106.654535,
        lat: -6.158836,
        color: Cesium.Color.BLUE,
        size: 15,
        people:1056
      },
      {//莫斯科
        id: 13,
        lon: 37.416668,
        lat: 55.953213,
        color: Cesium.Color.SALMON,
        size: 15,
        people:128
      },
      {//郑州
        id: 14,
        lon: 113.854991,
        lat: 34.532534,
        color: Cesium.Color.WHITE,
        size: 15,
        people:1260
      },
      {//哈尔滨
        id: 15,
        lon: 126.260133,
        lat: 45.635019,
        color: Cesium.Color.SALMON,
        size: 15,
        people:988
      },
      {//巴黎
        id: 16,
        lon: 2.365247,
        lat: 48.726247,
        color: Cesium.Color.PINK,
        size: 15,
        people:1100
      },
      {//夏威夷
        id: 17,
        lon: -155.56036,
        lat: 19.880449,
        color: Cesium.Color.PINK,
        size: 15,
        people:140
      },
      {//悉尼
        id: 18,
        lon: 151.188024,
        lat: -33.9345,
        color: Cesium.Color.PINK,
        size: 15,
        people:467
      },
      {//南昌
        id: 19,
        lon: 46.711244,
        lat: 24.931671,
        color: Cesium.Color.PINK,
        size: 15,
        people:625
      },
      {//布宜诺斯艾利斯
        id: 20,
        lon: -58.394207,
        lat: -34.605586,
        color: Cesium.Color.PINK,
        size: 15,
        people:308
      },
      {//巴西利亚
        id: 21,
        lon: -47.88847,
        lat: -15.793287,
        color: Cesium.Color.PINK,
        size: 15,
        people:480
      },
      {//呼和浩特
        id: 22,
        lon: 111.833257,
        lat: 40.859684,
        color: Cesium.Color.PINK,
        size: 15,
        people:344
      },
      {//银川
        id: 23,
        lon: 51.311856,
        lat: 35.689964,
        color: Cesium.Color.PINK,
        size: 15,
        people:28
      },
      {//西宁
        id: 24,
        lon: 102.04758,
        lat: 36.532589,
        color: Cesium.Color.PINK,
        size: 15,
        people:246
      },
      {//阿布贾
        id: 25,
        lon:7.269511,
        lat: 9.005979,
        color: Cesium.Color.PINK,
        size: 15,
        people:200
      },
      {//奥兰多
        id: 26,
        lon: -81.316068,
        lat: 28.454838,
        color: Cesium.Color.PINK,
        size: 15,
        people:32
      },
      {//哈拉雷
        id: 27,
        lon: 31.050597,
        lat: -17.819916,
        color: Cesium.Color.PINK,
        size: 15,
        people:187
      },
      {//成都
        id: 28,
        lon: 103.957383,
        lat: 30.565334,
        color: Cesium.Color.PINK,
        size: 15,
        people:2093
      },
      {//纽约
        id: 29,
        lon: -73.875224,
        lat:40.773944,
        color: Cesium.Color.PINK,
        size: 15,
        people:882
      },
      {//杭州
        id: 30,
        lon: 120.435928,
        lat: 30.237135,
        color: Cesium.Color.PINK,
        size: 15,
        people:1036
      },
      {//台北
        id: 31,
        lon: 121.562612,
        lat: 25.068776,
        color: Cesium.Color.PINK,
        size: 15,
        people:263
      },
    ],
    options: {
      name: '',
      polyline: {
        width: 2,
        material: [Cesium.Color.GREEN, 3000],
      },
    },
      }
    export {cities}