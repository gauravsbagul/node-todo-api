

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
const o = [1, 1, 0, 1, 0, 1, 1]
var s=[]
var g = []
var i = 0
for(i=0;i <days.length;i++){
    if(o[i] == 1) {
        s = [...s, days[i]]
    }else if(o[i]==0){
        g = [...g, days[i]]
    }
}
console.log('TCL:: s ', s )
console.log('TCL:: g', g)

//Expected output
// TCL:: s  [ 'sun', 'mon', 'wed', 'fri', 'sat' ]
// TCL:: g [ 'tue', 'thu' ]