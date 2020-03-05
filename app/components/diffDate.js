export default function diffDate(angka) {
  var msDiff = new Date().getTime() - new Date(angka).getTime(); //Future date - current date
  var diffDate = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  //   console.log(diffDate);
  //   if (diffDate > 24) {
  //     var diffDate = "<Text>tes</Text>";
  //   } else {
  //     var diffDate = "<Text>t0s</Text>";
  //   }
  return diffDate;
}
