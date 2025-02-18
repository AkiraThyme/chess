const bots = {
    'Baihua': {
      image: 'Images/baihua.jpg',
      description: 'Bai Hua is a little kitten helping Code Monkey King to write chess engines. Did you bring some milk for her?',
      time: 0,
      depth: 1,
      book: [
        'e2e4 e7e5',
        'd2d4 d7d5',
        'c2c4 c7c5'
      ]
    },
    
    'DrPi': {
      image: 'Images/DrPi.png',
      description: 'Dr Pi is freelancer & blogger, make sure to visit his website:\nhttps://redandgreen.co.uk/',
      time: 0,
      depth: 2,
      book: [
        'e2e4 c7c5 c2c3',
        'e2e4 d7d6 d2d4 g7g6',
        'e2e4 d7d5 e4d5',
        'e2e4 e7e6 d2d4 d7d5',
        'e2e4 e7e5 b1c3',
        'e2e4 e7e5 g1f3 b8c6 f1c4 g8f6'
      ]
    },
    
    'CMK': {
      image: 'Images/cmk.png',
      description: 'Code Monkey King is a computer chess programmer and author of this engine:\nfreesoft.for.people@gmail.com',
      time: 0,
      depth: 4,
      book: [
        'b2b3 d7d5 c1b2 c7c5 e2e3 b8c6 f2f4 g8f6 g1f3 c8f5 f1b5 e7e6 f3e5 d8c7 e1g1 f8e7 b1c3 e8g8',
        'd2d4 b8c6 e2e4 e7e5 d4d5 c6e7 c2c4 e7g6 b1c3 g8f6 f1d3 f8c5 g1f3 d7d6 e1g1 c8g4 h2h3',
        'e2e4 c7c5 b1c3 d7d6 f2f4 g7g6 g1f3 f8g7 g2g3 b8c6 f1g2 e7e6 d2d3 g8e7 e1g1 e8g8',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g7g6 b1c3 f8g7 f2f3 g8f6 c1e3 e8g8 d1d2 b8c6 f1c4 c8d7 c4b3 a8b8 e1c1',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 e8g8 c2c3 d7d5',
        'g2g3 b8c6 f1g2 e7e5 c2c4 g8f6 b1c3 f8c5 e2e3 a7a6 g1e2 c5a7 a2a3 d7d6 h2h3 h7h5 d2d4 e5d4 e3d4 c8f5 c1e3 e8g8 e1g1 d8d7',
        'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 e7e6 e2e3 b8d7 d1c2 f8d6 f1d3 e8g8 e1g1',
        'c2c4 e7e6 g2g3 d7d5 g1f3 g8f6 d2d4 d5c4 f1g2 a7a6 e1g1 b8c6 e2e3 c8d7 b1c3 f8e7'
      ]  
    },
    
    'Wukong': {
      image: 'logo/talkchess_logo.png',
      description: 'Song Wukong is the great sage equal to heaven, now he is also playing chess:\nhttps://github.com/maksimKorzh/wukongJS',
      time: 1,
      depth: 0,
      book: [
        'g1f3 g8f6 c2c4 b7b6 g2g3',
        'g1f3 g8f6 c2c4 c7c5 b1c3 b8c6',
        'g1f3 g8f6 c2c4 c7c5 b1c3 e7e6 g2g3 b7b6 f1g2 c8b7 e1g1 f8e7',
        'g1f3 g8f6 c2c4 c7c5 g2g3',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 b8d7',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 f8e7 c1f4 e8g8 e2e3',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 f8e7 c1g5 e8g8 e2e3 h7h6',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 f8b4',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 c7c6 c1g5',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 c7c6 e2e3 b8d7 d1c2 f8d6',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'g1f3 g8f6 c2c4 e7e6 b1c3 d7d5 d2d4 c7c5',
        'g1f3 g8f6 c2c4 e7e6 g2g3 d7d5 f1g2 f8e7',
        'g1f3 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4',
        'g1f3 g8f6 c2c4 g7g6 g2g3 f8g7 f1g2 e8g8',
        'g1f3 g8f6 d2d4 c7c5',
        'g1f3 g8f6 d2d4 d7d5 c2c4 c7c6 b1c3 d5c4 a2a4 c8f5 e2e3 e7e6 f1c4',
        'g1f3 g8f6 d2d4 d7d5 c2c4 c7c6 b1c3 e7e6 c1g5',
        'g1f3 g8f6 d2d4 d7d5 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 d1c2 f8d6',
        'g1f3 g8f6 d2d4 d7d5 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'g1f3 g8f6 d2d4 d7d5 c2c4 c7c6 e2e3',
        'g1f3 g8f6 d2d4 d7d5 c2c4 d5c4 e2e3 e7e6 f1c4 c7c5 e1g1 a7a6',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 b8d7',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 f8e7 c1f4 e8g8 e2e3',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 f8b4',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 c7c6 c1g5',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 b1c3 c7c5',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 c1g5',
        'g1f3 g8f6 d2d4 d7d5 c2c4 e7e6 g2g3',
        'g1f3 g8f6 d2d4 e7e6 c1g5',
        'g1f3 g8f6 d2d4 e7e6 c2c4 f8b4 b1d2',
        'g1f3 g8f6 d2d4 e7e6 c2c4 f8b4 c1d2',
        'g1f3 g8f6 d2d4 e7e6 c2c4 b7b6 b1c3 c8b7 a2a3 d7d5 c4d5 f6d5',
        'g1f3 g8f6 d2d4 e7e6 c2c4 b7b6 b1c3 f8b4',
        'g1f3 g8f6 d2d4 e7e6 c2c4 b7b6 a2a3 c8b7 b1c3 d7d5 c4d5 f6d5',
        'g1f3 g8f6 d2d4 e7e6 c2c4 b7b6 g2g3 c8b7 f1g2 f8e7 e1g1 e8g8 b1c3 f6e4 d1c2 e4c3 c2c3',
        'g1f3 g8f6 d2d4 e7e6 c2c4 b7b6 g2g3 c8a6 b2b3 f8b4 c1d2 b4e7',
        'g1f3 g8f6 d2d4 e7e6 c2c4 c7c5 d4d5 e6d5 c4d5 d7d6 b1c3 g7g6',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 b8d7',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 f8e7 c1f4 e8g8 e2e3',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 f8b4',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 c7c6 c1g5',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 b1c3 c7c5',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 c1g5',
        'g1f3 g8f6 d2d4 e7e6 c2c4 d7d5 g2g3',
        'g1f3 g8f6 d2d4 e7e6 g2g3',
        'g1f3 g8f6 d2d4 g7g6 c1g5',
        'g1f3 g8f6 d2d4 g7g6 c2c4 f8g7 b1c3 e8g8 e2e4 d7d6 f1e2 e7e5 e1g1 b8c6 d4d5 c6e7 f3e1 f6d7',
        'g1f3 g8f6 d2d4 g7g6 c2c4 f8g7 g2g3 e8g8 f1g2 d7d6 e1g1',
        'g1f3 g8f6 d2d4 g7g6 g2g3 f8g7 f1g2 e8g8',
        'g1f3 g8f6 g2g3 g7g6',
        'g1f3 c7c5 c2c4 b8c6',
        'g1f3 c7c5 c2c4 g8f6 b1c3 b8c6',
        'g1f3 c7c5 c2c4 g8f6 b1c3 e7e6 g2g3 b7b6 f1g2 c8b7 e1g1 f8e7',
        'g1f3 c7c5 c2c4 g8f6 g2g3',
        'g1f3 d7d5 c2c4',
        'g1f3 d7d5 d2d4 g8f6 c2c4 c7c6 b1c3 d5c4 a2a4 c8f5 e2e3 e7e6 f1c4',
        'g1f3 d7d5 d2d4 g8f6 c2c4 c7c6 b1c3 e7e6 c1g5',
        'g1f3 d7d5 d2d4 g8f6 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 d1c2 f8d6',
        'g1f3 d7d5 d2d4 g8f6 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'g1f3 d7d5 d2d4 g8f6 c2c4 c7c6 e2e3',
        'g1f3 d7d5 d2d4 g8f6 c2c4 d5c4 e2e3 e7e6 f1c4 c7c5 e1g1 a7a6',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 b8d7',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 f8e7 c1f4 e8g8 e2e3',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 f8b4',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 c7c6 c1g5',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 b1c3 c7c5',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 c1g5',
        'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 g2g3',
        'g1f3 d7d5 g2g3',
        'g1f3 g7g6',
        'c2c4 g8f6 b1c3 c7c5',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 b8d7',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 f8e7 c1f4 e8g8 e2e3',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 f8e7 c1g5 e8g8 e2e3 h7h6',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 f8b4',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 c7c6 c1g5',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 c7c6 e2e3 b8d7 d1c2 f8d6',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5 d2d4 c7c5',
        'c2c4 g8f6 b1c3 e7e5 g1f3 b8c6 g2g3',
        'c2c4 g8f6 b1c3 g7g6',
        'c2c4 g8f6 g1f3 b7b6 g2g3',
        'c2c4 g8f6 g1f3 c7c5 b1c3 b8c6',
        'c2c4 g8f6 g1f3 c7c5 b1c3 e7e6 g2g3 b7b6 f1g2 c8b7 e1g1 f8e7',
        'c2c4 g8f6 g1f3 c7c5 g2g3',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 b8d7',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 f8e7 c1f4 e8g8 e2e3',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 f8e7 c1g5 e8g8 e2e3 h7h6',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 f8b4',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 c7c6 c1g5',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 c7c6 e2e3 b8d7 d1c2 f8d6',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'c2c4 g8f6 g1f3 e7e6 b1c3 d7d5 d2d4 c7c5',
        'c2c4 g8f6 g1f3 e7e6 g2g3 d7d5 f1g2 f8e7',
        'c2c4 g8f6 g1f3 g7g6 b1c3 f8g7 e2e4',
        'c2c4 g8f6 g1f3 g7g6 g2g3 f8g7 f1g2 e8g8',
        'c2c4 c7c6',
        'c2c4 c7c5 g1f3 b8c6',
        'c2c4 c7c5 g1f3 g8f6 b1c3 b8c6',
        'c2c4 c7c5 g1f3 g8f6 b1c3 e7e6 g2g3 b7b6 f1g2 c8b7 e1g1 f8e7',
        'c2c4 c7c5 g1f3 g8f6 g2g3',
        'c2c4 e7e6 b1c3 d7d5 d2d4 f8e7 g1f3 g8f6 c1f4 e8g8 e2e3',
        'c2c4 e7e6 b1c3 d7d5 d2d4 f8e7 g1f3 g8f6 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'c2c4 e7e6 b1c3 d7d5 d2d4 f8e7 g1f3 g8f6 c1g5 e8g8 e2e3 h7h6',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 c1g5 f8e7 e2e3',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 b8d7',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 f8e7 c1f4 e8g8 e2e3',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 f8b4',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 c7c6 c1g5',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 g1f3 c7c5',
        'c2c4 e7e6 b1c3 d7d5 d2d4 g8f6 c4d5 e6d5 c1g5',
        'c2c4 e7e6 b1c3 d7d5 d2d4 c7c6',
        'c2c4 e7e6 g1f3',
        'c2c4 e7e5 b1c3 b8c6',
        'c2c4 e7e5 b1c3 g8f6 g1f3 b8c6 g2g3',
        'c2c4 e7e5 g2g3',
        'c2c4 g7g6 b1c3',
        'd2d4 g8f6 c1g5',
        'd2d4 g8f6 g1f3 c7c5',
        'd2d4 g8f6 g1f3 d7d5 c2c4 c7c6 b1c3 d5c4 a2a4 c8f5 e2e3 e7e6 f1c4',
        'd2d4 g8f6 g1f3 d7d5 c2c4 c7c6 b1c3 e7e6 c1g5',
        'd2d4 g8f6 g1f3 d7d5 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 g8f6 g1f3 d7d5 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 g8f6 g1f3 d7d5 c2c4 c7c6 e2e3',
        'd2d4 g8f6 g1f3 d7d5 c2c4 d5c4 e2e3 e7e6 f1c4 c7c5 e1g1 a7a6',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 b8d7',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 f8b4',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 c7c6 c1g5',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 b1c3 c7c5',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 c1g5',
        'd2d4 g8f6 g1f3 d7d5 c2c4 e7e6 g2g3',
        'd2d4 g8f6 g1f3 e7e6 c1g5',
        'd2d4 g8f6 g1f3 e7e6 c2c4 f8b4 b1d2',
        'd2d4 g8f6 g1f3 e7e6 c2c4 f8b4 c1d2',
        'd2d4 g8f6 g1f3 e7e6 c2c4 b7b6 b1c3 c8b7 a2a3 d7d5 c4d5 f6d5',
        'd2d4 g8f6 g1f3 e7e6 c2c4 b7b6 b1c3 f8b4',
        'd2d4 g8f6 g1f3 e7e6 c2c4 b7b6 a2a3 c8b7 b1c3 d7d5 c4d5 f6d5',
        'd2d4 g8f6 g1f3 e7e6 c2c4 b7b6 g2g3 c8b7 f1g2 f8e7 e1g1 e8g8 b1c3 f6e4 d1c2 e4c3 c2c3',
        'd2d4 g8f6 g1f3 e7e6 c2c4 b7b6 g2g3 c8a6 b2b3 f8b4 c1d2 b4e7',
        'd2d4 g8f6 g1f3 e7e6 c2c4 c7c5 d4d5 e6d5 c4d5 d7d6 b1c3 g7g6',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 b8d7',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 f8b4',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 c7c6 c1g5',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 b1c3 c7c5',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 c1g5',
        'd2d4 g8f6 g1f3 e7e6 c2c4 d7d5 g2g3',
        'd2d4 g8f6 g1f3 e7e6 g2g3',
        'd2d4 g8f6 g1f3 g7g6 c1g5',
        'd2d4 g8f6 g1f3 g7g6 c2c4 f8g7 b1c3 e8g8 e2e4 d7d6 f1e2 e7e5 e1g1 b8c6 d4d5 c6e7 f3e1 f6d7',
        'd2d4 g8f6 g1f3 g7g6 c2c4 f8g7 g2g3 e8g8 f1g2 d7d6 e1g1',
        'd2d4 g8f6 g1f3 g7g6 g2g3 f8g7 f1g2 e8g8',
        'd2d4 g8f6 c2c4 c7c5 d4d5 b7b5 c4b5 a7a6',
        'd2d4 g8f6 c2c4 c7c5 d4d5 e7e6 b1c3 e6d5 c4d5 d7d6',
        'd2d4 g8f6 c2c4 d7d6 b1c3',
        'd2d4 g8f6 c2c4 e7e6 b1c3 f8b4 d1c2 e8g8',
        'd2d4 g8f6 c2c4 e7e6 b1c3 f8b4 g1f3',
        'd2d4 g8f6 c2c4 e7e6 b1c3 f8b4 e2e3 b7b6',
        'd2d4 g8f6 c2c4 e7e6 b1c3 f8b4 e2e3 c7c5 f1d3',
        'd2d4 g8f6 c2c4 e7e6 b1c3 f8b4 e2e3 e8g8 f1d3 d7d5 g1f3',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 c1g5 f8e7 e2e3',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 b8d7',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 f8b4',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 c7c6 c1g5',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 g1f3 c7c5',
        'd2d4 g8f6 c2c4 e7e6 b1c3 d7d5 c4d5 e6d5 c1g5',
        'd2d4 g8f6 c2c4 e7e6 g1f3 f8b4 b1d2',
        'd2d4 g8f6 c2c4 e7e6 g1f3 f8b4 c1d2',
        'd2d4 g8f6 c2c4 e7e6 g1f3 b7b6 b1c3 c8b7 a2a3 d7d5 c4d5 f6d5',
        'd2d4 g8f6 c2c4 e7e6 g1f3 b7b6 b1c3 f8b4',
        'd2d4 g8f6 c2c4 e7e6 g1f3 b7b6 a2a3 c8b7 b1c3 d7d5 c4d5 f6d5',
        'd2d4 g8f6 c2c4 e7e6 g1f3 b7b6 g2g3 c8b7 f1g2 f8e7 e1g1 e8g8 b1c3 f6e4 d1c2 e4c3 c2c3',
        'd2d4 g8f6 c2c4 e7e6 g1f3 b7b6 g2g3 c8a6 b2b3 f8b4 c1d2 b4e7',
        'd2d4 g8f6 c2c4 e7e6 g1f3 c7c5 d4d5 e6d5 c4d5 d7d6 b1c3 g7g6',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 b8d7',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 f8b4',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 c7c6 c1g5',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 b1c3 c7c5',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 c1g5',
        'd2d4 g8f6 c2c4 e7e6 g1f3 d7d5 g2g3',
        'd2d4 g8f6 c2c4 e7e6 g2g3 d7d5 f1g2',
        'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 f1e2 e8g8 c1g5',
        'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 f1e2 e8g8 g1f3 e7e5 e1g1 b8c6 d4d5 c6e7 f3e1 f6d7',
        'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 g1f3 e8g8 f1e2 e7e5 e1g1 b8c6 d4d5 c6e7 f3e1 f6d7',
        'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 f2f3 e8g8 c1e3',
        'd2d4 g8f6 c2c4 g7g6 b1c3 d7d5 g1f3 f8g7 d1b3 d5c4 b3c4',
        'd2d4 g8f6 c2c4 g7g6 b1c3 d7d5 c4d5 f6d5 e2e4 d5c3 b2c3 f8g7 f1c4',
        'd2d4 g8f6 c2c4 g7g6 g1f3 f8g7 b1c3 e8g8 e2e4 d7d6 f1e2 e7e5 e1g1 b8c6 d4d5 c6e7 f3e1 f6d7',
        'd2d4 g8f6 c2c4 g7g6 g1f3 f8g7 g2g3 e8g8 f1g2 d7d6 e1g1',
        'd2d4 g8f6 c2c4 g7g6 g2g3 f8g7 f1g2 e8g8',
        'd2d4 d7d6 e2e4 g8f6 b1c3 g7g6 f2f4 f8g7 g1f3',
        'd2d4 d7d6 e2e4 g7g6',
        'd2d4 d7d5 g1f3 g8f6 c2c4 c7c6 b1c3 d5c4 a2a4 c8f5 e2e3 e7e6 f1c4',
        'd2d4 d7d5 g1f3 g8f6 c2c4 c7c6 b1c3 e7e6 c1g5',
        'd2d4 d7d5 g1f3 g8f6 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 d7d5 g1f3 g8f6 c2c4 c7c6 b1c3 e7e6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 d7d5 g1f3 g8f6 c2c4 c7c6 e2e3',
        'd2d4 d7d5 g1f3 g8f6 c2c4 d5c4 e2e3 e7e6 f1c4 c7c5 e1g1 a7a6',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 b8d7',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 f8b4',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 c7c6 c1g5',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 b1c3 c7c5',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 c1g5',
        'd2d4 d7d5 g1f3 g8f6 c2c4 e7e6 g2g3',
        'd2d4 d7d5 c2c4 c7c6 b1c3 g8f6 g1f3 d5c4 a2a4 c8f5 e2e3 e7e6 f1c4',
        'd2d4 d7d5 c2c4 c7c6 b1c3 g8f6 g1f3 e7e6 c1g5',
        'd2d4 d7d5 c2c4 c7c6 b1c3 g8f6 g1f3 e7e6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 d7d5 c2c4 c7c6 b1c3 g8f6 g1f3 e7e6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 d7d5 c2c4 c7c6 b1c3 g8f6 e2e3',
        'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 d5c4 a2a4 c8f5 e2e3 e7e6 f1c4',
        'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 e7e6 c1g5',
        'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 e7e6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 e7e6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 e2e3',
        'd2d4 d7d5 c2c4 d5c4 g1f3 g8f6 e2e3 e7e6 f1c4 c7c5 e1g1 a7a6',
        'd2d4 d7d5 c2c4 e7e6 b1c3 f8e7 g1f3 g8f6 c1f4 e8g8 e2e3',
        'd2d4 d7d5 c2c4 e7e6 b1c3 f8e7 g1f3 g8f6 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 d7d5 c2c4 e7e6 b1c3 f8e7 g1f3 g8f6 c1g5 e8g8 e2e3 h7h6',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 c1g5 f8e7 e2e3',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 b8d7',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 f8b4',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 c7c6 c1g5',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 g1f3 c7c5',
        'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 c4d5 e6d5 c1g5',
        'd2d4 d7d5 c2c4 e7e6 b1c3 c7c6',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 b8d7',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 f8b4',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 c7c6 c1g5',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 b1c3 c7c5',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 c1g5',
        'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 g2g3',
        'd2d4 e7e6 c2c4 g8f6 b1c3 f8b4 d1c2 e8g8',
        'd2d4 e7e6 c2c4 g8f6 b1c3 f8b4 g1f3',
        'd2d4 e7e6 c2c4 g8f6 b1c3 f8b4 e2e3 b7b6',
        'd2d4 e7e6 c2c4 g8f6 b1c3 f8b4 e2e3 c7c5 f1d3',
        'd2d4 e7e6 c2c4 g8f6 b1c3 f8b4 e2e3 e8g8 f1d3 d7d5 g1f3',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 c1g5 f8e7 e2e3',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 b8d7',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 f8b4',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 c7c6 c1g5',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 g1f3 c7c5',
        'd2d4 e7e6 c2c4 g8f6 b1c3 d7d5 c4d5 e6d5 c1g5',
        'd2d4 e7e6 c2c4 g8f6 g1f3 f8b4 b1d2',
        'd2d4 e7e6 c2c4 g8f6 g1f3 f8b4 c1d2',
        'd2d4 e7e6 c2c4 g8f6 g1f3 b7b6 b1c3 c8b7 a2a3 d7d5 c4d5 f6d5',
        'd2d4 e7e6 c2c4 g8f6 g1f3 b7b6 b1c3 f8b4',
        'd2d4 e7e6 c2c4 g8f6 g1f3 b7b6 a2a3 c8b7 b1c3 d7d5 c4d5 f6d5',
        'd2d4 e7e6 c2c4 g8f6 g1f3 b7b6 g2g3 c8b7 f1g2 f8e7 e1g1 e8g8 b1c3 f6e4 d1c2 e4c3 c2c3',
        'd2d4 e7e6 c2c4 g8f6 g1f3 b7b6 g2g3 c8a6 b2b3 f8b4 c1d2 b4e7',
        'd2d4 e7e6 c2c4 g8f6 g1f3 c7c5 d4d5 e6d5 c4d5 d7d6 b1c3 g7g6',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 b8d7',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 f8e7 c1f4 e8g8 e2e3',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 f8e7 c1g5 h7h6 g5h4 e8g8 e2e3 b7b6',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 f8e7 c1g5 e8g8 e2e3 h7h6',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 f8b4',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 c7c6 c1g5',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 c7c6 e2e3 b8d7 d1c2 f8d6',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 c7c6 e2e3 b8d7 f1d3 d5c4 d3c4 b7b5 c4d3',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 b1c3 c7c5',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 c1g5',
        'd2d4 e7e6 c2c4 g8f6 g1f3 d7d5 g2g3',
        'd2d4 e7e6 c2c4 g8f6 g2g3 d7d5 f1g2',
        'd2d4 f7f5',
        'd2d4 g7g6',
        'e2e4 g8f6 e4e5 f6d5 d2d4 d7d6 g1f3',
        'e2e4 c7c6 d2d4 d7d5 b1c3 d5e4 c3e4 b8d7',
        'e2e4 c7c6 d2d4 d7d5 b1c3 d5e4 c3e4 c8f5 e4g3 f5g6 h2h4 h7h6',
        'e2e4 c7c6 d2d4 d7d5 b1d2 d5e4 d2e4 b8d7',
        'e2e4 c7c6 d2d4 d7d5 b1d2 d5e4 d2e4 c8f5 e4g3 f5g6 h2h4 h7h6',
        'e2e4 c7c6 d2d4 d7d5 e4d5 c6d5 c2c4 g8f6 b1c3 e7e6 g1f3',
        'e2e4 c7c6 d2d4 d7d5 e4e5 c8f5',
        'e2e4 c7c5 b1c3 b8c6 g2g3 g7g6 f1g2 f8g7',
        'e2e4 c7c5 g1f3 b8c6 f1b5',
        'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 g8f6 b1c3 d7d6 c1g5 e7e6 d1d2 f8e7 e1c1 e8g8',
        'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 g8f6 b1c3 d7d6 c1g5 e7e6 d1d2 a7a6 e1c1 h7h6',
        'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 g8f6 b1c3 d7d6 f1c4',
        'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 g8f6 b1c3 e7e5 d4b5 d7d6',
        'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 e7e6 b1c3 d8c7',
        'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 e7e6 b1c3 a7a6',
        'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 g7g6',
        'e2e4 c7c5 g1f3 d7d6 f1b5',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 b8c6 c1g5 e7e6 d1d2 f8e7 e1c1 e8g8',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 b8c6 c1g5 e7e6 d1d2 a7a6 e1c1 h7h6',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 b8c6 f1c4',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 c1e3',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 c1g5 e7e6 f2f4',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 f1e2 e7e5 d4b3 f8e7',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 f2f4',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 e7e6 f1e2',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 e7e6 g2g4',
        'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 g7g6 c1e3 f8g7 f2f3',
        'e2e4 c7c5 g1f3 e7e6 b1c3',
        'e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4 b8c6 b1c3 d8c7',
        'e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4 b8c6 b1c3 a7a6',
        'e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4 g8f6 b1c3 d7d6 f1e2',
        'e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4 g8f6 b1c3 d7d6 g2g4',
        'e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4 a7a6 f1d3',
        'e2e4 c7c5 c2c3',
        'e2e4 d7d6 d2d4 g8f6 b1c3 g7g6 f2f4 f8g7 g1f3',
        'e2e4 d7d6 d2d4 g7g6',
        'e2e4 d7d5 e4d5',
        'e2e4 e7e6 d2d4 d7d5 b1c3 f8b4 e4e5 c7c5 a2a3 b4c3 b2c3 g8e7',
        'e2e4 e7e6 d2d4 d7d5 b1c3 g8f6 c1g5',
        'e2e4 e7e6 d2d4 d7d5 b1d2 g8f6 e4e5',
        'e2e4 e7e6 d2d4 d7d5 b1d2 c7c5 g1f3',
        'e2e4 e7e6 d2d4 d7d5 b1d2 c7c5 e4d5 e6d5',
        'e2e4 e7e6 d2d4 d7d5 e4e5 c7c5 c2c3 b8c6 g1f3',
        'e2e4 e7e5 b1c3',
        'e2e4 e7e5 g1f3 b8c6 b1c3 g8f6 f1b5',
        'e2e4 e7e5 g1f3 b8c6 f1c4 f8c5',
        'e2e4 e7e5 g1f3 b8c6 f1c4 g8f6',
        'e2e4 e7e5 g1f3 b8c6 f1b5 g8f6 e1g1',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5c6 d7c6 e1g1',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 d7d6 c2c3 e8g8 h2h3 c6b8 d2d4 b8d7',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 d7d6 c2c3 e8g8 h2h3 c6a5 b3c2 c7c5 d2d4 d8c7 b1d2',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 d7d6 c2c3 e8g8 h2h3 c8b7 d2d4 f8e8',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 e8g8 c2c3 d7d6 h2h3 c6b8 d2d4 b8d7',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 e8g8 c2c3 d7d6 h2h3 c6a5 b3c2 c7c5 d2d4 d8c7 b1d2',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 e8g8 c2c3 d7d6 h2h3 c8b7 d2d4 f8e8',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f6e4 d2d4 b7b5 a4b3 d7d5 d4e5 c8e6 c2c3',
        'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 d7d6',
        'e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4',
        'e2e4 e7e5 g1f3 g8f6 f3e5 d7d6 e5f3 f6e4 d2d4',
        'e2e4 e7e5 f2f4',
        'e2e4 g7g6 d2d4 f8g7 b1c3 d7d6',
        'g2g3'
      ]  
    }
  }
  