(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("wayp",
{ "compressionlevel":-1,
 "height":1,
 "infinite":false,
 "layers":[
        {
         "data":[1],
         "height":1,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":1,
         "x":0,
         "y":0
        },
    
        {
         "draworder":"topdown",
         "id":3,
         "name":"wayp",
         "objects":[
                {
                 "height":0,
                 "id":1,
                 "name":"",
                 "polyline":[
                        {
                         "x":0,
                         "y":0
                        },
                    
                        {
                         "x":-3.03030303030306,
                         "y":69.6969696969697
                        },
                    
                        {
                         "x":0,
                         "y":84.8484848484848
                        },
                    
                        {
                         "x":-90.9090909090909,
                         "y":169.69696969697
                        },
                    
                        {
                         "x":-148.484848484848,
                         "y":330.30303030303
                        },
                    
                        {
                         "x":-175.757575757576,
                         "y":772.727272727273
                        },
                    
                        {
                         "x":-136.363636363636,
                         "y":851.515151515152
                        },
                    
                        {
                         "x":-48.4848484848485,
                         "y":915.151515151515
                        },
                    
                        {
                         "x":33.3333333333333,
                         "y":945.454545454545
                        },
                    
                        {
                         "x":136.363636363636,
                         "y":918.181818181818
                        },
                    
                        {
                         "x":236.363636363636,
                         "y":833.333333333333
                        },
                    
                        {
                         "x":275.757575757576,
                         "y":733.333333333333
                        },
                    
                        {
                         "x":290.909090909091,
                         "y":448.484848484848
                        },
                    
                        {
                         "x":381.818181818182,
                         "y":369.69696969697
                        },
                    
                        {
                         "x":484.848484848485,
                         "y":366.666666666667
                        },
                    
                        {
                         "x":566.666666666667,
                         "y":430.30303030303
                        },
                    
                        {
                         "x":603.030303030303,
                         "y":515.151515151515
                        },
                    
                        {
                         "x":663.636363636364,
                         "y":554.545454545455
                        },
                    
                        {
                         "x":1106.06060606061,
                         "y":575.757575757576
                        },
                    
                        {
                         "x":1160.60606060606,
                         "y":621.212121212121
                        },
                    
                        {
                         "x":1187.87878787879,
                         "y":709.090909090909
                        },
                    
                        {
                         "x":1230.30303030303,
                         "y":790.909090909091
                        },
                    
                        {
                         "x":1303.0303030303,
                         "y":815.151515151515
                        },
                    
                        {
                         "x":1421.21212121212,
                         "y":824.242424242424
                        },
                    
                        {
                         "x":1593.93939393939,
                         "y":824.242424242424
                        },
                    
                        {
                         "x":2009.09090909091,
                         "y":1275.75757575758
                        }],
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":0,
                 "x":366.666666666667,
                 "y":-54.5454545454545
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextlayerid":4,
 "nextobjectid":2,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.11.2",
 "tileheight":1080,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/Videos\/Maps and Tilesets\/Maps\/map-lvl1.tsx"
        }],
 "tilewidth":1920,
 "type":"map",
 "version":"1.10",
 "width":1
});