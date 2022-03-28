samples =[{
    id:'1',
    poop: "20"
},
{
    id:'2',
    poop: "21"
},
{
    id:'3',
    poop: "22"
},
{
    id:'4',
    poop: "23"
},]

sample = 4

// function runfilter(sample){
//     return item.id == sample
// }
// desired = samples.filter(item =>);
// console.log(desired);

sample = 3

const desired = samples.filter((item) => {
    return item.id == sample;
})

console.log(desired)
